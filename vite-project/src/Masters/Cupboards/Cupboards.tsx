import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssetStore } from '../../store/store';
import * as XLSX from 'xlsx';

const CupboardsTable: React.FC = () => {
  const navigate = useNavigate();
  const { getAssetsByType, getAssetByRFID } = useAssetStore();
  const cupboards = getAssetsByType(23); // Fetch cupboards instead of racks

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
      {/* Navbar */}

      {/* Page Title */}
      <div className="text-3xl font-semibold ">Cupboards</div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => navigate('/add-cupboards')}>Add</button>
        {/* <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => navigate('/edit-cupboards')}>Edit</button> */}
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={downloadTableAsExcel}>Excel</button>
      </div>

      {/* Table */}
      <div className="bg-white mt-6 shadow rounded p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <label htmlFor="entries" className="text-gray-600">Show</label>
            <select id="entries" className="border border-gray-300 rounded p-1">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span className="text-gray-600">entries</span>
          </div>
          <div className="flex items-center">
            <label htmlFor="search" className="text-gray-600 mr-2">Search:</label>
            <input
              type="text"
              id="search"
              className="border border-gray-300 rounded p-1"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Table Data */}
        <table className="w-full mt-4 border border-gray-300" id='myTable'>
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border border-gray-300">Rack</th>
              <th className="p-2 border border-gray-300">Cupboard Name</th>
              <th className="p-2 border border-gray-300">Cupboard Description</th>
            </tr>
          </thead>
          <tbody>
            {cupboards.map((cupboard, index) => (
              <tr className="border-t" key={index}>
                <td className="p-2 border border-gray-300" rowSpan={cupboard.fields.length}>
                  {getAssetByRFID(cupboard.parentId)?.fields.name}
                </td>
                <td className="p-2 border border-gray-300">{cupboard.fields.name}</td>
                <td className="p-2 border border-gray-300">{cupboard.fields.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>Showing 1 to 2 of 2 entries</span>
          <div className="flex space-x-4">
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

export default CupboardsTable;
