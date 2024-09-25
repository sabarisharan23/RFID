import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      
      {/* Dashboard Header */}
      <div className="text-3xl font-semibold mt-6">Dashboard</div>

      {/* Main Cards */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* LAB-1 Card */}
        <div className="bg-white p-4 shadow rounded">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">LAB-1</div>
            <div className="bg-green-200 text-green-800 py-1 px-3 rounded-full text-sm">
              This Month
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">0</div>
            <div className="text-gray-500">Asset Movement</div>
            <div className="mt-4 text-3xl font-bold">1</div>
            <div className="text-gray-500">Asset Count</div>
          </div>
        </div>

        {/* Audit Card */}
        <div className="bg-white p-4 shadow rounded">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">Audit</div>
            <div className="bg-red-200 text-red-800 py-1 px-3 rounded-full text-sm">
              Today
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">0</div>
            <div className="text-gray-500">Audit</div>
            <button className="mt-4 bg-gray-100 text-gray-700 px-4 py-2 rounded">
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Asset Movement Tracking */}
      <div className="mt-8 bg-white p-4 shadow rounded">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold">Asset Movement Tracking</div>
          <div className="text-gray-500">Monthly</div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex">
          <div className="flex items-center mr-6">
            <div className="w-4 h-4 bg-gray-800 mr-2"></div>
            <div>Total Asset Movement</div>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-600 mr-2"></div>
            <div>Equipment Movement</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-gray-500 text-sm text-center">
        © 2024 www.mindteck.com
      </div>
      <div className="text-gray-500 text-sm text-center">
        Version : 1.0.1 June 04, 2020
      </div>
    </div>
  );
};

export default Dashboard;
