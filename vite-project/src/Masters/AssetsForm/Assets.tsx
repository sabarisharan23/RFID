import React from 'react';
import { useNavigate } from 'react-router-dom';

const AssetTable: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Action Buttons */}
      <div className="bg-white p-4 shadow mb-6">
        <h1 className="text-3xl font-semibold pb-4">Assets</h1>
        <div className="space-x-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => navigate('/add-assets')}>Add</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => navigate('/edit-assets')}>Edit</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Excel</button>
       
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-4 shadow rounded">
        {/* Table Filter */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <label htmlFor="entries" className="mr-2 text-sm text-gray-600">Show</label>
            <select
              id="entries"
              className="border border-gray-300 rounded p-1 text-sm"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span className="ml-2 text-sm text-gray-600">entries</span>
          </div>

          {/* Search */}
          <div className="flex items-center">
            <label htmlFor="search" className="mr-2 text-sm text-gray-600">Search:</label>
            <input
              id="search"
              type="text"
              className="border border-gray-300 rounded p-1 text-sm"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border border-gray-300 text-left">Asset Name</th>
              <th className="p-2 border border-gray-300 text-left">MFG PN</th>
              <th className="p-2 border border-gray-300 text-left">Item ID</th>
              <th className="p-2 border border-gray-300 text-left">Model Number</th>
              <th className="p-2 border border-gray-300 text-left">Capacity</th>
              <th className="p-2 border border-gray-300 text-left">Tag ID</th>
              <th className="p-2 border border-gray-300 text-left">Type</th>
              <th className="p-2 border border-gray-300 text-left">Rack</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Row */}
            <tr>
              <td className="p-2 border border-gray-300">RAM</td>
              <td className="p-2 border border-gray-300">22331asadasdadad</td>
              <td className="p-2 border border-gray-300">-</td>
              <td className="p-2 border border-gray-300">-</td>
              <td className="p-2 border border-gray-300">12GB</td>
              <td className="p-2 border border-gray-300">123333434545Jdikas</td>
              <td className="p-2 border border-gray-300">Asset</td>
              <td className="p-2 border border-gray-300">-</td>
            </tr>
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>Showing 1 to 1 of 1 entries</span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded">Previous</button>
            <button className="px-3 py-1 border rounded">1</button>
            <button className="px-3 py-1 border rounded">Next</button>
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

export default AssetTable;
