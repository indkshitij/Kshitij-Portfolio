import React, { useEffect } from "react";
import Navbar from "../../components/adminComponent/Navbar";
import Sidebar from "../../components/adminComponent/Sidebar";

const Dashboard = () => {
  useEffect(() => {
        document.title = "Admin | Dashboard";
      });
  return (
    <>
      <Navbar />
      <div className="w-full flex">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 p-5 bg-primary"></div>
      </div>
    </>
  );
};

export default Dashboard;
