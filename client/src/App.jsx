import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import Project from "./pages/Project";
import Skills from "./pages/Skills";
import AdminLogin from "./pages/AdminLogin";
import Education from "./pages/Education";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminEducation from "./pages/admin/Education";
import AdminProfileInfo from "./pages/admin/ProfileInfo";
import AdminProjects from "./pages/admin/Projects";
import AdminTechnologies from "./pages/admin/Technologies";
import AdminWorkExperience from "./pages/admin/WorkExperience";
import AdminContact from "./pages/admin/Contact";
import Error404 from "./pages/Error404";
import { AppContext } from "./context/AppContext";

const App = () => {
  const { token, loading } = useContext(AppContext);

  if (loading) {
    return (
      <div className="bg-primary w-screen h-screen max-w-screen max-h-screen flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-orange-500/20 via-orange-400/10 to-transparent blur-3xl animate-pulse z-0" />

        <div className="z-10 mb-4 animate-spin-slow rounded-full border-t-4 border-orange-500 border-opacity-50 w-16 h-16"></div>

        <p className="z-10 text-white text-xl sm:text-2xl font-mono relative group">
          <span className="inline-block bg-gradient-to-r from-orange-500 to-white bg-clip-text text-transparent animate-text-shimmer">
            Crafting something amazing...
          </span>
        </p>
      </div>
    );
  }

  return (
    <>
      <Toaster position="center-top" />
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/education" element={<Education />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project" element={<Project />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={token ? <AdminDashboard /> : <Navigate to="/admin-login" />}
        />
        <Route
          path="/admin/education"
          element={token ? <AdminEducation /> : <Navigate to="/admin-login" />}
        />
        <Route
          path="/admin/profile-info"
          element={
            token ? <AdminProfileInfo /> : <Navigate to="/admin-login" />
          }
        />
        <Route
          path="/admin/projects"
          element={token ? <AdminProjects /> : <Navigate to="/admin-login" />}
        />
        <Route
          path="/admin/work-experience"
          element={
            token ? <AdminWorkExperience /> : <Navigate to="/admin-login" />
          }
        />
        <Route
          path="/admin/technologies"
          element={
            token ? <AdminTechnologies /> : <Navigate to="/admin-login" />
          }
        />
        <Route
          path="/admin/contact"
          element={token ? <AdminContact /> : <Navigate to="/admin-login" />}
        />
      </Routes>
    </>
  );
};

export default App;
