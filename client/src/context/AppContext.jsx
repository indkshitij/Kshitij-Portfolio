import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const [profileInfo, setProfileInfo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [technologies, setTechnologies] = useState([]);

  const [loading, setLoading] = useState(false);
  const [expiresAt, setExpiresAt] = useState(null);
  const [token, setToken] = useState(() =>
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );

  //  fetch token from cookies
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setExpiresAt(decoded.exp * 1000);

        const timeLeft = decoded.exp * 1000 - Date.now();

        // auto logout
        const logoutTimer = setTimeout(() => {
          setToken(null);
          localStorage.removeItem("token");
          navigate("/");
        }, timeLeft);

        return () => clearTimeout(logoutTimer);
      } catch (err) {
        console.log("Invalid token");
        setToken(null);
        localStorage.removeItem("token");
      }
    }
  }, [token, navigate]);

  const [message, setMessage] = useState([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // User Routes --------------------------------------------------------------------------------

  // Fetch Profile Info
  const fetchProfileInfo = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/user/fetch-profile-info`,
        {
          withCredentials: true,
        }
      );

      if (data?.success) {
        setProfileInfo(data.profileData);
      } else {
        toast.error(data.message || "Failed to fetch profile");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error("Profile fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Projects
  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/user/fetch-projects`, {
        withCredentials: true,
      });

      if (data?.success) {
        setProjects(data.projects);
      } else {
        toast.error(data.message || "Failed to fetch projects");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error("Projects fetch error:", error);
    }
  };

  // Fetch Experiences
  const fetchExperiences = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/user/fetch-experiences`, {
        withCredentials: true,
      });

      if (data?.success) {
        setExperiences(data.experiences);
      } else {
        toast.error(data.message || "Failed to fetch experiences");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error("Experiences fetch error:", error);
    }
  };

  // Fetch Educations
  const fetchEducations = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/user/fetch-educations`, {
        withCredentials: true,
      });

      if (data?.success) {
        setEducations(data.educations);
      } else {
        toast.error(data.message || "Failed to fetch educations");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error("Educations fetch error:", error);
    }
  };

  // Fetch Technologies
  const fetchTechnologies = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/user/fetch-technologies`,
        {
          withCredentials: true,
        }
      );

      if (data?.success) {
        setTechnologies(data.technologies);
      } else {
        toast.error(data.message || "Failed to fetch technologies");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error("Technologies fetch error:", error);
    }
  };

  // Admin Routes -------------------------------------------------------------------------------

  // Update Profile Information Handler
  const handleUpdateProfileInfo = async (formData) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${backendUrl}/update-profile-info`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (data?.success) {
        toast.success(data.message || "Profile updated successfully");
        fetchProfileInfo();
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  // handle Create Education
  const handleCreateEducation = async (
    degreeName,
    fieldOfStudy,
    instituteName,
    description,
    startDate,
    endDate,
    isPresent
  ) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/create-education`,
        {
          degreeName,
          fieldOfStudy,
          instituteName,
          description,
          startDate,
          endDate,
          isPresent,
        },
        { withCredentials: true }
      );

      if (data?.success) {
        toast.success(data.message || "Education added successfully");
        fetchEducations();
      } else {
        toast.error(data.message || "Failed to add education");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error("Education Creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  // handle project create
  const handleCreateProject = async (formData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/create-project`,
        formData,
        { withCredentials: true }
      );

      if (data?.success) {
        toast.success(data.message || "Project added successfully");
        fetchProjects();
      } else {
        toast.error(data.message || "Failed to add project");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error("Project Creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Create Experience
  const handleCreateExperience = async (
    jobTitle,
    companyName,
    description,
    startDate,
    endDate,
    isPresent
  ) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/create-experience`,
        {
          jobTitle,
          companyName,
          description,
          startDate,
          endDate,
          isPresent,
        },
        { withCredentials: true }
      );

      if (data?.success) {
        toast.success(data.message || "Experience added successfully");
        fetchExperiences();
      } else {
        toast.error(data.message || "Failed to add experience");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error("Experience Creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Create Technology
  const handleCreateTechnology = async (formData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/create-technology`,
        formData,
        { withCredentials: true }
      );

      if (data?.success) {
        toast.success(data.message || "Technology added successfully");
        fetchTechnologies();
      } else {
        toast.error(data.message || "Failed to add technology");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error("Technology Creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Education
  const deleteEducation = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `${backendUrl}/delete-education/${id}`,
        {
          withCredentials: true,
        }
      );

      if (data?.success) {
        toast.success(data.message || "Education deleted successfully");
        fetchEducations();
      } else {
        toast.error(data.message || "Failed to delete education");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error("Education Deletion Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Experience
  const deleteExperience = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `${backendUrl}/delete-experience/${id}`,
        {
          withCredentials: true,
        }
      );

      if (data?.success) {
        toast.success(data.message || "Experience deleted successfully");
        fetchExperiences();
      } else {
        toast.error(data.message || "Failed to delete experience");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error("Experience Deletion Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Project
  const deleteProject = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/delete-projects/${id}`,
        {
          withCredentials: true,
        }
      );

      if (data?.success) {
        toast.success(data.message || "Project deleted successfully");
        fetchProjects();
      } else {
        toast.error(data.message || "Failed to delete project");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error("Project Deletion Error:", error);
    }
  };

  // Delete Technology
  const deleteTechnology = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `${backendUrl}/delete-technology/${id}`,
        {
          withCredentials: true,
        }
      );

      if (data?.success) {
        toast.success(data.message || "Technology deleted successfully");
        fetchTechnologies();
      } else {
        toast.error(data.message || "Failed to delete technology");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error("Technology Deletion Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // update projects
  const updateProject = async (id, formData) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${backendUrl}/update-projects/${id}`,
        formData,
        { withCredentials: true }
      );

      if (data?.success) {
        toast.success(data.message || "Project updated successfully");
        fetchProjects();
      } else {
        toast.error(data.message || "Failed to update project");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error("Project Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  // update education
  const updateEducation = async (
    id,
    degreeName,
    fieldOfStudy,
    instituteName,
    description,
    startDate,
    endDate,
    isPresent
  ) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${backendUrl}/update-education/${id}`,
        {
          degreeName,
          fieldOfStudy,
          instituteName,
          description,
          startDate,
          endDate,
          isPresent,
        },
        { withCredentials: true }
      );

      if (data?.success) {
        toast.success(data.message || "Education updated successfully");
        fetchEducations();
      } else {
        toast.error(data.message || "Failed to update education");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error("Education Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  // update experience
  const updateExperience = async (
    id,
    jobTitle,
    companyName,
    description,
    startDate,
    endDate,
    isPresent
  ) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${backendUrl}/update-experience/${id}`,
        {
          jobTitle,
          companyName,
          description,
          startDate,
          endDate,
          isPresent,
        },
        { withCredentials: true }
      );

      if (data?.success) {
        toast.success(data.message || "Experience updated successfully");
        fetchExperiences();
      } else {
        toast.error(data.message || "Failed to update experience");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error("Experience Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  //  update technology
  const updateTechnology = async (id, formData) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${backendUrl}/update-technology/${id}`,
        formData,
        { withCredentials: true }
      );

      if (data?.success) {
        toast.success(data.message || "Technology updated successfully");
        fetchTechnologies();
      } else {
        toast.error(data.message || "Failed to update technology");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error("Technology Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileInfo();
    fetchProjects();
    fetchExperiences();
    fetchEducations();
    fetchTechnologies();
  }, []);

  const value = {
    backendUrl,
    token,
    setToken,
    months,

    loading,
    setLoading,
    message,
    setMessage,

    profileInfo,
    setProfileInfo,
    fetchProfileInfo,
    handleUpdateProfileInfo,

    educations,
    setEducations,
    handleCreateEducation,
    updateEducation,
    deleteEducation,
    fetchEducations,

    projects,
    setProjects,
    handleCreateProject,
    updateProject,
    deleteProject,
    fetchProjects,

    experiences,
    setExperiences,
    handleCreateExperience,
    updateExperience,
    deleteExperience,
    fetchExperiences,

    technologies,
    setTechnologies,
    handleCreateTechnology,
    updateTechnology,
    deleteTechnology,
    fetchTechnologies,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
