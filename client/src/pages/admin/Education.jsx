import React, { useEffect } from "react";
import Navbar from "../../components/adminComponent/Navbar";
import Sidebar from "../../components/adminComponent/Sidebar";
import EducationComponent from "../../components/adminComponent/Education";

const Education = () => {
  useEffect(() => {
        document.title = "Admin | Education";
      });
  return (
    <>
    <Navbar />
    <div className="w-full flex">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="w-4/5 p-5 bg-primary">
        <EducationComponent/>
      </div>
    </div>
  </>
  )
}

export default Education