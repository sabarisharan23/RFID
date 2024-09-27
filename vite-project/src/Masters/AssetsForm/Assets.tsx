import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAssetStore } from "../../store/store";
import * as XLSX from "xlsx";

const AssetTable: React.FC = () => {
  const navigate = useNavigate();
  const { assets, getTypeById, getAssetByRFID } = useAssetStore();
  const [searchQuery, setSearchQuery] = useState("");


  // List of types to exclude
  const typesToExclude = ["location", "row", "rack", "cupboard"];

  // Filter assets to exclude specific types and apply search
  const filteredAssets = assets
    .filter((asset) => {
      const typeName = getTypeById(asset.type)?.name.toLowerCase() || "";
      // Exclude assets of type 'location', 'row', 'rack', 'cupboard'
      return !typesToExclude.includes(typeName);
    })
    .filter((asset) => {
      const name = asset.fields.name || getTypeById(asset.type)?.name || "";
      const rfid = asset.RFID || "";
      const typeName = getTypeById(asset.type)?.name || "";
      const location = getAssetByRFID(asset.parentId)?.fields.name || "-";
      const available = asset.isAvailable ? "Yes" : "No";

      const searchString = `${name} ${rfid} ${typeName} ${location} ${available}`.toLowerCase();
      return searchString.includes(searchQuery.toLowerCase());
    });


    function downloadTableAsExcel() {
      // Select the table element
      const table = document.getElementById('myTable');
      
      // Create a new workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.table_to_sheet(table);
  
      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
      // Generate Excel file and prompt download
      XLSX.writeFile(wb, 'Assets.xlsx');
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Action Buttons */}
      <div>
        <h1 className="text-2xl font-semibold pb-4">Assets</h1>
        <div className="space-x-4 pb-6">
          <button
            className="bg-[#1ABC9C] hover:bg-[#16A085] text-white py-2 px-4 rounded"
            onClick={() => navigate("/add-assets")}
          >
            Add
          </button>
          <button
            className="bg-[#F39C12] hover:bg-[#E67E22] text-white py-2 px-4 rounded"
            onClick={downloadTableAsExcel}
          >
            Excel
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-4 shadow rounded">
        {/* Table Filter */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <label htmlFor="entries" className="mr-2 text-gray-600">
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto">
          <table
            className="w-full table-auto border-collapse border border-gray-300 overflow-hidden"
            id="myTable"
          >
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border border-gray-300 text-left">
                  Asset Name
                </th>
                <th className="p-2 border border-gray-300 text-left">RFID</th>
                <th className="p-2 border border-gray-300 text-left">TYPE</th>
                <th className="p-2 border border-gray-300 text-left">
                  Location
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Available
                </th>
                <th className="p-2 border border-gray-300 text-left" id="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="relative group item-center">
                  <td className="p-2 border border-gray-300">
                    {asset.fields.name || getTypeById(asset.type)?.name}
                  </td>
                  <td className="p-2 border border-gray-300">{asset.RFID}</td>
                  <td className="p-2 border border-gray-300">
                    {getTypeById(asset.type)?.name}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {getAssetByRFID(asset.parentId)?.fields.name || "-"}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {asset.isAvailable ? "Yes" : "No"}
                  </td>

                  {/* Edit Button */}
                  <td
                    className="p-2 border border-gray-200 justify-center flex"
                    id="col"
                  >
                    <button
                      className="bg-[#1ABC9C] hover:bg-[#16A085] text-white py-2 px-4 rounded"
                      onClick={() => navigate(`/edit-assets/${asset.RFID}`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>
            Showing {filteredAssets.length > 0 ? 1 : 0} to {filteredAssets.length} of{" "}
            {assets.length} entries
          </span>
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

export default AssetTable;
