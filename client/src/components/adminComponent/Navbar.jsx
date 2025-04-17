import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setToken(null);
    localStorage.removeItem("token");
    navigate("/admin-login");
  };
  return (
    <>
      <div className="bg-admin p-5 w-full h-[10vh] flex items-center justify-between sticky top-0 left-0">
        
        <Link to={"/"}>
          <h1 className="text-orange-500 text-2xl font-normal tracking-wider cursor-pointer">
            Kshitij's Portfolio
          </h1>
        </Link>

        
        <button
          onClick={handleLogout}
          className="bg-orange-500 text-white px-5 py-1.5 rounded transition duration-300 cursor-pointer hover:bg-orange-950"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Navbar;
