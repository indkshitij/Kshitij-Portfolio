import React, { useEffect } from "react";
import Navbar from "../../components/adminComponent/Navbar";
import Sidebar from "../../components/adminComponent/Sidebar";
import TechnologiesComponent from "../../components/adminComponent/Technologies";

const Technologies = () => {
  useEffect(() => {
        document.title = "Admin | Technology";
      });
  return (
    <>
      <Navbar />
      <div className="w-full flex">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 p-5 bg-primary">
          <TechnologiesComponent />
        </div>
      </div>
    </>
  );
};

export default Technologies;
