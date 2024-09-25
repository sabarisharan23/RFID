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
    <div className="flex justify-between items-center bg-white shadow p-4">
      {/* Logo */}
      <div className="text-2xl   font-bold text-zinc-500">Mindteck RFID</div>

      {/* Menu Items */}
      <div className="flex space-x-8">
        {/* Master Menu with Hover Dropdown */}
        {/* <div className="relative group">
          <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
            Master
          </button>
          <div className="absolute bg-white shadow-lg rounded mt-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <ul className="py-2">
              {menuItems.master.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate(item.route)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div> */}

        {/* Actions Menu with Hover Dropdown */}
        {/* <div className="relative group">
          <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
            Actions
          </button>
          <div className="absolute bg-white shadow-lg rounded mt-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <ul className="py-2">
              {menuItems.actions.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate(item.route)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div> */}

        {/* Reports Menu (No Dropdown) */}
        {/* <button
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={() => navigate('/reports')}
        >
          Reports
        </button> */}
      </div>

      {/* Log Out Button */}
      <button className="text-gray-600 border font-semibold border-gray-200 rounded px-2 py-1 shadow-md" onClick={() => navigate('/')}>
        Log Out
      </button>
    </div>
  );
};

export default Navbar;
