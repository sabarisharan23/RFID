import React from "react";
import { useNavigate } from "react-router-dom";

const RFIDTag: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <div className="text-2xl font-semibold pb-4 ">Change RFID Tag</div>

      {/* Action Button */}
      <div className="mb-4 flex gap-4">
        <button
            className="bg-[#1ABC9C] hover:bg-[#16A085] text-white py-2 px-4 rounded"
            onClick={() => navigate("/changeRFID")}
        >
          Change
        </button>
        <button className="bg-[#F39C12] hover:bg-[#E67E22] text-white py-2 px-4 rounded">
          Excel
        </button>
        <button
          className="bg-zinc-100 border border-zinc-300 shadow-md text-black  px-4 py-2 rounded"
          onClick={() => {
            navigate("/disableRFID");
          }}
        >
          Enable / Disable
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white p-4 shadow rounded">
        {/* Table Filter */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <label htmlFor="entries" className="mr-2 text-sm text-gray-600">
              Show
            </label>
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
            <label htmlFor="search" className="mr-2 text-sm text-gray-600">
              Search:
            </label>
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
              <th className="p-2 border border-gray-300 text-left">
                Asset Name
              </th>
              <th className="p-2 border border-gray-300 text-left">MFG PN</th>
              <th className="p-2 border border-gray-300 text-left">ItemID</th>
              <th className="p-2 border border-gray-300 text-left">Capacity</th>
              <th className="p-2 border border-gray-300 text-left">
                Previous Tag ID
              </th>
              <th className="p-2 border border-gray-300 text-left">
                Current Tag ID
              </th>
              <th className="p-2 border border-gray-300 text-left">
                User Name
              </th>
              <th className="p-2 border border-gray-300 text-left">Date</th>
              <th className="p-2 border border-gray-300 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Row */}
            <tr>
              <td className="p-2 border border-gray-300">RAM</td>
              <td className="p-2 border border-gray-300">223313asadasdadad</td>
              <td className="p-2 border border-gray-300">-</td>
              <td className="p-2 border border-gray-300">12GB</td>
              <td className="p-2 border border-gray-300">-</td>
              <td className="p-2 border border-gray-300">123333434545Jdikas</td>
              <td className="p-2 border border-gray-300">Bharath Nadig</td>
              <td className="p-2 border border-gray-300">09-12-2024</td>
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
    </div>
  );
};

export default RFIDTag;
