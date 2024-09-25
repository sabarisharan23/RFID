import React from 'react';
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
    <div className="flex justify-between items-center bg-white shadow p-6">
      {/* Logo */}
      <div className="text-2xl font-bold text-zinc-500">Mindteck RFID</div>

      {/* Log Out Button */}
      <button className="text-gray-600 border font-semibold border-gray-200 rounded px-2 py-1 shadow-md" onClick={() => navigate('/')}>
        Log Out
      </button>
    </div>
  );
};

export default Navbar;
