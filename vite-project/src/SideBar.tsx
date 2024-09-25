import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaBars, FaCog, FaTag } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMasterOpen, setIsMasterOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null); // For hover in closed state

  // Menu structure with submenus
  const menuItems = [
    {
      label: 'Master',
      icon: <FaCog />,
      submenu: [
        { label: 'Rack', route: '/racks' },
        { label: 'Cupboard', route: '/cupboards' },
        { label: 'Assets', route: '/assets' },
      ],
    },
    {
      label: 'Actions',
      icon: <FaTag />,
      submenu: [
        { label: 'Asset', route: '/assets' },
        { label: 'Configure RFID', route: '/RFIDTags' },
      ],
    },
  ];

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Submenu toggle handlers
  const toggleMaster = () => {
    setIsMasterOpen(!isMasterOpen);
  };

  const toggleActions = () => {
    setIsActionsOpen(!isActionsOpen);
  };

  return (
    <div className={`bg-gray-800 text-white ${isSidebarOpen ? 'w-64' : 'w-16'} h-full relative transition-all duration-300`}>
      {/* Hamburger Icon */}
      <div className={`flex items-center mt-5 ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>

      <button className="p-2 mb-4" onClick={toggleSidebar}>
        <FaBars className={`text-xl ${isSidebarOpen ? 'rotate-0' : 'rotate-180'} transition-transform duration-300`} />
      </button>

      <h2 className={`text-lg font-semibold mb-4 px-2 ${isSidebarOpen ? 'block' : 'hidden'}`}>Menu</h2>
      </div>
      {/* Menu List */}
      <ul>
        {/* Master Menu */}
        <li
          className="py-2 cursor-pointer group relative"
          onClick={() => isSidebarOpen && toggleMaster()} // Toggle only if sidebar is open
          onMouseEnter={() => !isSidebarOpen && setHoveredMenu('Master')}
          onMouseLeave={() => !isSidebarOpen && setHoveredMenu(null)}
        >
          <div className={`flex items-center hover:bg-gray-700 px-2 py-2 rounded-md ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
            {!isSidebarOpen && <span>{menuItems[0].icon}</span>}
            {isSidebarOpen && (
              <>
                <span className="ml-4">{menuItems[0].label}</span>
                {isMasterOpen ? <FaChevronUp /> : <FaChevronDown />}
              </>
            )}
          </div>

          {/* Submenu for Master */}
          {isMasterOpen && isSidebarOpen && (
            <ul className="ml-4 mt-2 space-y-2">
              {menuItems[0].submenu.map((item, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:bg-gray-700 px-2 py-1 rounded-md"
                  onClick={() => navigate(item.route)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          )}

          {/* Show submenu in absolute position on hover when sidebar is closed */}
          {!isSidebarOpen && hoveredMenu === 'Master' && (
            <div className="absolute left-16 top-0 w-48 bg-gray-800 shadow-lg rounded-md z-50">
              <h3 className="text-white px-4 py-2">Master</h3>
              <ul className="ml-4 mt-2 space-y-2">
                {menuItems[0].submenu.map((item, index) => (
                  <li
                    key={index}
                    className="cursor-pointer hover:bg-gray-700 px-2 py-1 rounded-md"
                    onClick={() => navigate(item.route)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>

        {/* Actions Menu */}
        <li
          className="py-2 cursor-pointer group relative"
          onClick={() => isSidebarOpen && toggleActions()}
          onMouseEnter={() => !isSidebarOpen && setHoveredMenu('Actions')}
          onMouseLeave={() => !isSidebarOpen && setHoveredMenu(null)}
        >
          <div className={`flex items-center hover:bg-gray-700 px-2 py-2 rounded-md ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
            {!isSidebarOpen && <span>{menuItems[0].icon}</span>}
            {isSidebarOpen && (
              <>
                <span className="ml-4">{menuItems[1].label}</span>
                {isActionsOpen ? <FaChevronUp /> : <FaChevronDown />}
              </>
            )}
          </div>

          {/* Submenu for Actions */}
          {isActionsOpen && isSidebarOpen && (
            <ul className="ml-4 mt-2 space-y-2">
              {menuItems[1].submenu.map((item, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:bg-gray-700 px-2 py-1 rounded-md"
                  onClick={() => navigate(item.route)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          )}

          {/* Show submenu in absolute position on hover when sidebar is closed */}
          {!isSidebarOpen && hoveredMenu === 'Actions' && (
            <div className="absolute left-16 top-0 w-48 bg-gray-800 shadow-lg rounded-md z-50">
              <h3 className="text-white px-4 py-2">Actions</h3>
              <ul className="ml-4 mt-2 space-y-2">
                {menuItems[1].submenu.map((item, index) => (
                  <li
                    key={index}
                    className="cursor-pointer hover:bg-gray-700 px-2 py-1 rounded-md"
                    onClick={() => navigate(item.route)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
