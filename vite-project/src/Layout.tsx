import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Outlet /> {/* This will render the component for the current route */}
      </div>
    </>
  );
};

export default Layout;
