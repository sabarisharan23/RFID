import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssetStore } from '../../store/zustendStore/useAssetStore'; // Adjust the import path as needed
import ActionButton from '../../Components/Buttons';
const AddLocation: React.FC = () => {
  const [locationName, setLocationName] = useState('');
  const [locationDescription, setLocationDescription] = useState('');
  const addLocation = useAssetStore((state) => state.addLocation);
  const navigate = useNavigate();

  const handleSave = () => {
    if (locationName.trim() && locationDescription.trim()) {
      addLocation(locationName, locationDescription);
      setLocationName('');
      setLocationDescription('');
      navigate('/location'); // Navigate back to the locations table
    } else {
      console.error('Both fields are required.');
    }
  };

  const handleBack = () => {
    navigate('/location'); // Navigate back without saving
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold pb-4">Add Location</h1>
      <div className="bg-white p-6 shadow rounded">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter Location Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={locationDescription}
              onChange={(e) => setLocationDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter Location Description"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
         
          <ActionButton type='back' onClick={handleBack} />
          <ActionButton type="save" onClick={handleSave} />
          
        </div>
      </div>
    </div>
  );
};

export default AddLocation;
