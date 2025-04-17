import React, { useContext, useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    useEffect(() => {
      document.title = "Admin Login | Kshitij Portfolio";
    });
  let { backendUrl, token, setToken } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/admin-login`,
        { email, password },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        navigate("/admin/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary w-full">
      <div className="bg-white px-8 py-6 rounded-2xl shadow-lg w-[90%] sm:w-1/4">
        <h2 className="text-3xl font-medium text-center text-orange-500 mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={showPassword ? "Password" : "••••••••"}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
              />
              <span
                className="absolute right-3 top-6 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all cursor-pointer tracking-wider"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
