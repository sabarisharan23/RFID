import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DisableRFIDTag: React.FC = () => {
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  const handleDisable = () => {
    // Add disable logic here
    console.log('Notes:', notes);
  };

  const handleBack = () => {
navigate('/RFIDTags');
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <div className="text-2xl font-semibold pb-4">Disable RFID Tag</div>

      {/* Table Section */}
      <div className="bg-white p-6 shadow rounded">
        <table className="w-full table-auto border-collapse border border-gray-300 mb-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border border-gray-300 text-left">MFG PN</th>
              <th className="p-2 border border-gray-300 text-left">Asset Name</th>
              <th className="p-2 border border-gray-300 text-left">Capacity</th>
              <th className="p-2 border border-gray-300 text-left">ItemID</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Row */}
            <tr>
              <td className="p-2 border border-gray-300">223313asadasdadad</td>
              <td className="p-2 border border-gray-300">RAM</td>
              <td className="p-2 border border-gray-300">12GB</td>
              <td className="p-2 border border-gray-300">-</td>
            </tr>
          </tbody>
        </table>

        {/* Notes Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Notes <span className="text-red-500">*</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="block w-[30%] border border-gray-300 rounded p-2 mt-1"
            placeholder="Enter notes"
            rows={4}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleBack}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Back
          </button>
          <button
            onClick={handleDisable}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Disable
          </button>
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

export default DisableRFIDTag;
