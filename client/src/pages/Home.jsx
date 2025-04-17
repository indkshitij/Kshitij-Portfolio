import React, { useState } from "react";
import Card from "../components/Card";
import Introduction from "../components/Introduction";
import Project from "../components/Projects";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectDetailModal from "../components/Modal/ProjectDetailModal";

const Home = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  return (
    <>
      {" "}
      <Navbar />
      <div className="bg-primary relative flex flex-col lg:flex-row justify-center items-center lg:items-start gap-0 pt-4 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32">
        <div className="w-full lg:w-1/3 flex justify-center  lg:sticky top-4 animation-updown ">
          <Card />
        </div>

        <div className="w-full lg:w-2/3 min-h-screen px-2 sm:px-4 md:px-6 lg:px-0 animation-updown ">
          <Introduction />

          <div className="mt-12 sm:mt-14 md:mt-16 animation-appear">
            <Project onProjectClick={openModal} />
          </div>

          <div className="mt-12 sm:mt-14 md:mt-16 animation-appear">
            <Education />
          </div>

          <div className="mt-12 sm:mt-14 md:mt-16 animation-appear">
            <Skills />
          </div>

          <div className="mt-12 sm:mt-14 md:mt-16 animation-appear">
            <Experience />
          </div>

          <div className="mt-14 sm:mt-16 md:mt-20 mb-8 sm:mb-10 animation-appear">
            <Contact />
          </div>
        </div>
      </div>
      <Footer />
      {/* Project Modal  */}
      {selectedProject && (
        <div className="fixed top-0 overflow-hidden z-20">
          <ProjectDetailModal project={selectedProject} onClose={closeModal} />
        </div>
      )}
    </>
  );
};

export default Home;