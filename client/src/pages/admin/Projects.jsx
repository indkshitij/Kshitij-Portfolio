import React, { useEffect } from "react";
import Navbar from "../../components/adminComponent/Navbar";
import Sidebar from "../../components/adminComponent/Sidebar";
import ProjectComponent from "../../components/adminComponent/Project"

const Projects = () => {
  useEffect(() => {
        document.title = "Admin | Project";
      });
  return (
    <>
    <Navbar />
    <div className="w-full flex">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="w-4/5 p-5 bg-primary"><ProjectComponent/></div>
    </div>
  </>
  )
}

export default Projects