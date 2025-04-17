import React, { useContext } from "react";
import { IoLogoGithub } from "react-icons/io";
import { GrInstagram } from "react-icons/gr";
import { FaGripfire } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { AppContext } from "../context/AppContext";
import blankProfile from "../assets/blankProfile/img1.svg";

const Card = () => {
  const { profileInfo } = useContext(AppContext);

  return (
    <div className="sm:min-h-screen p-5 w-full mx-auto sm:mx-0 sm:w-80 flex items-center sm:px-0 sm:pt-0 sm:pb-5 justify-center bg-primary">
      <div className="relative w-full max-w-md bg-white p-6 rounded-2xl text-center shadow-lg overflow-hidden">
        <div className="absolute bottom-48 left-28 sm:bottom-56 sm:left-32 bg-orange-500 p-1 max-w-fit rounded-full">
          <FaGripfire className="text-white text-2xl" />
        </div>

        <div className="absolute bottom-36 left-[-15vw] sm:bottom-40 sm:left-[-2.7vw] p-24 max-w-fit bg-transparent border-orange-500 border-b-4 border-dashed rounded-full"></div>

        <div className="absolute top-[-15vh] left-0 p-24 max-w-fit bg-transparent border-orange-500 border-4 border-dashed rounded-full"></div>

        <div className="w-56 h-72 rounded-xl overflow-hidden mx-auto">
          <img
            src={profileInfo?.image ? profileInfo.image : blankProfile}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-black font-semibold text-4xl mt-5 sm:mb-32 mb-20">
          {profileInfo?.name || "Kshitij Singh"}
        </p>
        <p className="text-slate-600 text-md mt-3">
          {profileInfo?.heading ||
            "Innovative software engineer crafting solutions that make an impact"}
        </p>

        <div className="socials flex items-center justify-center text-2xl text-orange-500 mt-2 gap-1">
          {[
            {
              icon: <IoLogoGithub />,
              link: profileInfo?.socials?.github,
              bg: "bg-black",
            },
            {
              icon: <SiLeetcode  />,
              link: profileInfo?.socials?.leetcode,
              bg: "bg-yellow-500",
            },
            {
              icon: <GrInstagram  />,
              link: profileInfo?.socials?.instagram,
              bg: "bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]",
            },
            {
              icon: <FaLinkedin />,
              link: profileInfo?.socials?.linkedin,
              bg: "bg-blue-600",
            },
            {
              icon: <BiLogoGmail  />,
              link: profileInfo?.socials?.email,
              bg: "bg-red-600 ",
            },
          ].map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group p-2 rounded-full border-2 border-white overflow-hidden flex items-center justify-center"
            >
              <div
                className={`absolute top-full left-0 w-full h-full ${item.bg} transition-all duration-500 group-hover:top-0 z-0`}
              />
              <div className="relative text-xl z-10 text-orange-500 group-hover:text-white custom-rotate">
                {item.icon}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
