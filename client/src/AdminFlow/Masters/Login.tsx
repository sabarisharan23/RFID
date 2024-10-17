import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAdminLogin, setIsAdminLogin] = useState<boolean>(true); // State to toggle between admin and user login
  const navigate = useNavigate();

  const handleLogin = () => {
    // Check credentials for Admin
    if (isAdminLogin) {
      if (username === "admin1@gmail.com" && password === "password") {
        console.log("Admin login successful");
        localStorage.setItem("role", "admin"); // Store admin role in localStorage

        navigate("/dashboard"); // Navigate to the admin dashboard
      } else {
        console.log("Invalid admin credentials");
        window.alert("Invalid admin credentials");
      }
    } else {
      // Check credentials for User
      if (username === "user1@gmail.com" && password === "password") {
        console.log("User login successful");
        localStorage.setItem("role", "user"); // Store admin role in localStorage

        navigate("/user-dashboard"); // Navigate to the user dashboard
      } else {
        console.log("Invalid user credentials");
        window.alert("Invalid user credentials");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[25%]">
        <div className="mb-6">
          <img
            src="/images.png"
            alt="Mindteck Logo"
            className="mx-auto w-[80%] h-24"
          />
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center gap-10 mb-6">
          <button
            className={`px-4 py-2 rounded-t-lg ${
              isAdminLogin ? "bg-[#635bff] text-white" : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setIsAdminLogin(true)}
          >
            Admin Login
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg ${
              !isAdminLogin ? "bg-[#635bff] text-white" : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setIsAdminLogin(false)}
          >
            User Login
          </button>
        </div>

        {/* Login Form */}
        <div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {isAdminLogin ? "Admin Name" : "Username"}
            </label>
            <input
              type="text"
              placeholder={isAdminLogin ? "Admin Name" : "Username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#635bff]"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#635bff]"
            />
          </div>
          <button
            className="w-full px-4 py-3 bg-[#635bff] text-white rounded-lg hover:bg-[#635bff] focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform transform hover:scale-105"
            onClick={handleLogin}
          >
            {isAdminLogin ? "Login as Admin" : "Login as User"}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-gray-500">
          &copy; Mindteck Limited 2024 - 2025
        </div>
      </div>
    </div>
  );
};

export default Login;
