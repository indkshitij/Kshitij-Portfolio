import React, { useContext } from "react";
import { IoArrowUp } from "react-icons/io5";
import { AppContext } from "../context/AppContext";

const Footer = () => {
  const { profileInfo } = useContext(AppContext);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-primary py-12 sm:py-16 text-white text-center relative transition-all duration-700 transform">
      <div className="w-[80%] mx-auto tracking-normal">
        <p className="text-lg font-medium sm:text-xl">
          Code is the canvas where I paint my ideas into reality
        </p>
        <div className="mt-2">
          <p className="text-sm sm:text-base">
            Made By{" "}
            <a
              href={profileInfo?.socials?.linktree || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 inline-block relative group transition-all duration-300"
            >
              <span className="relative z-10 group-hover:text-orange-400 group-hover:drop-shadow-md transition-all duration-300">
                Kshitij
              </span>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-orange-400 transition-all duration-500 group-hover:w-full"></span>
            </a>
          </p>
        </div>
      </div>

      <div className="absolute bottom-5 right-5">
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="p-1.5 sm:p-3 cursor-pointer bg-orange-500 text-white font-bold text-lg rounded-full shadow-md hover:bg-orange-400 hover:scale-125 transition-all duration-300 animate-glow"
        >
          <IoArrowUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
