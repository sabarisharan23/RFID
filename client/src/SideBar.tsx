import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GrTransaction } from "react-icons/gr";
import { FaChevronDown, FaChevronUp, FaBars, FaCog } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { MdRequestPage } from "react-icons/md";
import { PiHardDrives } from "react-icons/pi";



// Define the structure of the menu items and submenus
type SubmenuItem = {
  label: string;
  route: string;
};

type MenuItem = {
  label: string;
  icon: JSX.Element;
  route?: string; // Optional if the item has a submenu
  submenu?: SubmenuItem[]; // Optional if there are no submenus
};

// Sidebar Component
const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To determine the active route
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});

  // Retrieve the role from localStorage
  const role = localStorage.getItem("role");

  // Define your menu items for admin
  const adminMenuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: <MdDashboard />,
      route: "/dashboard",
    },
    {
      label: "Master",
      icon: <FaCog />,
      submenu: [
        { label: "Location", route: "/location" },
        // { label: "Row", route: "/row" },
        { label: "Rack", route: "/racks" },
        { label: "Cupboard", route: "/cupboards" },
        { label: "Assets", route: "/assets" },
      ],
    },
    {
      label: "Actions",
      icon: <GrTransaction />,
      submenu: [
        { label: "Transaction History", route: "/transaction-history" },
        { label: "Track Assets", route: "/track-assets" },
        { label: "Request", route: "/request" },
      ],
    },
    {
      label: "Reports",
      icon: <TbReport />,
      submenu: [
        { label: "Asset Search", route: "/asset-search" },
        { label: "Asset Reports", route: "/asset-identification" },
      ],
    },
  ];

  // Define your menu items for regular users
  const userMenuItems: MenuItem[] = [
    {
      label: "User Dashboard",
      icon: <MdDashboard />,
      route: "/user-dashboard",
    },
    {
      label: "User Assets",
      icon: <PiHardDrives />,
      route: "/user-assets",
    },
    {
      label: "User Request",
      icon: <MdRequestPage />,
      route: "/user-requests",
    },
    
  ];

  // Toggle the sidebar open/closed
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (isSidebarOpen) {
      setOpenSubmenus({});
    }
  };

  // Toggle the visibility of a submenu
  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  // Handle click on a menu item
  const handleItemClick = (item: MenuItem) => {
    if (item.submenu) {
      toggleSubmenu(item.label);
    } else if (item.route) {
      navigate(item.route);
    }
  };

  // Handle click on a submenu item
  const handleSubmenuItemClick = (route: string) => {
    navigate(route);
  };

  // Determine if a route is active
  const isActive = (route: string) => location.pathname === route;

  // Determine if a menu item is active (for headings)
  const isMenuActive = (item: MenuItem) => {
    if (item.submenu) {
      return item.submenu.some((sub) => isActive(sub.route));
    }
    return isActive(item.route || "");
  };

  // Choose the menu items based on user role
  const menuItems = role === "admin" ? adminMenuItems : userMenuItems;

  return (
    <div
      className={`bg-[#121621] text-[#ECF0F1] ${isSidebarOpen ? "w-64" : "w-16"} h-full relative transition-all duration-300 overflow-auto`}
    >
      {/* Sidebar Header */}
      <div className={`flex items-center mt-5 ${isSidebarOpen ? "justify-start" : "justify-center"}`}>
        <button className="p-2 mb-4" onClick={toggleSidebar}>
          <FaBars className={`text-xl ${isSidebarOpen ? "rotate-0" : "rotate-180"} transition-transform duration-300 text-[#BDC3C7]`} />
        </button>
        {isSidebarOpen && <h2 className="text-lg font-semibold mb-4 px-2">Menu</h2>}
      </div>

      {/* Menu Items */}
      <ul>
        {menuItems.map((menuItem) => {
          const hasSubmenu = !!menuItem.submenu;
          const isSubmenuOpen = openSubmenus[menuItem.label];
          const menuActive = isMenuActive(menuItem);

          return (
            <li
              key={menuItem.route || menuItem.label}
              className="py-2 cursor-pointer group relative"
              onClick={() => handleItemClick(menuItem)}
              onMouseEnter={() =>
                !isSidebarOpen && hasSubmenu ? setHoveredMenu(menuItem.label) : null
              }
              onMouseLeave={() =>
                !isSidebarOpen && hasSubmenu ? setHoveredMenu(null) : null
              }
            >
              {/* Menu Item */}
              <div
                className={`flex items-center px-2 py-2 ${
                  isSidebarOpen ? "justify-between" : "justify-center"
                } ${
                  menuActive ? "bg-[#635bff]" : "hover:bg-[#1ABC9C] transition-colors duration-200"
                } rounded-md`}
              >
                {/* Icon and Label */}
                <div className="flex items-center">
                  <span className="text-xl">{menuItem.icon}</span>
                  {isSidebarOpen && <span className="ml-4">{menuItem.label}</span>}
                </div>

                {/* Chevron for submenu items */}
                {isSidebarOpen && hasSubmenu && (
                  <span className="ml-2">
                    {isSubmenuOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                )}
              </div>

              {/* Submenu */}
              {hasSubmenu && isSidebarOpen && isSubmenuOpen && (
                <div className="bg-[#262626] text-[#ECF0F1] w-full mt-1 rounded-md">
                  <ul className="w-full">
                    {menuItem.submenu.map((subItem) => (
                      <li
                        key={subItem.route}
                        className={`w-full text-white px-4 py-2 rounded-md ${
                          isActive(subItem.route) ? "bg-[#1ABC9C]" : "hover:bg-[#1ABC9C] transition-colors duration-200"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering parent onClick
                          handleSubmenuItemClick(subItem.route);
                        }}
                      >
                        {subItem.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Hover Tooltip for Collapsed Sidebar */}
              {!isSidebarOpen && (
                <div
                  className={`absolute left-16 top-0 w-48 bg-[#2C3E50] shadow-lg rounded-md z-50 ${
                    hoveredMenu === menuItem.label ? "block" : "hidden"
                  }`}
                >
                  <h3 className="text-white px-4 py-2">{menuItem.label}</h3>
                  {hasSubmenu && (
                    <ul className="ml-4 mt-2 space-y-2">
                      {menuItem.submenu.map((subItem) => (
                        <li
                          key={subItem.route}
                          className={`cursor-pointer hover:bg-[#1ABC9C] px-2 py-1 rounded-md ${
                            isActive(subItem.route) ? "bg-[#1ABC9C]" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubmenuItemClick(subItem.route);
                            setHoveredMenu(null); // Close tooltip after click
                          }}
                        >
                          {subItem.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
