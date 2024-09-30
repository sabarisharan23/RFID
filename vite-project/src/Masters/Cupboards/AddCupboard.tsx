import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAssetStore } from "../../store/zustendStore/useAssetStore"; // Adjust the import path as needed

const AddCupboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRack, setSelectedRack] = useState("");
  const [cupboardName, setCupboardName] = useState("");
  const [cupboardDescription, setCupboardDescription] = useState("");
  const { getAssetsByType, addAsset } = useAssetStore();
  const [rackOptions, setRackOptions] = useState<any[]>([]); // Adjust the type as needed

  useEffect(() => {
    const fetchRackOptions = async () => {
      try {
        const options = await getAssetsByType(22); // Replace with the actual parentId
        setRackOptions(options);
      } catch (error) {
        console.error("Error fetching rack options:", error);
      }
    };

    fetchRackOptions();
  }, [getAssetsByType]); // Dependency array includes getAssetsByParentId

  function generateRandom10DigitNumber() {
    // Generate a random number between 1000000000 and 9999999999
    const min = 1000000000; // 10 digits minimum
    const max = 9999999999; // 10 digits maximum
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleSave = () => {
    const id = generateRandom10DigitNumber();
    // Add save logic here
    addAsset(
      `${id}`,
      23,
      { name: cupboardName, description: cupboardDescription },
      selectedRack
    );
    console.log("Saved", { selectedRack, cupboardName, cupboardDescription });
    // Optionally, navigate to another page after saving
    navigate("/cupboards");
  };

  const handleBack = () => {
    navigate("/cupboards");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="text-2xl font-semibold">Add Cupboards</div>

      {/* Form */}
      <div className="bg-white mt-6 shadow rounded p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Rack Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rack <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-2 mt-1">
              <select
                value={selectedRack}
                onChange={(e) => setSelectedRack(e.target.value)}
                className="block w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select a Rack</option>
                {rackOptions.map((option) => (
                  <option key={option.RFID} value={option.RFID}>
                    {option.fields.name} - {option.fields.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cupboard Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cupboard Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={cupboardName}
              onChange={(e) => setCupboardName(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter Cupboard Name"
            />
          </div>

          {/* Cupboard Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cupboard Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={cupboardDescription}
              onChange={(e) => setCupboardDescription(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter Cupboard Description"
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
            onClick={handleSave}
            className="bg-[#6C5CE7] hover:bg-[#5B4BCE] text-white py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default AddCupboard;
