import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssetStore } from '../../store/store'; // Adjust the import path as needed

const AssetForm: React.FC = () => {
  const { assetType, addAsset, getAssetsByParentId } = useAssetStore();
  const navigate = useNavigate();

  // Form state
  const [rfid, setRfid] = useState('');
  const [selectedAssetTypeId, setSelectedAssetTypeId] = useState(assetType[0].id);
  const [fields, setFields] = useState(assetType[0].fields);

  // States for dropdown options
  const [rows, setRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState('');
  const [racks, setRacks] = useState([]);
  const [selectedRackId, setSelectedRackId] = useState('');
  const [selectedCupboardId, setSelectedCupboardId] = useState('');
  const [cupboards, setCupboards] = useState([]);

  // Fetch rows by parent ID
  useEffect(() => {
    const fetchRows = async () => {
      const fetchedRows = await getAssetsByParentId('1234567890'); // Fetch rows using parent ID
      setRows(fetchedRows);
    };
    fetchRows();
  }, [getAssetsByParentId]);

  // Fetch racks when a row is selected
  useEffect(() => {
    const fetchRacks = async () => {
      if (selectedRowId) {
        const fetchedRacks = await getAssetsByParentId(selectedRowId); // Fetch racks using selected row ID
        setRacks(fetchedRacks);
        setCupboards([]); // Reset cupboards when row changes
        setSelectedRackId(''); // Reset selected rack
      }
    };
    fetchRacks();
  }, [selectedRowId, getAssetsByParentId]);

  // Fetch cupboards when a rack is selected
  useEffect(() => {
    const fetchCupboards = async () => {
      if (selectedRackId) {
        const fetchedCupboards = await getAssetsByParentId(selectedRackId); // Fetch cupboards using selected rack ID
        setCupboards(fetchedCupboards);
        setSelectedCupboardId(fetchedCupboards[0].RFID);
      }
    };
    fetchCupboards();
  }, [selectedRackId, getAssetsByParentId]);

  // Utility function to format names
  const formatName = (name: string) => {
    return name
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .trim()                     // Remove any leading/trailing whitespace
      .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
  };

  // Handle field changes
  const handleFieldChange = (field: string, value: string) => {
    setFields(prevFields => ({
      ...prevFields,
      [field]: value
    }));
  };

  const handleSave = () => {
    addAsset(rfid, selectedAssetTypeId, fields, selectedCupboardId);
    console.log('Asset added:', { rfid, selectedAssetTypeId, fields, selectedCupboardId });
    navigate('/assets'); // Navigate back after saving
  };

  const handleBack = () => {
    navigate('/assets');
  };

  const handleScan = () => {
    console.log('Scan button clicked'); // Placeholder for actual scanning logic
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white mt-6 shadow rounded p-6">

        {/* Render Dynamic Fields Based on Selected Asset Type */}
        <div className="col-span-3 border border-gray-300 rounded p-4 mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Asset Details</h2>
          <div className="grid grid-cols-3 gap-4">
            {/* Asset Type Dropdown moved here */}
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Asset Type <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedAssetTypeId}
                onChange={(e) => {
                  const typeId = parseInt(e.target.value);
                  setSelectedAssetTypeId(typeId);
                  const assetTypeSelected = assetType.find(at => at.id === typeId);
                  if (assetTypeSelected) {
                    setFields(assetTypeSelected.fields); // Update fields when asset type changes
                  }
                }}
                className="block w-full max-w-[450px] border border-gray-300 rounded p-2 mt-1"
              >
                <option value="" disabled>Select Asset Type</option>
                {assetType.map((type) => (
                  <option key={type.id} value={type.id}>
                    {formatName(type.name)}
                  </option>
                ))}
              </select>
            </div>

            {Object.keys(fields).map((fieldKey) => (
              <div key={fieldKey} className="max-w-[450px]">
                <label className="block text-sm font-medium text-gray-700">
                  {formatName(fieldKey)} {/* Format the label */}
                </label>
                <input
                  type="text"
                  value={fields[fieldKey]}
                  onChange={(e) => handleFieldChange(fieldKey, e.target.value)}
                  className="block w-full border border-gray-300 rounded p-2 mt-1"
                  placeholder={`Enter ${formatName(fieldKey)}`} // Format placeholder as well
                />
              </div>
            ))}
          </div>
        </div>

        {/* Location Details Section */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* Row Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Row <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedRowId}
              onChange={(e) => {
                setSelectedRowId(e.target.value);
                
              }}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
            >
              <option value="" disabled>Select Row</option>
              {rows.map((row) => (
                <option key={row.RFID} value={row.RFID}>
                  {formatName(row.fields.name)} {/* Assuming row has a name property */}
                </option>
              ))}
            </select>
          </div>

          {/* Rack Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rack
            </label>
            <select
              value={selectedRackId}
              onChange={(e) => {
                setSelectedRackId(e.target.value);
              
              }}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              disabled={!selectedRowId} // Enable only if a row is selected
            >
              <option value="" disabled>Select Rack</option>
              {racks.map((rack) => (
                <option key={rack.RFID} value={rack.RFID}>
                  {formatName(rack.fields.name)} {/* Assuming rack has a name property */}
                </option>
              ))}
            </select>
          </div>

          {/* Cupboard Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cupboard
            </label>
            <select
              onChange={(e) => {
                console.log('Cupboard selected:', e.target.value);
                setSelectedCupboardId(e.target.value);
              }}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              disabled={!selectedRackId} // Enable only if a rack is selected
            >
              <option value={selectedCupboardId} disabled>Select Cupboard</option>
              {cupboards.map((cupboard) => (
                <option key={cupboard.RFID} value={cupboard.RFID}>
                  {formatName(cupboard.fields.name)} {/* Assuming cupboard has a name property */}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* RFID Input moved to the last position */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            RFID <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={rfid}
              onChange={(e) => setRfid(e.target.value)}
              className="block w-full max-w-[450px] border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter RFID"
            />
            <button
              onClick={handleScan}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Scan
            </button>
          </div>
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
