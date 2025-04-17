import React, { useContext,useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { AppContext } from "../context/AppContext";

const Experience = () => {
  const { experiences } = useContext(AppContext);

  useEffect(() => {
    const cards = document.querySelectorAll(".card-wrapper");

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);
      });
    });
  }, []);

  return (
    <>
      <div className="w-full">
        <p className="text-white uppercase font-extrabold text-4xl text-center sm:text-left sm:text-8xl tracking-wider">
          Work
          <br /> <span className="text-zinc-800">Experience</span>
        </p>
        <div className=" w-full sm:w-[90%] flex flex-col gap-5 border-l-4 border-orange-500 border-dashed pl-5 sm:pl-10 mt-12 mb-5 ">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="w-full relative sm:hover:cursor-pointer duration-300 "
            >
              <div className="absolute top-3 left-[-12vw] sm:left-[-5vw] bg-primary rounded-full sm:max-w-min">
                <GoDotFill className="text-5xl sm:text-7xl text-orange-500 animate-pulse" />
              </div>

              <div className="card-wrapper rounded-2xl p-1">
                <div className="p-5 sm:p-6 rounded-2xl bg-neutral-800/30">
                  <p className="text-white text-xl sm:text-2xl font-medium tracking-normal relative">
                    {experience.jobTitle} <br />
                    <span className="sm:absolute right-0 text-sm  text-neutral-500">
                      {experience.startDate} –{" "}
                      {experience.isPresent ? "Present" : experience.endDate}
                    </span>
                  </p>
                  <h2 className="text-white uppercase text-sm tracking-wide mt-0.5 mb-2">
                    {experience.companyName}
                  </h2>

                  <p className="text-neutral-500 text-sm text-justify">
                    {experience.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Experience;
