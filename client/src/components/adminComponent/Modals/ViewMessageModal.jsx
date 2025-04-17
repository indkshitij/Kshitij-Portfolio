import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const ViewMessageModal = ({ message, onClose, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

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
  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-neutral-900 w-full max-w-3xl h-[90%] overflow-auto p-6 rounded-xl shadow-2xl relative border border-neutral-800"
          onClick={(e) => e.stopPropagation()}
        >
          
          <button
            className="cursor-pointer hover:bg-orange-500 duration-300 rounded-full p-0.5 absolute top-4 right-4 text-neutral-400 hover:text-white transition"
            onClick={onClose}
          >
            <IoClose size={24} />
          </button>

          <h2 className="text-2xl font-medium text-white text-center mb-5 tracking-wide">
            Message Details
          </h2>

          <div className="space-y-4 text-sm text-neutral-300">
            <div className="">
              <p className="text-xs ml-0.5 text-neutral-600">Name</p>
              <div className="bg-neutral-800 rounded-md px-3 py-2 mt-0.5 text-sm leading-relax text-white font-normal">
                {message.name}
              </div>
            </div>
            <div className="">
              <p className="text-xs ml-0.5 text-neutral-600">Email</p>
              <div className="bg-neutral-800 rounded-md px-3 py-2 mt-0.5 text-sm leading-relax text-white font-normal">
                {message.email}
              </div>
            </div>
            <div className="">
              <p className="text-xs ml-0.5 text-neutral-600">Subject</p>
              <div className="bg-neutral-800 rounded-md px-3 py-2 mt-0.5 text-sm leading-relax text-white font-normal">
                {message.subject}
              </div>
            </div>
            <div>
              <p className="text-xs ml-0.5 text-neutral-600">Message</p>
              <div className="bg-neutral-800 rounded-md px-3 py-3 mt-0.5 text-sm leading-relax text-white font-normal whitespace-pre-wrap">
                {message.message}
              </div>
            </div>
          </div>

          <div className=" flex justify-between items-center mt-8">
            <div className=" h-full text-xs text-white flex flex-col gap-1 justify-center items-center text-center">
              <p className="text-neutral-600  font-medium">Date and Time</p>
              <p className="">{formatDateTime(message.createdAt)}</p>
            </div>

            <button
              onClick={() => setShowConfirm(true)}
              className="cursor-pointer  w-fit bg-orange-500 text-white text-sm px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-opacity-70 transition-all duration-300"
            >
              <RiDeleteBin6Line className="text-lg" />
              Delete Message
            </button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <ConfirmDeleteModal
          onConfirm={() => {
            onDelete();
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default ViewMessageModal;
