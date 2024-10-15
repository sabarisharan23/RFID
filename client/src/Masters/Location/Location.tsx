import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { useAssetStore } from "../../store/zustendStore/useAssetStore"; // Adjust the import path as needed
import ActionButton from "../../Components/Buttons";

const Location: React.FC = () => {
  const navigate = useNavigate();
  const locations = useAssetStore((state) => state.getLocations());
  const { deleteLocation } = useAssetStore();
  // Retrieve locations from Zustand store
  const [entries, setEntries] = useState<number>(10); // State for number of entries to show

  const downloadTableAsExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(locations);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "locations_data.xlsx");
  };
  const handleDelete = (id:number) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      deleteLocation(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold pb-4">Locations</h1>
      <div className="flex space-x-4 pb-3">

        <ActionButton type="add" onClick={() => navigate("/add-location")} />
        <ActionButton type="excel" onClick={downloadTableAsExcel} />
      </div>
      <div className="flex justify-between items-center mb-4"></div>
      <div className="bg-white p-4 shadow rounded">
        <div className="flex items-center pb-3">
          <label htmlFor="entries" className="mr-2 text-gray-600">
            Show
          </label>
          <select
            id="entries"
            className="border border-gray-300 rounded p-1 text-sm"
            value={entries}
            onChange={(e) => setEntries(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="ml-2 text-sm text-gray-600">entries</span>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border border-gray-300 text-left">
                  Location Name
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Location Description
                </th>
                <th className="p-2 border border-gray-300 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location.id} className="relative group item-center">
                  <td className="p-2 border border-gray-300">
                    {location.name}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {location.description}
                  </td>
                  <td className="p-2 border flex justify-center items-center gap-5 border-gray-300 ">
                    <ActionButton type="edit" onClick={() => navigate(`/edit-location/${location.id}`)} />
                    <ActionButton type="delete" onClick={() => handleDelete (location.id)} />
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>
            Showing 1 to {locations.length} of {locations.length} entries
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

export default Location;
