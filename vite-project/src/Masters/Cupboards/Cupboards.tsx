import React from "react";
import { useNavigate } from "react-router-dom";
import { useAssetStore } from "../../store/store";
import * as XLSX from "xlsx";

const CupboardsTable: React.FC = () => {
  const navigate = useNavigate();
  const { getAssetsByType, getAssetByRFID } = useAssetStore();
  const cupboards = getAssetsByType(23); // Assuming 23 is the type ID for cupboards

  const downloadTableAsExcel = () => {
    const table = document.getElementById("cupboardsTable");
    if (!table) {
      console.error("Table not found!");
      return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(wb, ws, "Cupboards");
    XLSX.writeFile(wb, "cupboards.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <div className="text-3xl font-semibold">Cupboards</div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => navigate("/add-cupboards")}
          className="bg-[#1ABC9C] hover:bg-[#16A085] text-white py-2 px-4 rounded"
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
        <table className="w-full mt-4 border border-gray-300" id="cupboardsTable">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border border-gray-300">Rack</th>
              <th className="p-2 border border-gray-300">Cupboard Name</th>
              <th className="p-2 border border-gray-300">Cupboard Description</th>
              <th className="p-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {cupboards.map((cupboard) => {
              const parentRack = cupboard.parentId
                ? getAssetByRFID(cupboard.parentId)
                : null;
              return (
                <tr key={cupboard.RFID} className="border-t">
                  <td className="p-2 border border-gray-300">
                    {parentRack ? parentRack.fields.name : "N/A"}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {cupboard.fields.name}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {cupboard.fields.description}
                  </td>
                  <td className="p-2 border border-gray-200 flex justify-center">
                    <button
                      className="bg-[#1ABC9C] hover:bg-[#16A085] text-white py-2 px-4 rounded"
                      onClick={() => navigate(`/edit-cupboards/${cupboard.RFID}`)}
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
            Showing {cupboards.length > 0 ? 1 : 0} to {cupboards.length} of{" "}
            {cupboards.length} entries
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

export default CupboardsTable;
