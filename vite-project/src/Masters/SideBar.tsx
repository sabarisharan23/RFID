import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Hello, Bharath Nadig</h1>
      </div>
      <nav className="mt-4">
        <ul>
          <li className="px-4 py-2 hover:bg-gray-700">
            <a href="#dashboard">Dashboard</a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <a href="#masters">Masters</a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <a href="#actions">Actions</a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <a href="#reports">Reports</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
