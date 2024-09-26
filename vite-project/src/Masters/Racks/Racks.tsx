import React from "react";
import { useNavigate } from "react-router-dom";
import { useAssetStore } from "../../store/store";
import * as XLSX from "xlsx";

const Racks: React.FC = () => {
  const navigate = useNavigate();
  const { getAssetsByType, getAssetByRFID } = useAssetStore();
  const racks = getAssetsByType(22); // Assuming 22 is the type ID for racks

  const downloadTableAsExcel = () => {
    const table = document.getElementById("myTable");
    if (!table) {
      console.error("Table not found!");
      return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(wb, ws, "Racks");
    XLSX.writeFile(wb, "racks.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <div className="text-2xl font-semibold">Racks</div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-4">
        <button
          className="bg-[#1ABC9C] hover:bg-[#16A085] text-white py-2 px-4 rounded"
          onClick={() => navigate("/add-racks")}
        >
          Add
        </button>
        <button
          className="bg-[#F39C12] hover:bg-[#E67E22] text-white py-2 px-4 rounded"
          onClick={downloadTableAsExcel}
        >
          Export to Excel
        </button>
      </div>

      {/* Table */}
      <div className="bg-white mt-6 shadow rounded p-4">
        {/* Table Controls */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <label htmlFor="entries" className="text-gray-600">
              Show
            </label>
            <select id="entries" className="border border-gray-300 rounded p-1">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span className="text-gray-600">entries</span>
          </div>
          <div className="flex items-center">
            <label htmlFor="search" className="text-gray-600 mr-2">
              Search:
            </label>
            <input
              type="text"
              id="search"
              className="border border-gray-300 rounded p-1"
              placeholder="Search"
              // Implement search functionality as needed
            />
          </div>
        </div>

        {/* Table Data */}
        <table className="w-full mt-4 border border-gray-300" id="myTable">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border border-gray-300">Row</th>
              <th className="p-2 border border-gray-300">Rack Name</th>
              <th className="p-2 border border-gray-300">Rack Description</th>
              <th className="p-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {racks.map((rack) => {
              const parent = rack.parentId
                ? getAssetByRFID(rack.parentId)
                : null;
              return (
                <tr key={rack.RFID} className="border-t">
                  <td className="p-2 border border-gray-300">
                    {parent ? parent.fields.name : "N/A"}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {rack.fields.name}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {rack.fields.description}
                  </td>
                  <td className="p-2 border border-gray-200 flex justify-center">
                    <button
                      className="bg-[#1ABC9C] hover:bg-[#16A085] text-white py-2 px-4 rounded"
                      onClick={() => navigate(`/edit-racks/${rack.RFID}`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>
            Showing {racks.length > 0 ? 1 : 0} to {racks.length} of{" "}
            {racks.length} entries
          </span>
          <div className="flex space-x-4">
            <button className="px-3 py-1 border rounded">Previous</button>
            <button className="px-3 py-1 border rounded">1</button>
            <button className="px-3 py-1 border rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Racks;
