import React, { useContext, useEffect, useState } from "react";
import CreateEducation from "./Modals/CreateEducation";
import ConfirmDeleteModal from "./Modals/ConfirmDeleteModal";
import { AppContext } from "../../context/AppContext";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaGraduationCap } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import UpdateEducationModal from "./Modals/UpdateEducationModal";

const Education = () => {
  const { deleteEducation, educations } = useContext(AppContext);

  const [educationModal, setEducationModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEducationId, setSelectedEducationId] = useState(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedEducationId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedEducationId) {
      deleteEducation(selectedEducationId);
      setShowDeleteModal(false);
      setSelectedEducationId(null);
    }
  };

  return (
    <>
      <div className="w-full bg-admin p-5 rounded-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium text-white">Education</h1>
          <button
            onClick={() => setEducationModal(true)}
            className="cursor-pointer bg-green-700 text-white text-sm px-4 py-2 rounded-md hover:bg-green-600 "
          >
            Add Education
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {educations.length === 0 ? (
            <div className="text-center text-neutral-400 mt-12 flex flex-col items-center">
              <FaGraduationCap className="text-4xl mb-2" />
              <p className="text-lg">No education added yet.</p>
            </div>
          ) : (
            educations.map((edu) => (
              <div
                key={edu._id}
                className="bg-neutral-800 p-6 rounded-lg text-white relative shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out "
              >
                <div className="space-y-2">
                  <p className="text-xl font-semibold">{edu.degreeName}</p>
                  <p className="text-lg text-orange-400 font-medium">
                    {edu.fieldOfStudy}
                  </p>
                  <p className="text-md text-neutral-300">
                    {edu.instituteName}
                  </p>
                  <p className="text-sm text-neutral-400 mt-1">
                    {edu.startDate} — {edu.isPresent ? "Present" : edu.endDate}
                  </p>
                  {edu.description && (
                    <p className="text-sm mt-2 text-neutral-300 leading-relaxed">
                      <span className="mr-1.5">Description:</span>{" "}
                      {edu.description}
                    </p>
                  )}
                </div>

                <div className=" absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedEducation(edu);
                      setShowUpdateModal(true);
                    }}
                    className="cursor-pointer text-blue-400 hover:text-white hover:bg-blue-600 border border-blue-400 hover:border-transparent rounded-full p-2 transition-all duration-300 ease-in-out"
                    title="Edit"
                  >
                    <FaEdit size={18} />
                  </button>

                  <button
                    onClick={() => handleDeleteClick(edu._id)}
                    className="cursor-pointer text-red-500 hover:text-white hover:bg-red-600 border border-red-500 hover:border-transparent rounded-full p-2 transition-all duration-300 ease-in-out"
                    title="Delete"
                  >
                    <RiDeleteBinFill size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {educationModal && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
          onClick={() => setEducationModal(false)}
        >
          <div
            className="shadow-lg z-60 w-[95%] sm:w-3/5 h-4/5 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CreateEducation closeModel={() => setEducationModal(false)} />
          </div>
        </div>
      )}

      {showDeleteModal && (
        <ConfirmDeleteModal
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {showUpdateModal && selectedEducation && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
          onClick={() => setShowUpdateModal(false)}
        >
          <div
            className="shadow-lg z-60 w-[95%] sm:w-3/5 h-4/5 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <UpdateEducationModal
              closeModal={() => setShowUpdateModal(false)}
              educationData={selectedEducation}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Education;
