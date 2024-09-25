import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './SideBar';

const Layout: React.FC = () => {
  const location = useLocation();
  
  // Check if the current route is the login page
  const isLoginPage = location.pathname === '/';

  return (
    <div className="flex h-screen">
    
      {!isLoginPage && <Sidebar />}
      <div className='flex flex-col w-full'>

      {!isLoginPage && <Navbar />} 
      
      {/* Main content area */}
      <div className="flex-1">
        <Outlet /> {/* This will render the component for the current route */}
      </div>
      </div>
    </div>
  );
};

export default Layout;
