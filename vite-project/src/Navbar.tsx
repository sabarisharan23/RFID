import React from 'react';
import { GrLogout } from "react-icons/gr";

import { useNavigate } from 'react-router-dom';

// JSON object containing menu items and their respective routes
const menuItems = {
  master: [
    { label: "Rack", route: "/racks" },
    { label: "Cupboard", route: "/cupboards" },
    { label: "Assets", route: "/assets" }
  ],
  actions: [
    { label: "Asset", route: "/assets" },
    { label: "Configure RFID", route: "/RFIDTags" },
  ]
};

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-[#ECF0F1] shadow p-6">
      {/* Logo */}
      <div className="text-2xl font-bold text-[#2C3E50]">Mindteck RFID</div>

      {/* Log Out Button */}
      <button className="flex justify-center items-center gap-2 text-black bg-white border border-gray-300 font-semibold  rounded px-2 py-1 shadow-md" onClick={() => navigate('/')}>
       <GrLogout className='text-xl'/> Log Out
      </button>
    </div>
  );
};

export default Navbar;
