import React, { useState } from 'react';

const AssetForm: React.FC = () => {
  const [assetType, setAssetType] = useState('Asset');
  const [assetName, setAssetName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [pn3x5, setPn3x5] = useState('');
  const [mfgPn, setMfgPn] = useState('');
  const [vendor, setVendor] = useState('');
  const [row, setRow] = useState('');
  const [rack, setRack] = useState('');
  const [project, setProject] = useState('');
  const [cupboard, setCupboard] = useState('NA');
  const [tagId, setTagId] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSave = () => {
    // Add save logic here
    console.log('Saved', {
      assetType,
      assetName,
      capacity,
      pn3x5,
      mfgPn,
      vendor,
      row,
      rack,
      project,
      cupboard,
      tagId,
      notes,
      image,
      file,
    });
  };

  const handleBack = () => {
    // Add back logic here
    console.log('Back');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="text-3xl font-semibold mt-6">Cupboards</div>

      {/* Form */}
      <div className="bg-white mt-6 shadow rounded p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Asset Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Asset Type <span className="text-red-500">*</span>
            </label>
            <select
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
            >
              <option value="Asset">Asset</option>
              <option value="Equipment">Equipment</option>
            </select>
          </div>

          {/* 3x5 PN */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              3x5 PN
            </label>
            <input
              type="text"
              value={pn3x5}
              onChange={(e) => setPn3x5(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter 3x5 PN"
            />
          </div>

          {/* MFG PN */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              MFG PN <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={mfgPn}
              onChange={(e) => setMfgPn(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter MFG PN"
            />
          </div>

          {/* Asset Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Asset Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter Asset Name"
            />
          </div>

          {/* Vendor */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Vendor
            </label>
            <input
              type="text"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter Vendor"
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Capacity <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter Capacity"
            />
          </div>

          {/* Row Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Row</label>
            <select
              value={row}
              onChange={(e) => setRow(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
            >
              <option value="">Select</option>
              <option value="Row 1">Row 1</option>
              <option value="Row 2">Row 2</option>
            </select>
          </div>

          {/* Rack Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Rack</label>
            <select
              value={rack}
              onChange={(e) => setRack(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
            >
              <option value="">Select</option>
              <option value="Rack 1">Rack 1</option>
              <option value="Rack 2">Rack 2</option>
            </select>
          </div>

          {/* Project Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project
            </label>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
            >
              <option value="">Select</option>
              <option value="Project A">Project A</option>
              <option value="Project B">Project B</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter Notes"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
            />
            <button className="bg-red-500 text-white px-4 py-2 mt-2 rounded">
              Upload
            </button>
          </div>

          {/* Cupboard Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cupboard
            </label>
            <select
              value={cupboard}
              onChange={(e) => setCupboard(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
            >
              <option value="NA">NA</option>
              <option value="Cupboard 1">Cupboard 1</option>
              <option value="Cupboard 2">Cupboard 2</option>
            </select>
          </div>

          {/* Tag ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tag ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={tagId}
              onChange={(e) => setTagId(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter Tag ID"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">File</label>
            <input
              type="file"
              onChange={handleFileUpload}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
            />
            <button className="bg-red-500 text-white px-4 py-2 mt-2 rounded">
              Upload
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-start space-x-4 mt-6">
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
