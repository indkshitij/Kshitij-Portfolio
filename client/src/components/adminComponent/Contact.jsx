import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { RiDeleteBinLine } from "react-icons/ri";
import ViewMessageModal from "./Modals/ViewMessageModal";
import ConfirmDeleteModal from "./Modals/ConfirmDeleteModal";
import { MdMessage } from "react-icons/md";
import axios from "axios";
import { toast } from "react-hot-toast";

const Contact = () => {
  const { backendUrl, loading, setLoading } = useContext(AppContext);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [message, setMessage] = useState([]);
  // fetch messages Handler
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/fetch-messages`, {
        withCredentials: true,
      });

      if (data?.success) {
        setMessage(data.messageData);
      } else {
        toast.error(data.message || "Failed to fetch messages");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error("Message fetch error:", error);
    } finally {
      setLoading(false);
    }
  };
  // delete message
  const deleteMessage = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `${backendUrl}/delete-message/${id}`,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success("Message deleted successfully!");
        fetchMessages();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete message");
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const datePart = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const timePart = date.toLocaleTimeString("en-GB", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return `${datePart}, ${timePart}`;
  };

  const handleView = (msg) => {
    setSelectedMessage(msg);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setMessageToDelete(id);
  };

  const confirmDelete = () => {
    if (messageToDelete) {
      deleteMessage(messageToDelete);
      setMessageToDelete(null);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  return (
    <>
      <div className="w-full bg-admin p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-medium mb-6 text-white">
          Contact Messages
        </h1>

        {message && message.length > 0 ? (
          <div className="rounded-lg border border-neutral-700 overflow-hidden">
            <div className="grid grid-cols-[1fr_2.5fr_1fr_2fr] bg-neutral-800 text-neutral-400 text-sm font-semibold uppercase px-4 py-3">
              <div>Name</div>
              <div>Subject</div>
              <div>Date & Time</div>
              <div className="text-center">Actions</div>
            </div>

            {message.map((item) => (
              <div
                key={item._id}
                onClick={() => handleView(item)}
                className="grid grid-cols-[1fr_2.5fr_1fr_2fr] items-center text-sm text-white px-4 py-4 border-t border-neutral-700 hover:bg-primary/70 cursor-pointer transition-all"
              >
                <div className="font-medium truncate">{item.name}</div>
                <div className="truncate">{item.subject}</div>
                <div className="text-sm">{formatDateTime(item.createdAt)}</div>
                <div
                  className="flex justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={(e) => handleDelete(e, item._id)}
                    className="cursor-pointer bg-red-600 text-white px-3 py-1.5 rounded-md flex items-center gap-1 text-sm hover:bg-red-700 hover:shadow shadow-white/50 hover:scale-110 duration-300"
                  >
                    <RiDeleteBinLine className="text-lg" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-neutral-400 mt-12 flex flex-col items-center">
            <MdMessage className="text-4xl mb-2" />
            <p className="text-lg">No Message found yet.</p>
          </div>
        )}
      </div>

      {selectedMessage && (
        <ViewMessageModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
          onDelete={() => {
            deleteMessage(selectedMessage._id);
            setSelectedMessage(null);
          }}
        />
      )}

      {messageToDelete && (
        <ConfirmDeleteModal
          onConfirm={confirmDelete}
          onCancel={() => setMessageToDelete(null)}
        />
      )}
    </>
  );
};

export default Contact;
