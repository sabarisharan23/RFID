import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const RowForm: React.FC = () => {
  const navigate = useNavigate();
  const [rowName, setRowName] = useState('');
  const [rowDescription, setRowDescription] = useState('');

  const handleUpdate = () => {
    // Add save logic here
    console.log('Saved', { rowName, rowDescription });
  };
  
  const handleBack = () => {
    navigate('/racks');
  };
  const handleDelete = () => {
    console.log('Saved', { rowName, rowDescription });
   };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="text-2xl font-semibold ">Edit Racks</div>
      {/* Form */}
      <div className="bg-white mt-6 shadow rounded p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Row Name Input */}
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

          {/* Row Description Input */}
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
    </div>
  );
};

export default RowForm;
