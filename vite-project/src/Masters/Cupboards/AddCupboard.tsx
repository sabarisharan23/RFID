import React, { useState } from 'react';

const AddCupboard: React.FC = () => {
  const [cupboard, setCupboard] = useState('');
  const [rack, setRack] = useState('');
  const [cupboardDescription, setCupboardDescription] = useState('');

  const handleSave = () => {
    // Add save logic here
    console.log('Saved', { cupboard, rack, cupboardDescription });
  };

  const handleBack = () => {
    // Add back logic here
    console.log('Back');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="text-3xl font-semibold mt-6">Cupboards</div>

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
              <option value="">Select Rack</option>
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
            onClick={handleSave}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Save
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

export default AddCupboard;
