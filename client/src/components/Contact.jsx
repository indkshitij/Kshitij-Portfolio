import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { RiSendPlaneFill, RiLoader4Line } from "react-icons/ri";

const Contact = () => {
  const { backendUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Api Call
  const shareThoughts = async (formData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/user/contact`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (data?.success) {
        toast.success(data.message || "Message sent");
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error("Error while submitting contact form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    shareThoughts(formData);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="py-5 sm:py-0 sm:min-h-screen flex justify-center items-center ">
      <div className="w-full max-w-screen-xl">
        <p className="text-white uppercase font-extrabold text-4xl sm:text-8xl text-center sm:text-left tracking-wider">
          Let's work <br /> <span className="text-zinc-800">together</span>
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-3/4 mt-8 mx-auto sm:mx-0"
        >
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex flex-col gap-1 w-full sm:w-1/2">
              <label htmlFor="name" className="text-neutral-500 text-xs ml-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="bg-neutral-800 rounded-lg p-3 outline-none focus:border-orange-500 border border-transparent duration-300 text-sm text-white"
                required
              />
            </div>

            <div className="flex flex-col gap-1 w-full sm:w-1/2">
              <label htmlFor="email" className="text-neutral-500 text-xs ml-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="bg-neutral-800 rounded-lg p-3 outline-none focus:border-orange-500 border border-transparent duration-300 text-sm text-white"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 my-3 w-full">
            <label htmlFor="subject" className="text-neutral-500 text-xs ml-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="bg-neutral-800 rounded-lg p-3 outline-none focus:border-orange-500 border border-transparent duration-300 text-sm text-white"
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="message" className="text-neutral-500 text-xs ml-1">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Message"
              className="bg-neutral-800 rounded-lg p-3 outline-none focus:border-orange-500 border border-transparent duration-300 text-sm text-white"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-5 w-full p-2 text-sm font-medium text-white rounded-lg relative overflow-hidden group transition-all duration-300 ease-in-out
    ${
      loading
        ? "bg-orange-400 cursor-not-allowed"
        : "cursor-pointer bg-orange-500 hover:shadow-[0_0_12px_rgba(251,146,60,0.8)] hover:scale-[1.03]"
    }`}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 group-hover:animate-shimmer pointer-events-none" />

            <div className="flex justify-center items-center gap-2 relative z-10">
              <span className="text-lg">
                {loading ? (
                  <RiLoader4Line className="animate-spin text-white text-xl" />
                ) : (
                  <RiSendPlaneFill className="transition-all group-hover:scale-110 duration-300 ease-in-out text-xl" />
                )}
              </span>

              <span className="font-mono text-[1rem] group-hover:tracking-wide transition-all duration-300">
                {loading ? "Sending..." : "Send Message"}
              </span>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
