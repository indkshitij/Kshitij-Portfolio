import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

    useEffect(() => {
      document.title = "Page not found | Kshitij Portfolio";
    });
  return (
    <div className="px-2 bg-primary text-white h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-primary opacity-40 animate-glow"></div>

      <div className="relative z-10 text-center space-y-5 animation-updown">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 animate-text-shimmer">
          404
        </h1>
        <p className="text-2xl sm:text-3xl">Oops! Page not found.</p>
        <p className="text-lg sm:text-xl mt-4">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={goHome}
          className="cursor-pointer mt-8 p-3 px-7 text-base font-medium text-white rounded-lg shadow-md bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-400 hover:to-orange-500 hover:scale-110 transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default Error404;
