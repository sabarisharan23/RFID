import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditCupboard: React.FC = () => {
  const navigate = useNavigate();
  const [cupboard, setCupboard] = useState('cup-1');
  const [rack, setRack] = useState('g-ty');
  const [cupboardDescription, setCupboardDescription] = useState('gty-100');

  const handleUpdate = () => {
    // Add update logic here
    console.log('Updated', { cupboard, rack, cupboardDescription });
  };

  const handleDelete = () => {
    // Add delete logic here
    console.log('Deleted', { cupboard });
  };

  const handleBack = () => {
   navigate('/cupboards');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="text-2xl font-semibold">Edit Cupboards</div>

      {/* Form */}
      <div className="bg-white mt-6 shadow rounded p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Cupboard Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cupboard <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={cupboard}
              onChange={(e) => setCupboard(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter Cupboard"
            />
          </div>

          {/* Rack Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rack <span className="text-red-500">*</span>
            </label>
            <select
              value={rack}
              onChange={(e) => setRack(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
            >
              <option value="g-ty">g-ty</option>
              <option value="rack 1">rack 1</option>
            </select>
          </div>

          {/* Cupboard Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cupboard Description
            </label>
            <input
              type="text"
              value={cupboardDescription}
              onChange={(e) => setCupboardDescription(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter Description"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleBack}
            className="bg-red-500 text-white px-4 py-2 rounded"
            
          >
            Back
          </button>
          <button
            onClick={handleUpdate}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default EditCupboard;
