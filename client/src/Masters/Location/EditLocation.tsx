import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAssetStore } from "../../store/zustendStore/useAssetStore"; // Adjust the import path as needed
import ActionButton from "../../Components/Buttons";

const EditLocation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const getLocations = useAssetStore((state) => state.getLocations);
  const updateLocation = useAssetStore((state) => state.updateLocation);

  const [locationName, setLocationName] = useState("");
  const [locationDescription, setLocationDescription] = useState("");

  useEffect(() => {
    const locations = getLocations();
    const location = locations.find((loc) => loc.id === parseInt(id));
    if (location) {
      setLocationName(location.name);
      setLocationDescription(location.description);
    } else {
      console.error(`Location with id ${id} not found`);
      navigate("/location"); // Redirect back if location not found
    }
  }, [id, getLocations, navigate]);

  const handleSave = () => {
    if (locationName.trim() && locationDescription.trim()) {
      updateLocation(parseInt(id), locationName, locationDescription);
      navigate("/location"); // Navigate back to the locations table
    } else {
      console.error("Both fields are required.");
    }
  };

  const handleBack = () => {
    navigate("/location"); // Navigate back without saving
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold pb-4">Edit Location</h1>
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
         
          <ActionButton type="back" onClick={handleBack} />
          <ActionButton type="save" onClick={handleSave} />
          
        </div>
      </div>
    </div>
  );
};

export default EditLocation;
