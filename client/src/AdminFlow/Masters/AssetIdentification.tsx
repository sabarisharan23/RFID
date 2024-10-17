import React, { useState } from "react";
import { useAssetStore } from "../../store/zustendStore/useAssetStore"; // Adjust the import path as needed
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx"; // Import XLSX for Excel export
import ActionButton from "../../Components/Buttons";

interface HierarchyData {
  location?: any;
  row?: any;
  rack?: any;
  cupboard?: any;
  asset?: any;
  assets?: any[]; // For assets collected under a Cupboard, Rack, or Row
}

const AssetIdentification: React.FC = () => {
  const {
    getAssetByRFID,
    getAssetsByParentId,
    getTypeById,
    assets,
    assetType,
  } = useAssetStore();
  const [rfid, setRfid] = useState("");
  const [searchError, setSearchError] = useState("");
  const [hierarchyData, setHierarchyData] = useState<HierarchyData | null>(
    null
  );
  const navigate = useNavigate();

  const [selectedAssets, setSelectedAssets] = useState<{
    [key: string]: boolean;
  }>({});

  // Function to get the parent hierarchy of an asset
  const getParentHierarchy = (asset) => {
    let currentAsset = asset;
    const hierarchy = {};

    while (currentAsset.parentId) {
      const parentAsset = getAssetByRFID(currentAsset.parentId);
      if (!parentAsset) break;

      if (parentAsset.type === 20) {
        hierarchy["location"] = parentAsset;
      } else if (parentAsset.type === 21) {
        hierarchy["row"] = parentAsset;
      } else if (parentAsset.type === 22) {
        hierarchy["rack"] = parentAsset;
      } else if (parentAsset.type === 23) {
        hierarchy["cupboard"] = parentAsset;
      }

      currentAsset = parentAsset;
    }

    return hierarchy;
  };

  // Recursive function to get all assets under a given parent
  const getAllAssetsUnder = async (parentAsset) => {
    const collectedAssets = [];
    const queue = [parentAsset];

    while (queue.length > 0) {
      const current = queue.shift();
      const children = await getAssetsByParentId(current.RFID);

      for (const child of children) {
        if (child.type >= 1 && child.type <= 19) {
          // It's an asset
          collectedAssets.push(child);
        } else {
          // It's a Cupboard, Rack, or Row
          queue.push(child);
        }
      }
    }

    return collectedAssets;
  };

  const handleSearch = async () => {
    if (!rfid.trim()) {
      setSearchError("Please enter an ID");
      setHierarchyData(null);
      return;
    }

    const asset = getAssetByRFID(rfid.trim());
    if (asset) {
      const hierarchy = getParentHierarchy(asset);

      if (asset.type === 23) {
        // The scanned ID is a Cupboard
        const assetsInCupboard = await getAssetsByParentId(asset.RFID);
        const assetChildren = assetsInCupboard.filter(
          (child) => child.type >= 1 && child.type <= 19
        );
        setHierarchyData({
          ...hierarchy,
          cupboard: asset,
          assets: assetChildren,
        });
      } else if (asset.type === 22) {
        // The scanned ID is a Rack
        const allAssets = await getAllAssetsUnder(asset);
        setHierarchyData({
          ...hierarchy,
          rack: asset,
          assets: allAssets,
        });
      } else if (asset.type === 21) {
        // The scanned ID is a Row
        const allAssets = await getAllAssetsUnder(asset);
        setHierarchyData({
          ...hierarchy,
          row: asset,
          assets: allAssets,
        });
      } else if (asset.type >= 1 && asset.type <= 19) {
        // The scanned ID is an Asset
        setHierarchyData({
          ...hierarchy,
          asset,
        });
      } else {
        // The scanned ID is a Location or invalid type
        setSearchError("Please scan a valid Asset, Cupboard, Rack, or Row");
        setHierarchyData(null);
      }

      setSearchError("");
      setSelectedAssets({}); // Reset selected assets when new search is made
    } else {
      setSearchError("No asset found with this ID");
      setHierarchyData(null);
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  // Utility function to format names
  const formatName = (name: string) => {
    if (/^[A-Z]+$/.test(name)) {
      return name; // Return the name as is if it contains only capital letters
    }

    return name
      .replace(/([A-Z])/g, " $1") // Add space before capital letters
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
  };

  // Handle asset selection
  const handleAssetSelect = (rfid: string, checked: boolean) => {
    setSelectedAssets((prevSelectedAssets) => ({
      ...prevSelectedAssets,
      [rfid]: checked,
    }));
  };

  // Export assets to Excel
  const exportToExcel = (exportAll: boolean) => {
    let assetsToExport = [];

    if (hierarchyData) {
      if (hierarchyData.asset) {
        // Single asset
        if (exportAll || selectedAssets[hierarchyData.asset.RFID]) {
          assetsToExport.push(hierarchyData.asset);
        }
      } else if (hierarchyData.assets && hierarchyData.assets.length > 0) {
        // Multiple assets
        if (exportAll) {
          assetsToExport = hierarchyData.assets;
        } else {
          assetsToExport = hierarchyData.assets.filter(
            (asset) => selectedAssets[asset.RFID]
          );
        }
      }
    }

    if (assetsToExport.length === 0) {
      alert("No assets available for export.");
      return;
    }

    // Prepare data for Excel
    const workbook = XLSX.utils.book_new();

    // For each asset, retrieve parent hierarchy and prepare data
    const data = assetsToExport.map((asset) => {
      const parentHierarchy = getParentHierarchy(asset);
      const assetData = {
        Location: parentHierarchy.location?.fields.name || "",
        Row: parentHierarchy.row?.fields.name || "",
        Rack: parentHierarchy.rack?.fields.name || "",
        Cupboard: parentHierarchy.cupboard?.fields.name || "",
        AssetType: formatName(getTypeById(asset.type)?.name || ""),
        RFID: asset.RFID,
        ...asset.fields,
      };
      return assetData;
    });

    // Prepare headers
    const headers = Object.keys(data[0]);

    // Convert data to worksheet
    const worksheetData = [
      headers,
      ...data.map((row) => headers.map((header) => row[header])),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Assets");

    // Export to Excel
    XLSX.writeFile(workbook, "assets_export.xlsx");
  };

  // Check if any assets are selected for export
  const isExportDisabled = !Object.values(selectedAssets).some(
    (isSelected) => isSelected
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold pb-2">Asset Reports</h1>
      <div className="bg-white mt-6 shadow rounded p-6">
        {/* ID Input */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Enter ID (RFID) <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={rfid}
              onChange={(e) => setRfid(e.target.value)}
              className="block w-full max-w-[450px] border border-gray-300 rounded p-2 mt-1"
              placeholder="Enter ID"
            />

            <ActionButton type="save" onClick={handleSearch} label="Identify" />
          </div>
          {searchError && <p className="text-red-500 mt-2">{searchError}</p>}
        </div>

        {/* Export Buttons */}
        {hierarchyData && (
          <div className="mt-4 flex space-x-2">
           
            <ActionButton
              type="excel"
              onClick={() => exportToExcel(false)}
              disabled={isExportDisabled}
              className={`${
                isExportDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />{" "}
          
            <ActionButton
              type="excel"
              onClick={() => exportToExcel(true)}
              label="Export All"
            />
          </div>
        )}

        {/* Display Hierarchical Data */}
        {hierarchyData && (
          <div className="mt-6">
            {/* Simplified Parent Hierarchy */}
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold text-lg">Asset Hierarchy</h3>
              <div className="flex flex-wrap">
                {["location", "row", "rack", "cupboard"].map((level) => {
                  const asset = hierarchyData[level];
                  if (asset) {
                    return (
                      <div key={level} className="mr-4">
                        <strong>{formatName(level)}:</strong>{" "}
                        {asset.fields.name}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            {/* Display Asset Table */}
            <div className="mt-6">
              {/* For Single Asset */}
              {hierarchyData.asset && (
                <div>
                  <h3 className="font-semibold text-lg">Asset Details</h3>
                  <div className="relative overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300 overflow-hidden">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-2 border border-gray-300 text-left">
                            <input
                              type="checkbox"
                              checked={
                                !!selectedAssets[hierarchyData.asset.RFID]
                              }
                              onChange={(e) =>
                                handleAssetSelect(
                                  hierarchyData.asset.RFID,
                                  e.target.checked
                                )
                              }
                            />
                          </th>
                          {[
                            "RFID",
                            ...Object.keys(hierarchyData.asset.fields),
                          ].map((field) => (
                            <th
                              key={field}
                              className="p-2 border border-gray-300 text-left"
                            >
                              {formatName(field)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border border-gray-300"></td>
                          <td className="p-2 border border-gray-300">
                            {hierarchyData.asset.RFID}
                          </td>
                          {Object.keys(hierarchyData.asset.fields).map(
                            (fieldKey) => (
                              <td
                                key={fieldKey}
                                className="p-2 border border-gray-300"
                              >
                                {hierarchyData.asset.fields[fieldKey]}
                              </td>
                            )
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* For Assets under Cupboard, Rack, or Row */}
              {hierarchyData.assets && hierarchyData.assets.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg">Assets</h3>
                  <div className="relative overflow-x-auto">
                    {Object.entries(
                      hierarchyData.assets.reduce((acc, asset) => {
                        const typeName =
                          getTypeById(asset.type)?.name || "Unknown";
                        if (!acc[typeName]) acc[typeName] = [];
                        acc[typeName].push(asset);
                        return acc;
                      }, {})
                    ).map(([typeName, assetsOfType]: [string, any[]]) => (
                      <div key={typeName} className="mt-4">
                        <h4 className="font-semibold">
                          {formatName(typeName)}
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="w-full table-auto border-collapse border border-gray-300 overflow-hidden">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="p-2 border border-gray-300 text-left">
                                  <input
                                    type="checkbox"
                                    onChange={(e) => {
                                      const isChecked = e.target.checked;
                                      const updatedSelectedAssets = {
                                        ...selectedAssets,
                                      };
                                      assetsOfType.forEach((asset) => {
                                        updatedSelectedAssets[asset.RFID] =
                                          isChecked;
                                      });
                                      setSelectedAssets(updatedSelectedAssets);
                                    }}
                                    checked={assetsOfType.every(
                                      (asset) => selectedAssets[asset.RFID]
                                    )}
                                  />
                                </th>
                                {[
                                  "RFID",
                                  ...Object.keys(assetsOfType[0].fields),
                                ].map((field) => (
                                  <th
                                    key={field}
                                    className="p-2 border border-gray-300 text-left"
                                  >
                                    {formatName(field)}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {assetsOfType.map((asset) => (
                                <tr key={asset.RFID}>
                                  <td className="p-2 border border-gray-300">
                                    <input
                                      type="checkbox"
                                      checked={!!selectedAssets[asset.RFID]}
                                      onChange={(e) =>
                                        handleAssetSelect(
                                          asset.RFID,
                                          e.target.checked
                                        )
                                      }
                                    />
                                  </td>
                                  <td className="p-2 border border-gray-300">
                                    {asset.RFID}
                                  </td>
                                  {Object.keys(asset.fields).map((fieldKey) => (
                                    <td
                                      key={fieldKey}
                                      className="p-2 border border-gray-300"
                                    >
                                      {asset.fields[fieldKey]}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Back Button */}
        <div className="flex justify-end space-x-4 mt-6">
        
          <ActionButton type="back" onClick={handleBack} />
        </div>
      </div>
    </div>
  );
};

export default AssetIdentification;
