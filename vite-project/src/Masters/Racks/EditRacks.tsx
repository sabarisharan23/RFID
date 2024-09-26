import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAssetStore } from "../../store/store";

const EditRackForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // RFID from URL
  const { getAssetByRFID, updateAsset, deleteAsset } = useAssetStore();

  const [rackName, setRackName] = useState("");
  const [rackDescription, setRackDescription] = useState("");

  useEffect(() => {
    if (id) {
      const asset = getAssetByRFID(id);
      if (asset) {
        setRackName(asset.fields.name);
        setRackDescription(asset.fields.description);
      } else {
        alert(`Rack with RFID ${id} not found.`);
        navigate("/racks");
      }
    }
  }, [id, getAssetByRFID, navigate]);

  const handleUpdate = () => {
    if (!rackName.trim() || !rackDescription.trim()) {
      alert("Please fill out all required fields.");
      return;
    }

    if (id) {
      updateAsset(id, { name: rackName, description: rackDescription });
      alert("Rack updated successfully!");
      navigate("/racks"); // Navigate back to Racks list
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this rack?")) {
      if (id) {
        deleteAsset(id);
        alert("Rack deleted successfully!");
        navigate("/racks"); // Navigate back to Racks list
      }
    }
  };

  const handleBack = () => {
    navigate("/racks");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <div className="text-2xl font-semibold">Edit Rack</div>

      {/* Edit Form */}
      <div className="bg-white mt-6 shadow rounded p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Rack Name Field */}
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

          {/* Rack Description Field */}
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

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleBack}
            className="bg-[#00B894] hover:bg-[#009D80] text-white py-2 px-4 rounded"
          >
            Back
          </button>
          <button
            onClick={handleUpdate}
            className="bg-[#6C5CE7] hover:bg-[#5B4BCE] text-white py-2 px-4 rounded"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRackForm;
