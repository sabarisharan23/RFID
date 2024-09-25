import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Layout: React.FC = () => {
  const location = useLocation();
  
  // Check if the current route is the login page
  const isLoginPage = location.pathname === '/';

  return (
    <>
      {!isLoginPage && <Navbar />} {/* Render Navbar only if not on the login page */}
      <div className="main-content">
        <Outlet /> {/* This will render the component for the current route */}
      </div>
    </>
  );
};

export default Layout;
