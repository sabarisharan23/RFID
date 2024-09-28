import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./SideBar";
import Navbar from "./Navbar";   // Assuming Navbar component is imported

const Layout: React.FC = () => {
  const [showMenu, setShowMenu] = useState(true); // Manage Sidebar visibility
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const location = useLocation(); // To detect the current route

  // Track screen size for small screens
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Define small screen as < 768px
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check if the current page is the login page
  const isLoginPage = location.pathname === "/"; // Adjust the login path as necessary

  return (
    <div className="flex h-screen">
      {/* Conditionally render Sidebar and Navbar if not on the login page */}
      {!isLoginPage && (
        <div
          className={`h-full duration-300 ease-in-out ${
            !showMenu && `-translate-x-80 w-0`
          }`}
        >
          <Sidebar />
        </div>
      )}

      <div className="flex flex-col w-full">
        {/* Conditionally render Navbar if not on the login page */}
        {!isLoginPage && <Navbar />}

        {/* Main content area */}
        <div
          className={`flex-1 overflow-y-auto duration-300 ${
            !showMenu && `w-full`
          } ${isSmallScreen && showMenu && "blur-sm overflow-y-hidden"}`}
          onClick={() => isSmallScreen && setShowMenu(false)}
        >
          <Outlet /> {/* This renders the component for the current route */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
