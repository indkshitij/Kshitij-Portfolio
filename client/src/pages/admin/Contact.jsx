import React, { useEffect } from "react";
import Navbar from "../../components/adminComponent/Navbar";
import Sidebar from "../../components/adminComponent/Sidebar";
import ContactComponent from "../../components/adminComponent/Contact";

const Contact = () => {
    
  useEffect(() => {
      document.title = "Admin | Contact";
    });

  return (
    <>
      <Navbar />
      <div className="w-full flex">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 p-5 bg-primary">
          <ContactComponent />
        </div>
      </div>
    </>
  );
};

export default Contact;
