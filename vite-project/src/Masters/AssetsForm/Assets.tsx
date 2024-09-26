import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssetStore } from '../../store/store';
import * as XLSX from 'xlsx';

const AssetTable: React.FC = () => {
  const navigate = useNavigate();
  const {assets,getTypeById, getAssetByRFID} = useAssetStore();

  function downloadTableAsExcel() {
    // Select the table element
    const table = document.getElementById('myTable');
    
    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(table);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate Excel file and prompt download
    XLSX.writeFile(wb, 'table.xlsx');
}
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Action Buttons */}
      <div className="">
        <h1 className="text-2xl font-semibold pb-4">Assets</h1>
        <div className="space-x-4 pb-6">
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => navigate('/add-assets')}>Add</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => navigate('/edit-assets')}>Edit</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={downloadTableAsExcel}>Excel</button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-4 shadow rounded">
        {/* Table Filter */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <label htmlFor="entries" className="mr-2  text-gray-600">Show</label>
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
        <table className="w-full table-auto border-collapse border border-gray-300" id='myTable'>
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border border-gray-300 text-left">Asset Name</th>
              <th className="p-2 border border-gray-300 text-left">RFID</th>
              <th className="p-2 border border-gray-300 text-left">TYPE</th>
              <th className="p-2 border border-gray-300 text-left">Location</th>
              <th className="p-2 border border-gray-300 text-left">Available</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Row */}
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td className="p-2 border border-gray-300">{asset.fields.name || getTypeById(asset.type)?.name}</td>
                <td className="p-2 border border-gray-300">{asset.RFID}</td>
                <td className="p-2 border border-gray-300">{getTypeById(asset.type)?.name}</td>
                <td className="p-2 border border-gray-300">{getAssetByRFID(asset.parentId)?.fields.name || "-"}</td>  
                <td className="p-2 border border-gray-300">{asset.isAvailable? "Yes" : "No"}</td>
              </tr>
            ))}
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
     
    </div>
  );
};

export default AssetTable;
