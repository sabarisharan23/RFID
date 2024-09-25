import React, { useState } from 'react';

const RackForm: React.FC = () => {
  const [row, setRow] = useState('');
  const [rackName, setRackName] = useState('');
  const [rackDescription, setRackDescription] = useState('');

  const handleSave = () => {
    // Add save logic here
    console.log('Saved', { row, rackName, rackDescription });
  };

  const handleBack = () => {
    // Add back logic here
    console.log('Back');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="text-3xl font-semibold mt-6">Racks</div>

      {/* Form */}
      <div className="bg-white mt-6 shadow rounded p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Row Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Row <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-2 mt-1">
              <select
                value={row}
                onChange={(e) => setRow(e.target.value)}
                className="block w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select a Row</option>
                <option value="prison">prison</option>
                <option value="LAB-1">LAB-1</option>
                <option value="capsule">capsule</option>
                <option value="Filers, Switches, DS">Filers, Switches, DS</option>
              </select>
              <button className="bg-red-500 text-white px-2 py-2 rounded-full">
                +
              </button>
            </div>
          </div>

          {/* Rack Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rack Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={rackName}
              onChange={(e) => setRackName(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter Rack Name"
            />
          </div>

          {/* Rack Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rack Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={rackDescription}
              onChange={(e) => setRackDescription(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter Rack Description"
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

export default RackForm;
