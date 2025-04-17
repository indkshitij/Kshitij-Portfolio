import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const fields = [
    { name: "Profile Information", path: "/admin/profile-info" },
    { name: "Education", path: "/admin/education" },
    { name: "Work Experience", path: "/admin/work-experience" },
    { name: "Projects", path: "/admin/projects" },
    { name: "Technologies", path: "/admin/technologies" },
    { name: "Contact", path: "/admin/contact" },
  ];

  return (
    <div className="w-full flex flex-col bg-admin text-white min-h-[90vh] sticky top-[10vh] ">
      {fields.map((field, index) => (
        <NavLink
          key={index}
          to={field.path}
          className={({ isActive }) =>
            `px-3 py-3 text-md cursor-pointer text-white tracking-wide  transition-all duration-300 ${
              isActive
                ? "bg-primary border-y border-orange-500 text-md"
                : "text-sm hover:bg-zinc-800"
            }`
          }
        >
          {field.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
