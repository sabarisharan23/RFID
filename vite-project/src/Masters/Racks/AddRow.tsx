import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssetStore } from '../../store/store';

const AddRow: React.FC = () => {
  const navigate = useNavigate();
  const [rowName, setRowName] = useState('');
  const [rowDescription, setRowDescription] = useState('');
  const {addAsset} = useAssetStore()

  function generateRandom10DigitNumber() {
    // Generate a random number between 1000000000 and 9999999999
    const min = 1000000000; // 10 digits minimum
    const max = 9999999999; // 10 digits maximum
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  const handleBack = () => {
    navigate('/add-racks');
  };

  const handleSave = () => {
    const id = generateRandom10DigitNumber();
    addAsset(`${id}`, 21,{name: rowName, description: rowDescription},"1234567890");
    handleBack();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold mb-6">Racks</h2>
      <div className="bg-white shadow-md p-6 rounded-md ">
        
        {/* Form Section */}
        <form className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="rowName" className="text-gray-700 font-medium mb-2">
              Row Name<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="rowName"
              placeholder="Enter Row Name"
              value={rowName}
              onChange={(e) => setRowName(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="rowDescription" className="text-gray-700 font-medium mb-2">
              Row Description<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="rowDescription"
              placeholder="Enter Row Description"
              value={rowDescription}
              onChange={(e) => setRowDescription(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </form>

        {/* Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:outline-none" onClick={handleBack}>
            Back
          </button>
          <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:outline-none" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRow;
