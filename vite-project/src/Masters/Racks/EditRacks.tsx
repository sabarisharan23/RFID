import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAssetStore } from '../../store/store';

const RowForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Get the ID from the URL
  const { getAssetById } = useAssetStore(); // Assume you have a method to get asset by ID
  const [rowName, setRowName] = useState('');
  const [rowDescription, setRowDescription] = useState('');

  useEffect(() => {
    if (id) {
      const asset = getAssetById(id); // Fetch asset details by ID
      if (asset) {
        setRowName(asset.fields.name);
        setRowDescription(asset.fields.description);
      }
    }
  }, [id, getAssetById]);

  const handleUpdate = () => {
    // Add save logic here
    console.log('Saved', { rowName, rowDescription });
  };
  
  const handleBack = () => {
    navigate('/racks');
  };

  const handleDelete = () => {
    console.log('Deleted', { rowName, rowDescription });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="text-2xl font-semibold">Edit Rack</div>
      <div className="bg-white mt-6 shadow rounded p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Row Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={rowName}
              onChange={(e) => setRowName(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter Row Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Row Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={rowDescription}
              onChange={(e) => setRowDescription(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter Row Description"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button onClick={handleBack} className="bg-red-500 text-white px-4 py-2 rounded">
            Back
          </button>
          <button onClick={handleUpdate} className="bg-red-500 text-white px-4 py-2 rounded">
            Update
          </button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RowForm;
