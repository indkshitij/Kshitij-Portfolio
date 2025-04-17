import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { BsFolder2Open, BsSuitcaseLg } from "react-icons/bs";
import { VscTools } from "react-icons/vsc";
import { PiNotePencil } from "react-icons/pi";
import { FaGraduationCap } from "react-icons/fa6";
const Navbar = () => {
  const location = useLocation();

  return (
    <div className="bg-primary w-full flex items-center justify-center min-h-28">
      <div className="bg-neutral-800 flex gap-7 items-center justify-center rounded-xl px-5 py-3">
        {[
          { to: "/", icon: <HiOutlineHomeModern />, label: "Home" },
          { to: "/project", icon: <BsFolder2Open />, label: "Projects" },
          { to: "/education", icon: <FaGraduationCap />, label: "Education" },
          { to: "/experience", icon: <BsSuitcaseLg />, label: "Experience" },
          { to: "/skills", icon: <VscTools />, label: "Skills" },
          { to: "/contact", icon: <PiNotePencil />, label: "Thoughts" },
        ].map(({ to, icon, label }, index) => {
          const isActive = location.pathname === to;

          return (
            <Link key={index} to={to} aria-label={label} className="relative">
              <div className="group relative flex flex-col items-center w-8 transition-all duration-300">
                <div
                  className={`text-[25px] ${
                    isActive ? "text-orange-400" : "text-white"
                  } group-hover:text-orange-400`}
                >
                  {icon}
                </div>
                <p className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 bg-neutral-800 px-2 py-1 rounded-lg text-xs text-white whitespace-nowrap group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300 z-50">
                  {label}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
