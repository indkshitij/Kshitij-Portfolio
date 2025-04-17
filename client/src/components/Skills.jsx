import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Skills = () => {
  const { technologies } = useContext(AppContext);
  return (
    <>
      <div className=" w-full">
        <p className="text-white uppercase font-extrabold text-4xl text-center sm:text-left sm:text-8xl tracking-wider">
          My Tech <br /> <span className="text-zinc-800">Toolkit</span>
        </p>

        <div className="mt-7 flex flex-wrap gap-4 ">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flip-card w-full sm:w-72 flex justify-center items-center cursor-pointer"
            >
              <div className="flip-card-inner w-full h-full flex flex-col items-center justify-center">
                <div className="flip-card-front w-full h-full flex items-center gap-1 relative p-1 border-2 border-neutral-700  bg-neutral-800 rounded-md shadow-md transition-all duration-500 hover:scale-105 transform overflow-hidden">
                  <div className="w-16 h-16 rounded-md flex justify-center items-center">
                    <img
                      src={tech?.imageUrl}
                      alt={tech?.name}
                      className="w-12 h-12"
                    />
                  </div>
                  <p className="text-white text-lg ">{tech?.name}</p>
                </div>

                <div className="flip-card-back w-full h-full flex items-center justify-center p-2 border-2 border-neutral-700  bg-neutral-800 rounded-md shadow-md transition-all duration-500 hover:scale-105 transform overflow-hidden">
                  <p className="text-sm text-white">{tech?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Skills;
