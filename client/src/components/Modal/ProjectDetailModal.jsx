import React from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ProjectDetailModal = ({ project, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[1000] backdrop-blur-sm bg-black/60 flex justify-center items-center px-1 sm:px-4">
      <div className="bg-primary w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-3 sm:p-10 relative">
        <button
          onClick={onClose}
          className="cursor-pointer bg-orange-500  hover:bg-orange-500 duration-300 rounded-full p-1 fixed top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-white transition"
        >
          <IoClose size={24} />
        </button>

        <div className="flex flex-col sm:flex-row gap-7 relative ">
          <div className="w-full sm:w-1/4 flex flex-col ">
            {project?.imageUrl && (
              <div className="w-full ">
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="rounded-lg w-full h-full object-cover shadow-md"
                />
              </div>
            )}
            <div className="flex flex-col gap-4 mt-4 text-base">
              {project?.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-lg transition-all "
                >
                  <FaGithub /> GitHub
                </a>
              )}

              {project?.projectLink && (
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white px-4 py-2.5 rounded-lg transition-all "
                >
                  <FaExternalLinkAlt /> Live Project
                </a>
              )}
            </div>
          </div>
          <div className="sm:w-3/4 w-full text-white ">
            <h1 className="text-3xl font-semibold mb-4">{project?.name}</h1>

            <p className="text-sm text-neutral-500 mb-4 leading-relaxed whitespace-pre-wrap text-justify">
              {project?.description}
            </p>

            {project?.inDepthDetail && (
              <div className="bg-neutral-800 p-2 sm:p-4 rounded-lg">
                <h2 className="text-sm text-orange-500">Details</h2>
                <p className="text-sm leading-relaxed text-gray-300 whitespace-pre-wrap text-justify">
                  {project.inDepthDetail}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
