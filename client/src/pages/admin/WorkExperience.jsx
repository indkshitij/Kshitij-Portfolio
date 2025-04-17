import React, { useEffect } from "react";
import Navbar from "../../components/adminComponent/Navbar";
import Sidebar from "../../components/adminComponent/Sidebar";
import WorkExperienceComponent from "../../components/adminComponent/WorkExperience";
const WorkExperience = () => {
  useEffect(() => {
        document.title = "Admin | Work Experience";
      });
  return (
    
    <>
      <Navbar />
      <div className="w-full flex">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 p-5 bg-primary">
          <WorkExperienceComponent />
        </div>
      </div>
    </>
  );
};

export default WorkExperience;
