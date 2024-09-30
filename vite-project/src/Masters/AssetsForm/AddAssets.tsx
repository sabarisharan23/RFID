import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAssetStore } from "../../store/store"; // Adjust the import path as needed
import * as XLSX from "xlsx";

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

const AssetForm: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get RFID or asset ID from URL (for editing mode)
  const {
    assetType,
    assets,
    addAsset,
    updateAsset,
    getAssetByRFID,
    getAssetsByParentId,
    getTypeById,
  } = useAssetStore();
  const navigate = useNavigate();

  // Form state
  const [rfid, setRfid] = useState(id || ""); // Set RFID from URL if in edit mode
  const [selectedAssetTypeId, setSelectedAssetTypeId] = useState<number>(0);
  const [fields, setFields] = useState<AssetFields>({});

  // States for dropdown options
  const [rows, setRows] = useState<Asset[]>([]);
  const [selectedRowId, setSelectedRowId] = useState("");
  const [racks, setRacks] = useState<Asset[]>([]);
  const [selectedRackId, setSelectedRackId] = useState("");
  const [selectedCupboardId, setSelectedCupboardId] = useState("");
  const [cupboards, setCupboards] = useState<Asset[]>([]);

  // Bulk upload state
  const [isBulkUpload, setIsBulkUpload] = useState(false);

  // List of types to exclude
  const typesToExclude = ["location", "row", "rack", "cupboard"];

  // Memoize filtered asset types for dropdown
  const filteredAssetTypes = useMemo(
    () =>
      assetType.filter(
        (type) => !typesToExclude.includes(type.name.toLowerCase())
      ),
    [assetType]
  );

  // Load asset data if editing (id is present)
  useEffect(() => {
    if (id) {
      const fetchedAsset = getAssetByRFID(id);
      if (fetchedAsset) {
        setRfid(fetchedAsset.RFID);
        setSelectedAssetTypeId(fetchedAsset.type);
        setFields(fetchedAsset.fields);
        if (fetchedAsset.parentId) {
          setSelectedCupboardId(fetchedAsset.parentId);
          const cupboardAsset = getAssetByRFID(fetchedAsset.parentId);
          if (cupboardAsset && cupboardAsset.parentId) {
            setSelectedRackId(cupboardAsset.parentId);
            const rackAsset = getAssetByRFID(cupboardAsset.parentId);
            if (rackAsset && rackAsset.parentId) {
              setSelectedRowId(rackAsset.parentId);
            }
          }
        }
      }
    } else if (filteredAssetTypes.length > 0) {
      // Set default asset type if adding a new asset
      setSelectedAssetTypeId(filteredAssetTypes[0].id);
      setFields(filteredAssetTypes[0].fields || {});
    }
  }, [id, getAssetByRFID, filteredAssetTypes]);

  // Fetch rows by parent ID
  useEffect(() => {
    const fetchRows = async () => {
      const fetchedRows = await getAssetsByParentId("1234567890"); // Fetch rows using parent ID
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
        // If editing, keep the selectedRackId
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
        // If editing, keep the selectedCupboardId
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
      updateAsset(rfid, fields);
      console.log("Asset updated:", {
        rfid,
        selectedAssetTypeId,
        fields,
        selectedCupboardId,
      });
    } else {
      // Otherwise, add a new asset
      addAsset(rfid, selectedAssetTypeId, fields, selectedCupboardId);
      console.log("Asset added:", {
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

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
          processBulkData(jsonData);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const processBulkData = (data: any[]) => {
    data.forEach((row) => {
      const rfid = row["RFID"];
      if (!rfid) {
        console.error("RFID is missing in one of the rows.");
        return;
      }
      // Check for duplicate RFIDs
      if (getAssetByRFID(rfid)) {
        console.error(`Asset with RFID ${rfid} already exists.`);
        return;
      }
      const assetFields = { ...row };
      delete assetFields["RFID"]; // Remove RFID from fields

      // Extract location info
      const rowName = row["Row"];
      const rackName = row["Rack"];
      const cupboardName = row["Cupboard"];

      // Remove location fields from assetFields
      delete assetFields["Row"];
      delete assetFields["Rack"];
      delete assetFields["Cupboard"];

      // Find the Cupboard asset based on the location hierarchy
      let parentId = "";

      if (rowName && rackName && cupboardName) {
        // Find the Row asset
        const rowAsset = assets.find(
          (asset) =>
            asset.type === 21 && // type id for 'row'
            asset.fields.name.toLowerCase() === rowName.toLowerCase()
        );
        if (rowAsset) {
          // Find the Rack asset under the Row
          const racksUnderRow = assets.filter(
            (asset) => asset.parentId === rowAsset.RFID && asset.type === 22
          );
          const rackAsset = racksUnderRow.find(
            (asset) => asset.fields.name.toLowerCase() === rackName.toLowerCase()
          );
          if (rackAsset) {
            // Find the Cupboard asset under the Rack
            const cupboardsUnderRack = assets.filter(
              (asset) => asset.parentId === rackAsset.RFID && asset.type === 23
            );
            const cupboardAsset = cupboardsUnderRack.find(
              (asset) =>
                asset.fields.name.toLowerCase() === cupboardName.toLowerCase()
            );
            if (cupboardAsset) {
              parentId = cupboardAsset.RFID;
            } else {
              console.error(
                `Cupboard ${cupboardName} not found under Rack ${rackName}.`
              );
              return;
            }
          } else {
            console.error(`Rack ${rackName} not found under Row ${rowName}.`);
            return;
          }
        } else {
          console.error(`Row ${rowName} not found.`);
          return;
        }
      } else {
        console.error(
          "Row, Rack, or Cupboard is missing in one of the rows."
        );
        return;
      }

      // Remove any fields not present in the selected asset type's fields
      const validFields: AssetFields = {};
      const assetTypeFields = getTypeById(selectedAssetTypeId)?.fields || {};
      Object.keys(assetTypeFields).forEach((fieldKey) => {
        validFields[fieldKey] = assetFields[fieldKey] || "";
      });
      addAsset(rfid, selectedAssetTypeId, validFields, parentId);
    });
    navigate("/assets"); // Navigate back after processing
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold pb-2">
        {id ? "Edit Asset" : "Add Asset"}{" "}
        {/* Change title based on whether it's edit or add */}
      </h1>

      {/* Bulk Upload Checkbox */}
      <div className="mt-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isBulkUpload}
            onChange={(e) => setIsBulkUpload(e.target.checked)}
          />
          <span className="text-lg font-medium text-gray-700">Bulk Upload</span>
        </label>
      </div>

      <div className="bg-white mt-6 shadow rounded p-6">
        {/* Asset Details Section */}
        <div className="col-span-3 border border-gray-300 rounded p-4 mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Asset Details
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {/* Asset Type Dropdown */}
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Asset Type <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedAssetTypeId}
                onChange={(e) => {
                  const typeId = parseInt(e.target.value, 10);
                  setSelectedAssetTypeId(typeId);
                  const assetTypeSelected = filteredAssetTypes.find(
                    (at) => at.id === typeId
                  );
                  if (assetTypeSelected) {
                    setFields(assetTypeSelected.fields || {}); // Update fields when asset type changes
                  }
                }}
                className="block w-full max-w-[450px] border border-gray-300 rounded p-2 mt-1"
              >
                <option value="" disabled>
                  Select Asset Type
                </option>
                {filteredAssetTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {formatName(type.name)}
                  </option>
                ))}
              </select>
            </div>

            {/* Bulk Upload Mode */}
            {isBulkUpload ? (
              <div className="col-span-3 mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Excel File <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileUpload}
                  className="block w-full max-w-[450px] border border-gray-300 rounded p-2 mt-1"
                />
              </div>
            ) : (
              // Manual Entry Mode
              <>
                {Object.keys(fields).map((fieldKey) => (
                  <div key={fieldKey} className="max-w-[450px]">
                    <label className="block text-sm font-medium text-gray-700">
                      {formatName(fieldKey)} {/* Format the label */}
                    </label>
                    <input
                      type="text"
                      value={fields[fieldKey] || ""}
                      onChange={(e) =>
                        handleFieldChange(fieldKey, e.target.value)
                      }
                      className="block w-full border border-gray-300 rounded p-2 mt-1"
                      placeholder={`Enter ${formatName(fieldKey)}`} // Format placeholder as well
                    />
                  </div>
                ))}
              </>
            )}
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
              onChange={(e) => setSelectedRowId(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              disabled={isBulkUpload} // Disable in bulk upload mode
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
              onChange={(e) => setSelectedRackId(e.target.value)}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
              disabled={!selectedRowId || isBulkUpload} // Enable only if a row is selected and not in bulk upload mode
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
              disabled={!selectedRackId || isBulkUpload} // Enable only if a rack is selected and not in bulk upload mode
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

        {/* RFID Input */}
        {!isBulkUpload && (
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
                className="bg-[#6C5CE7] hover:bg-[#5B4BCE] text-white py-2 px-4 rounded"
              >
                Scan
              </button>
            </div>
          </div>
        )}

        {/* Buttons */}
        {!isBulkUpload && (
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={handleBack}
              className="bg-[#00B894] hover:bg-[#009D80] text-white py-2 px-4 rounded"
            >
              Back
            </button>
            <button
              onClick={handleSave}
              className="bg-[#635bff] text-white px-4 py-2 rounded"
            >
              {id ? "Update" : "Save"}{" "}
              {/* Change button text based on whether it's edit or add */}
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
    </div>
  );
};

export default AssetForm;
