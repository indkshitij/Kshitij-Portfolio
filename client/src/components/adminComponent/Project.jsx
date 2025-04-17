import React, { useState, useContext } from "react";
import CreateProject from "./Modals/CreateProject";
import { AppContext } from "../../context/AppContext";
import { RiDeleteBinFill } from "react-icons/ri";
import ConfirmDeleteModal from "./Modals/ConfirmDeleteModal";
import { IoIosFolderOpen } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import UpdateProjectModal from "./Modals/UpdateProjectModal";

const Project = () => {
  const { projects, deleteProject } = useContext(AppContext);

  const [projectModal, setProjectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedProjectId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedProjectId) {
      deleteProject(selectedProjectId);
      setShowDeleteModal(false);
      setSelectedProjectId(null);
    }
  };

  const handleUpdateClick = (project) => {
    setSelectedProject(project);
    setShowUpdateModal(true);
  };

  return (
    <>
      <div className="w-full bg-admin p-5 rounded-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium text-white">Projects</h1>
          <button
            onClick={() => setProjectModal(true)}
            className="cursor-pointer bg-green-700 text-white text-sm px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Add Project
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {projects.length === 0 ? (
            <div className="text-center text-neutral-400 mt-12 flex flex-col items-center">
              <IoIosFolderOpen className="w-full text-4xl mb-2" />
              <p className="text-lg">No projects added yet.</p>
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project._id}
                className="bg-neutral-800 p-6 rounded-lg text-white relative shadow-lg hover:shadow-xl"
              >
                <div className="space-y-4 bg-neutral-800 rounded-lg text-white">
                  <div className="flex flex-col md:flex-row gap-4">
                    
                    <div className="">
                      <div className="w-36 h-36 rounded-lg border border-orange-500 overflow-hidden bg-neutral-700">
                        {project.imageUrl ? (
                          <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-orange-400 text-sm">
                            No Image
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between w-full">
                      <div>
                        <h2 className="text-xl font-semibold mb-1">
                          {project.name}
                        </h2>
                        <p className="text-sm text-neutral-400 mb-2 whitespace-pre-wrap">
                          {project.description}
                        </p>

                        <div className="bg-neutral-700 text-xs text-neutral-300 p-2 rounded-md overflow-x-auto mb-2">
                          <pre className="whitespace-pre-wrap break-words">
                            {project.inDepthDetail}
                          </pre>
                        </div>

                        <p className="text-xs text-neutral-500 mb-2">
                          Created on:{" "}
                          {new Date(project.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <a
                          href={project.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-400 text-sm font-medium px-2 py-1 rounded-md hover:bg-blue-500/20 hover:scale-105 transition"
                        >
                          🔗 View Project
                        </a>
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className=" cursor-pointer flex items-center gap-2 text-gray-300 text-sm font-medium px-2 py-1 rounded-md hover:bg-gray-500/20 hover:scale-105 transition"
                        >
                          <FaGithub /> GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleUpdateClick(project)}
                    className="cursor-pointer text-blue-400 hover:text-white hover:bg-blue-600 border border-blue-400 hover:border-transparent rounded-full p-2 transition-all duration-300 ease-in-out"
                    title="Edit"
                  >
                    <FaEdit size={18} />
                  </button>

                  <button
                    onClick={() => handleDeleteClick(project._id)}
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

      {projectModal && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
          onClick={() => setProjectModal(false)}
        >
          <div
            className="shadow-lg z-60 w-[95%] sm:w-1/2 h-4/5 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CreateProject closeModel={() => setProjectModal(false)} />
          </div>
        </div>
      )}

      {showDeleteModal && (
        <ConfirmDeleteModal
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {showUpdateModal && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
          onClick={() => setShowUpdateModal(false)}
        >
          <div
            className="shadow-lg z-60 w-[95%] sm:w-1/2 h-4/5 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <UpdateProjectModal
              closeModal={() => setShowUpdateModal(false)}
              selectedProject={selectedProject}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
