import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangeRFIDTag: React.FC = () => {
  const [newTagId, setNewTagId] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const handleUpdate = () => {
    // Add update logic here
    console.log("New Tag ID:", newTagId);
    console.log("Notes:", notes);
  };

  const handleBack = () => {
    navigate("/RFIDTags");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <div className="text-2xl font-semibold ">Change RFID Tag</div>

      {/* Form Section */}
      <div className="bg-white p-6 shadow rounded">
        <div className="grid grid-cols-3 gap-6">
          {/* MFG PN */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              MFG PN
            </label>
            <input
              type="text"
              value="223313asadasdadad"
              readOnly
              className="block w-full border border-gray-300 rounded p-2 mt-1 bg-gray-200 cursor-not-allowed"
            />
          </div>

          {/* Asset Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Asset Name
            </label>
            <input
              type="text"
              value="RAM"
              readOnly
              className="block w-full border border-gray-300 rounded p-2 mt-1 bg-gray-200 cursor-not-allowed"
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Capacity
            </label>
            <input
              type="text"
              value="12GB"
              readOnly
              className="block w-full border border-gray-300 rounded p-2 mt-1 bg-gray-200 cursor-not-allowed"
            />
          </div>

          {/* New Tag ID */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              New Tag ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newTagId}
              onChange={(e) => setNewTagId(e.target.value)}
              className="block w-[30%] border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter New Tag ID"
            />
          </div>

          {/* Notes */}
          <div className="col-span-3">
            <label className="block  text-sm font-medium text-gray-700">
              Notes <span className="text-red-500">*</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="block  w-[20%]  border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter notes"
              rows={3}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleBack}
            className="bg-[#00B894] hover:bg-[#009D80] text-white py-2 px-4 rounded"
          >
            Back
          </button>
          <button
            onClick={handleUpdate}
            className="bg-[#6C5CE7] hover:bg-[#5B4BCE] text-white py-2 px-4 rounded"
          >
            Update
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

export default ChangeRFIDTag;
