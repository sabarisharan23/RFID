import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAssetStore } from "../../store/zustendStore/useAssetStore"; // Adjust the import path as needed
import ActionButton from "../../Components/Buttons";

const EditCupboardForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // RFID from URL
  const { getAssetByRFID, updateAsset, deleteAsset } = useAssetStore();

  const [cupboardName, setCupboardName] = useState("");
  const [cupboardDescription, setCupboardDescription] = useState("");
  const [parentRackRFID, setParentRackRFID] = useState("");

  // Fetch cupboard details on component mount
  useEffect(() => {
    if (id) {
      const cupboard = getAssetByRFID(id);
      if (cupboard) {
        setCupboardName(cupboard.fields.name);
        setCupboardDescription(cupboard.fields.description);
        setParentRackRFID(cupboard.parentId || "");
      } else {
        alert(`Cupboard with RFID ${id} not found.`);
        navigate("/cupboards");
      }
    }
  }, [id, getAssetByRFID, navigate]);

  const handleUpdate = () => {
    // Basic validation
    if (
      !cupboardName.trim() ||
      !cupboardDescription.trim() ||
      !parentRackRFID.trim()
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    if (id) {
      // Update cupboard details
      updateAsset(id, {
        name: cupboardName,
        description: cupboardDescription,
        parentId: parentRackRFID,
      });
      alert("Cupboard updated successfully!");
      navigate("/cupboards");
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this cupboard?")) {
      if (id) {
        deleteAsset(id);
        alert("Cupboard deleted successfully!");
        navigate("/cupboards");
      }
    }
  };

  const handleBack = () => {
    navigate("/cupboards");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <div className="text-2xl font-semibold">Edit Cupboard</div>

      {/* Edit Form */}
      <div className="bg-white mt-6 shadow rounded p-6">
        <div className="grid grid-cols-3 gap-6">
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

          {/* Parent Rack Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rack <span className="text-red-500">*</span>
            </label>
            <select
              value={parentRackRFID}
              onChange={(e) => setParentRackRFID(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
            >
              <option value="" disabled>
                Select Rack
              </option>
              {/* Fetch and list all racks for selection */}
              {useAssetStore
                .getState()
                .getAssetsByType(22)
                .map((rack) => (
                  <option key={rack.RFID} value={rack.RFID}>
                    {rack.fields.name}
                  </option>
                ))}
            </select>
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

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
         
          <ActionButton type="back" onClick={handleBack} />
          <ActionButton type="save" onClick={handleUpdate} />
          <ActionButton type="delete" onClick={handleDelete} />
          
        </div>
      </div>
    </div>
  );
};

export default EditCupboardForm;
