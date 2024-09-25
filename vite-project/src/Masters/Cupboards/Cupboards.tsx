import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CupboardTable: React.FC = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState('');

  const data = [
    { cupboard: 'cup-1', rack: 'g-ty', description: 'gty-100' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="text-+++2xl font-semibold ">Cupboards</div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => navigate('/add-cupboards')}>Add</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => navigate('/edit-cupboards')}>Edit</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded">Excel</button>
      </div>

      {/* Table */}
      <div className="bg-white mt-6 shadow rounded p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <label htmlFor="entries" className="text-gray-600">Show</label>
            <select
              id="entries"
              value={entries}
              onChange={(e) => setEntries(Number(e.target.value))}
              className="border border-gray-300 rounded p-1"
            >
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded p-1"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Table Data */}
        <table className="w-full mt-4 border border-gray-300">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border border-gray-300">Cupboard</th>
              <th className="p-2 border border-gray-300">Rack</th>
              <th className="p-2 border border-gray-300">Description</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) =>
                item.cupboard.toLowerCase().includes(search.toLowerCase()) ||
                item.rack.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase())
              )
              .map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2 border border-gray-300">{item.cupboard}</td>
                  <td className="p-2 border border-gray-300">{item.rack}</td>
                  <td className="p-2 border border-gray-300">{item.description}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>Showing 1 to 1 of 1 entries</span>
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

export default CupboardTable;
