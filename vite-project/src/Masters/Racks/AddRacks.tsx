import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssetStore } from '../../store/store';

const RackForm: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState('');
  const [rackName, setRackName] = useState('');
  const [rackDescription, setRackDescription] = useState('');
  const { getAssetsByParentId,getAssetByRFID, addAsset } = useAssetStore();
  const [rowOptions, setRowOptions] = useState<any[]>([]); // Adjust the type as needed

  useEffect(() => {
    const fetchRowOptions = async () => {
      try {
        const options = await getAssetsByParentId('1234567890'); // Replace with the actual parentId
        setRowOptions(options);
      } catch (error) {
        console.error('Error fetching row options:', error);
      }
    };

    fetchRowOptions();
  }, [getAssetsByParentId]); // Dependency array includes getAssetsByParentId

  const handleSave = () => {
    // Add save logic here
    addAsset("01234567891", 22, { name: rackName, description: rackDescription }, selectedRow);
    console.log('Saved', { selectedRow, rackName, rackDescription });
    // Optionally, navigate to another page after saving
    navigate('/racks');
  };

  const handleBack = () => {
    navigate('/racks');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="text-3xl font-semibold mt-6">Add Racks</div>

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
                value={selectedRow}
                onChange={(e) => setSelectedRow(e.target.value)}
                className="block w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select a Row</option>
                {rowOptions.map((option) => (
                  <option key={option.RFID} value={option.RFID}>
                    {option.fields.name} - {option.fields.description}
                  </option>
                ))}
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
