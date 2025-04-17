import React, { useContext, useEffect } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { AppContext } from "../context/AppContext";

const Project = ({ onProjectClick }) => {
  const { projects } = useContext(AppContext);

  return (
    <div className="w-full">
      <p className="text-white uppercase font-extrabold text-4xl text-center sm:text-left sm:text-8xl tracking-wider">
        recent
        <br />
        <span className="text-zinc-800">projects</span>
      </p>

      <div className="mt-5 projectCont flex flex-col gap-10 sm:gap-3 w-full">
        {projects.map((project, index) => (
          <div
            key={index}
            className="cursor-pointer shadow-sm hover:shadow-orange-500 hover:scale-[1.02] duration-300 rounded-lg "
            onClick={() => onProjectClick(project)}
          >
            <div className="relative group flex flex-col sm:flex-row gap-3 sm:gap-6 p-2 sm:p-4 rounded-lg hover:bg-neutral-800/60 duration-300">
              <img
                src={project.imageUrl}
                alt={project.name}
                className="w-full h-full sm:w-36 sm:h-36 rounded-lg object-cover"
              />
              <div className="w-full sm:w-[75%]">
                <p className="text-white sm:text-xl text-lg">{project.name}</p>
                <p className="pt-1 text-neutral-500 text-sm text-justify whitespace-pre-wrap">
                  {project.description}
                </p>

                <button
                  onClick={() => onProjectClick(project)}
                  className="sm:hidden mt-3 px-4 py-2 text-sm bg-orange-500 text-white rounded-lg w-fit"
                >
                  View Details
                </button>
              </div>

              <GoArrowUpRight className="text-orange-500 text-xl hidden sm:flex absolute top-5 right-5 transform group-hover:translate-x-4 group-hover:-translate-y-4 duration-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
