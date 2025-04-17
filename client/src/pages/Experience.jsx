import React, { useEffect } from "react";
import Card from "../components/Card";
import ExperienceComponent from "../components/Experience";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Experience = () => {
  useEffect(() => {
    document.title = "Experience | Kshitij Portfolio";
  });
  return (
    <>
      <Navbar />
      <div className=" bg-primary relative flex flex-col lg:flex-row justify-center items-center lg:items-start gap-0 pt-4 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32">
        <div className="w-full lg:w-1/3 hidden sm:flex justify-center lg:sticky top-4 animation-updown ">
          <Card />
        </div>

        <div className=" w-full lg:w-2/3 px-2 sm:px-4 md:px-6 lg:px-0 animation-updown ">
          <ExperienceComponent />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Experience;
