import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAssetStore } from "../../../store/zustendStore/useAssetStore"; // Adjust the import path as needed
import * as XLSX from "xlsx";
import ActionButton from "../../../Components/Buttons";

const AssetTable: React.FC = () => {
  const navigate = useNavigate();
  const { assets, getTypeById, getAssetByRFID, deleteAsset } = useAssetStore();
  const [searchQuery, setSearchQuery] = useState("");

  // List of types to exclude
  const typesToExclude = ["location", "row", "rack", "cupboard"];

  // Filter assets to exclude specific types and apply search
  const filteredAssets = assets
    .filter((asset) => {
      const typeName = getTypeById(asset.type)?.name.toLowerCase() || "";
      return !typesToExclude.includes(typeName);
    })
    .filter((asset) => {
      const name = asset.fields.name || getTypeById(asset.type)?.name || "";
      const rfid = asset.RFID || "";
      const typeName = getTypeById(asset.type)?.name || "";
      const location = getAssetByRFID(asset.parentId)?.fields.name || "-";
      const available = asset.isAvailable ? "Yes" : "No";
      const quantity = asset.fields.quantity || "-";
      const searchString = `${name} ${rfid} ${typeName} ${location} ${available}  ${quantity}`.toLowerCase();
      return searchString.includes(searchQuery.toLowerCase());
    });

  function downloadTableAsExcel() {
    const table = document.getElementById("myTable");
    const wb = XLSX.utils.book_new();
    const rows = table!.rows;
    const data: string[][] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = [];
      for (let j = 0; j < rows[i].cells.length - 1; j++) {
        row.push(rows[i].cells[j].innerText);
      }
      data.push(row);
    }

    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "Assets.xlsx");
  }

  // Handle delete action
  const handleDelete = (rfid: string) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      deleteAsset(rfid);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div>
        <h1 className="text-2xl font-semibold pb-4">Assets</h1>
        <div className="space-x-4 pb-6">
          
          <ActionButton type="add" onClick={() => navigate("/add-assets")} />
          <ActionButton type="excel" onClick={downloadTableAsExcel} />
          
        </div>
      </div>

      <div className="bg-white p-4 shadow rounded">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <label htmlFor="entries" className="mr-2 text-gray-600">
              Show
            </label>
            <select id="entries" className="border border-gray-300 rounded p-1 text-sm">
              <option value="10">10</option> 
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span className="ml-2 text-sm text-gray-600">entries</span>
          </div>

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

        <div className="relative overflow-x-auto">
          <table
            className="w-full table-auto border-collapse border border-gray-300 overflow-hidden"
            id="myTable"
          >
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border border-gray-300 text-left">Asset Name</th>
                <th className="p-2 border border-gray-300 text-left">Tag ID</th>
                <th className="p-2 border border-gray-300 text-left">Type</th>
                <th className="p-2 border border-gray-300 text-left">Location</th>
                <th className="p-2 border border-gray-300 text-left">Available</th>
                <th className="p-2 border border-gray-300 text-left">Quantity</th>
                <th className="p-2 border border-gray-300 text-left" id="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => (
                <tr key={asset.RFID} className="relative group item-center">
                  <td className="p-2 border border-gray-300">
                    {asset.fields.name || getTypeById(asset.type)?.name}
                  </td>
                  <td className="p-2 border border-gray-300">{asset.RFID}</td>
                  <td className="p-2 border border-gray-300">{getTypeById(asset.type)?.name}</td>
                  <td className="p-2 border border-gray-300">
                    {getAssetByRFID(asset.parentId)?.fields.name || "-"}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {asset.isAvailable ? "Yes" : "No"}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {asset.fields.quantity || "-"}
                  </td>

                  <td className="p-2 border border-gray-200 justify-center flex space-x-2">
                    <ActionButton type="edit" onClick={() => navigate(`/edit-assets/${asset.RFID}`)} />
                    <ActionButton type="delete" onClick={() => handleDelete(asset.RFID)} />
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
