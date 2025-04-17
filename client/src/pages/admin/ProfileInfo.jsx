import React, { useEffect } from "react";
import Navbar from "../../components/adminComponent/Navbar";
import Sidebar from "../../components/adminComponent/Sidebar";
import ProfileInfoComponent from "../../components/adminComponent/ProfileInfo";

const ProfileInfo = () => {
  useEffect(() => {
        document.title = "Admin | Profile Information";
      });
  return (
    <>
      <Navbar />
      <div className="w-full flex">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 p-5 bg-primary">
          <ProfileInfoComponent />
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
