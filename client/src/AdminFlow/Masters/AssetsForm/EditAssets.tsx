import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAssetStore } from "../../../store/zustendStore/useAssetStore"; // Adjust the import path as needed
import ActionButton from "../../../Components/Buttons";

// Define types for AssetField and Asset
interface AssetFields {
  [key: string]: string;
}

interface Asset {
  RFID: string;
  type: number;
  fields: AssetFields;
  parentId?: string;
}

interface AssetType {
  id: number;
  name: string;
  fields: AssetFields;
}

const EditAssets: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get RFID or asset ID from URL (for editing mode)
  const { assetType, updateAsset, getAssetByRFID, getAssetsByParentId } =
    useAssetStore();
  const navigate = useNavigate();

  // Form state
  const [rfid, setRfid] = useState(id || ""); // Set RFID from URL if in edit mode
  const [selectedAssetTypeId, setSelectedAssetTypeId] = useState<number>(
    assetType[0]?.id || 0
  );
  const [fields, setFields] = useState<AssetFields>({});

  // States for dropdown options
  const [rows, setRows] = useState<Asset[]>([]);
  const [selectedRowId, setSelectedRowId] = useState("");
  const [racks, setRacks] = useState<Asset[]>([]);
  const [selectedRackId, setSelectedRackId] = useState("");
  const [cupboards, setCupboards] = useState<Asset[]>([]);
  const [selectedCupboardId, setSelectedCupboardId] = useState("");

  // Load asset data if editing (id is present)
  useEffect(() => {
    const loadAssetData = async () => {
      if (id) {
        const fetchedAsset = getAssetByRFID(id);
        if (fetchedAsset) {
          setRfid(fetchedAsset.RFID);
          setSelectedAssetTypeId(fetchedAsset.type);
          setFields(fetchedAsset.fields);

          let cupboardId = fetchedAsset.parentId;
          let rackId = "";
          let rowId = "";
          const labId = "1234567890"; // Lab's RFID

          // Set selectedCupboardId
          if (cupboardId) {
            setSelectedCupboardId(cupboardId);
            const cupboard = getAssetByRFID(cupboardId);

            // Set selectedRackId
            if (cupboard && cupboard.parentId) {
              rackId = cupboard.parentId;
              setSelectedRackId(rackId);
              const rack = getAssetByRFID(rackId);

              // Set selectedRowId
              if (rack && rack.parentId) {
                rowId = rack.parentId;
                setSelectedRowId(rowId);
              }
            }
          }

          // Fetch rows using labId
          const fetchedRows = await getAssetsByParentId(labId);
          setRows(fetchedRows);

          // Fetch racks if rowId is available
          if (rowId) {
            const fetchedRacks = await getAssetsByParentId(rowId);
            setRacks(fetchedRacks);
          }

          // Fetch cupboards if rackId is available
          if (rackId) {
            const fetchedCupboards = await getAssetsByParentId(rackId);
            setCupboards(fetchedCupboards);
          }
        }
      }
    };
    loadAssetData();
  }, [id, getAssetByRFID, getAssetsByParentId]);

  // Fetch rows on component mount (for creating a new asset)
  useEffect(() => {
    const fetchRows = async () => {
      const labId = "1234567890"; // Lab's RFID
      const fetchedRows = await getAssetsByParentId(labId);
      setRows(fetchedRows);
    };
    fetchRows();
  }, [getAssetsByParentId]);

  // Fetch racks when a row is selected
  useEffect(() => {
    const fetchRacks = async () => {
      if (selectedRowId) {
        const fetchedRacks = await getAssetsByParentId(selectedRowId);
        setRacks(fetchedRacks);
      } else {
        setRacks([]);
      }
    };
    fetchRacks();
  }, [selectedRowId, getAssetsByParentId]);

  // Fetch cupboards when a rack is selected
  useEffect(() => {
    const fetchCupboards = async () => {
      if (selectedRackId) {
        const fetchedCupboards = await getAssetsByParentId(selectedRackId);
        setCupboards(fetchedCupboards);
      } else {
        setCupboards([]);
      }
    };
    fetchCupboards();
  }, [selectedRackId, getAssetsByParentId]);

  // Utility function to format names
  const formatName = (name: string) => {
    return name
      .replace(/([A-Z])/g, " $1") // Add space before capital letters
      .trim() // Remove any leading/trailing whitespace
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
  };

  // Handle field changes
  const handleFieldChange = (field: string, value: string) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (id) {
      // If an id is present, update the existing asset
      updateAsset(rfid, fields, selectedCupboardId);
      console.log("Asset updated:", {
        rfid,
        selectedAssetTypeId,
        fields,
        selectedCupboardId,
      });
    }
    navigate("/assets"); // Navigate back after saving
  };

  const handleBack = () => {
    navigate("/assets");
  };

  const handleScan = () => {
    console.log("Scan button clicked"); // Placeholder for actual scanning logic
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold pb-2">
        {id ? "Edit Asset" : "Add Asset"}{" "}
        {/* Change title based on whether it's edit or add */}
      </h1>
      <div className="bg-white mt-6 shadow rounded p-6">
        {/* Render Dynamic Fields Based on Selected Asset Type */}
        <div className="col-span-3 border border-gray-300 rounded p-4 mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Asset Details
          </h2>
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
                  const assetTypeSelected = assetType.find(
                    (at) => at.id === typeId
                  );
                  if (assetTypeSelected) {
                    setFields(assetTypeSelected.fields); // Update fields when asset type changes
                  }
                }}
                className="block w-full max-w-[450px] border border-gray-300 rounded p-2 mt-1"
                disabled // Disable changing asset type during edit
              >
                <option value="" disabled>
                  Select Asset Type
                </option>
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
                setSelectedRackId("");
                setSelectedCupboardId("");
              }}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
            >
              <option value="" disabled>
                Select Row
              </option>
              {rows.map((row) => (
                <option key={row.RFID} value={row.RFID}>
                  {formatName(row.fields.name)}{" "}
                  {/* Assuming row has a name property */}
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
                setSelectedCupboardId("");
              }}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              disabled={!selectedRowId} // Enable only if a row is selected
            >
              <option value="" disabled>
                Select Rack
              </option>
              {racks.map((rack) => (
                <option key={rack.RFID} value={rack.RFID}>
                  {formatName(rack.fields.name)}{" "}
                  {/* Assuming rack has a name property */}
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
              value={selectedCupboardId}
              onChange={(e) => {
                console.log("Cupboard selected:", e.target.value);
                setSelectedCupboardId(e.target.value);
              }}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              disabled={!selectedRackId} // Enable only if a rack is selected
            >
              <option value="" disabled>
                Select Cupboard
              </option>
              {cupboards.map((cupboard) => (
                <option key={cupboard.RFID} value={cupboard.RFID}>
                  {formatName(cupboard.fields.name)}{" "}
                  {/* Assuming cupboard has a name property */}
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
              disabled // Disable changing RFID during edit
            />
         
            <ActionButton type="save" onClick={handleScan} />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
         
          <ActionButton type="back" onClick={handleBack} />
          <ActionButton type="save" onClick={handleSave} />
         
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default EditAssets;
