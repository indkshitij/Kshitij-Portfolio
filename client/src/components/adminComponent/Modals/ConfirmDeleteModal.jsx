import React from "react";
import { IoClose } from "react-icons/io5";

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div
      className="fixed inset-0 px-5 sm:px-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[60]"
      onClick={onCancel}
    >
      <div
        className="bg-neutral-900 text-white w-full max-w-sm p-6 rounded-xl shadow-lg relative border border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="cursor-pointer hover:bg-orange-500 duration-300 rounded-full p-0.5 absolute top-4 right-4 text-neutral-400 hover:text-white transition"
          onClick={onCancel}
        >
          <IoClose size={22} />
        </button>

        <h3 className="text-xl font-bold text-center mb-4">Confirm Deletion</h3>
        <p className="text-sm text-neutral-300 text-center mb-6">
          Are you sure you want to delete this message? This action cannot be undone.
        </p>

        <div className="flex justify-center gap-4">
          <button
            className="bg-neutral-700 hover:bg-neutral-800 duration-300 hover:scale-105 px-4 py-2 rounded-lg text-sm transition cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-orange-500 hover:bg-orange-600 duration-300 hover:scale-105 hover:bg-opacity-70 px-4 py-2 rounded-lg text-sm text-white transition cursor-pointer"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
