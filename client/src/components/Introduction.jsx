import React, { useContext } from "react";
import line from "../assets/line.svg";
import zigzag from "../assets/zigzag.svg";
import { FiArrowRight } from "react-icons/fi";
import { BsTools } from "react-icons/bs";
import { SiSemanticweb } from "react-icons/si";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Introduction = () => {
  const { profileInfo } = useContext(AppContext);

  return (
    <>
      <div className="w-full py-5">
        <p className="text-white uppercase font-extrabold text-4xl text-center sm:text-left sm:text-8xl tracking-wider cursor-default">
          Learning Building
          <br /> <span className="text-zinc-800"> Evolving</span>
        </p>
        <p className="w-full sm:w-4/5 text-sm sm:text-lg text-justify sm:text-left text-neutral-500 pt-5 pb-20">
          {profileInfo?.about}
        </p>

        <div className="mx-auto w-[99%] sm:w-full sm:mx-0 text-center flex items-center sm:gap-16 gap-8">
          {profileInfo?.statistics?.length > 0 &&
            profileInfo.statistics.map((stats, index) => (
              <div key={index}>
                <h1 className="text-5xl sm:text-7xl text-white font-semibold">
                  {stats?.number}
                  <span className="ml-0.5">+</span>
                </h1>
                <p className="text-neutral-500 text-md">{stats?.name}</p>
              </div>
            ))}
        </div>

        <div className="links flex w-80 mx-auto sm:mx-0 sm:w-full flex-col sm:flex-row gap-4 sm:gap-6 item-start mt-12">
          <div className="tools relative w-full sm:w-80 p-7 min-h-56 rounded-lg text-white bg-orange-500 flex items-center hover:scale-105 duration-300">
            <img
              src={line}
              alt="loading"
              className="absolute z-10 top-2 left-0"
            />
            <img
              src={line}
              alt="loading"
              className="absolute z-10 top-20 left-0"
            />
            <div>
              <BsTools className="text-5xl mb-3 z-10" />
              <p className="text-2xl uppercase font-medium tracking-wide z-10">
                Tools
              </p>
            </div>
            <Link to="/skills">
              <div className="z-10 group absolute bottom-7 right-7 border-2 border-white py-1.5 px-2 text-white text-lg rounded hover:bg-white duration-200">
                <FiArrowRight className="text-white text-xl group-hover:text-orange-500 duration-200" />
              </div>
            </Link>
          </div>

          <div className="tools relative w-full sm:w-80 p-7 min-h-56 rounded-lg text-black bg-[#c5ff41] flex items-center transform hover:scale-105 duration-300 overflow-hidden">
            <img
              src={zigzag}
              alt="loading"
              className="absolute top-0 left-20"
            />
            <img
              src={zigzag}
              alt="loading"
              className="absolute top-28 -left-5"
            />
            <div>
              <SiSemanticweb className="text-5xl mb-3 z-10" />
              <p className="text-2xl uppercase font-medium tracking-wide z-10">
                Projects
              </p>
            </div>
            <Link to="/project">
              <div className="z-10 group absolute bottom-7 right-7 border-2 border-black py-1.5 px-2 text-lg rounded hover:bg-black duration-200">
                <FiArrowRight className="text-black text-xl group-hover:text-[#c5ff41] duration-200" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Introduction;
