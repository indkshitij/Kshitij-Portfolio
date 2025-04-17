import React, { useContext, useEffect, useState } from "react";
import CreateWorkExperience from "./Modals/CreateWorkExperience";
import { AppContext } from "../../context/AppContext";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaBriefcase } from "react-icons/fa";
import ConfirmDeleteModal from "./Modals/ConfirmDeleteModal";
import UpdateWorkExperienceModal from "./Modals/UpdateWorkExperienceModal";
import { FaEdit } from "react-icons/fa";

const WorkExperience = () => {
  const { experiences, deleteExperience } = useContext(AppContext);

  const [workExperienceModal, setWorkExperienceModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedExperienceId, setSelectedExperienceId] = useState(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedExperienceId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedExperienceId) {
      deleteExperience(selectedExperienceId);
      setShowDeleteModal(false);
      setSelectedExperienceId(null);
    }
  };

  return (
    <>
      <div className="w-full bg-admin p-5 rounded-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium text-white">Work Experience</h1>
          <button
            onClick={() => setWorkExperienceModal(true)}
            className="cursor-pointer bg-green-700 text-white text-sm px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Add Work Experience
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {experiences.length === 0 ? (
            <div className="text-center text-neutral-400 mt-12 flex flex-col items-center">
              <FaBriefcase className="text-4xl mb-2" />
              <p className="text-lg">No work experience added yet.</p>
            </div>
          ) : (
            experiences.map((exp) => (
              <div
                key={exp._id}
                className="bg-neutral-800 p-6 rounded-lg text-white relative shadow-lg hover:shadow-xl"
              >
                <div className="space-y-2">
                  <p className="text-xl font-semibold">{exp.jobTitle}</p>
                  <p className="text-lg text-orange-400 font-medium">
                    {exp.companyName}
                  </p>
                  <p className="text-sm text-neutral-400 mt-1">
                    {exp.startDate} — {exp.isPresent ? "Present" : exp.endDate}
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-300">
                    {exp.description}
                  </p>
                </div>

                <div className=" absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedExperience(exp);
                      setShowUpdateModal(true);
                    }}
                    className="cursor-pointer text-blue-400 hover:text-white hover:bg-blue-600 border border-blue-400 hover:border-transparent rounded-full p-2 transition-all duration-300 ease-in-out"
                    title="Edit"
                  >
                    <FaEdit size={18} />
                  </button>

                  <button
                    onClick={() => handleDeleteClick(exp._id)}
                    className=" cursor-pointer text-red-500 hover:text-white hover:bg-red-600 border border-red-500 hover:border-transparent rounded-full p-2 transition-all duration-300 ease-in-out"
                    title="Delete"
                  >
                    <RiDeleteBinFill size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {workExperienceModal && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
          onClick={() => setWorkExperienceModal(false)}
        >
          <div
            className="shadow-lg z-60 w-[95%] sm:w-3/5 h-4/5 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CreateWorkExperience
              closeModel={() => setWorkExperienceModal(false)}
            />
          </div>
        </div>
      )}

      {showDeleteModal && (
        <ConfirmDeleteModal
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {showUpdateModal && selectedExperience && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
          onClick={() => setShowUpdateModal(false)}
        >
          <div
            className="shadow-lg z-60 w-[95%] sm:w-3/5 h-4/5 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <UpdateWorkExperienceModal
              closeModel={() => setShowUpdateModal(false)}
              experienceData={selectedExperience}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default WorkExperience;
