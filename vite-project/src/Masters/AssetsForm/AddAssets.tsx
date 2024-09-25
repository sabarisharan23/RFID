import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssetStore } from '../../store/store'; // Adjust the import path as needed

const AssetForm: React.FC = () => {
  const {
    assetType,
    addAsset,
    rfids,
  } = useAssetStore();
  
  const navigate = useNavigate();
  
  // Form state
  const [rfid, setRfid] = useState('');
  const [selectedAssetTypeId, setSelectedAssetTypeId] = useState(assetType[0].id);
  const [fields, setFields] = useState(assetType[0].fields);

  // Handle field changes
  const handleFieldChange = (field: string, value: string) => {
    setFields(prevFields => ({
      ...prevFields,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Add asset with the form data
    addAsset(rfid, selectedAssetTypeId, fields);
    console.log('Asset added:', { rfid, selectedAssetTypeId, fields });
    navigate('/assets'); // Navigate back after saving
  };

  const handleBack = () => {
    navigate('/assets');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white mt-6 shadow rounded p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* RFID Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              RFID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={rfid}
              onChange={(e) => setRfid(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter RFID"
            />
          </div>

          {/* Asset Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Asset Type <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedAssetTypeId}
              onChange={(e) => {
                const typeId = parseInt(e.target.value);
                setSelectedAssetTypeId(typeId);
                // Reset fields when asset type changes
                const assetTypeSelected = assetType.find(at => at.id === typeId);
                if (assetTypeSelected) {
                  setFields(assetTypeSelected.fields);
                }
              }}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
            >
              {assetType.map((type:any) => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>

          {/* Render Dynamic Fields Based on Selected Asset Type */}
          {Object.keys(fields).map((fieldKey) => (
            <div key={fieldKey}>
              <label className="block text-sm font-medium text-gray-700">
                {fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1)} {/* Capitalize field name */}
              </label>
              <input
                type="text"
                value={fields[fieldKey]}
                onChange={(e) => handleFieldChange(fieldKey, e.target.value)}
                className="block w-full border border-gray-300 rounded p-2 mt-1"
                placeholder={`Enter ${fieldKey}`}
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
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

export default AssetForm;
