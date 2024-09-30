import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { assetTypes, initialAssets } from './AssetsConfig';
import { AssetStore, Location, AssetMovement, AuditLog, Count, Asset, AssetType } from './storeTypes';

// Helper Function to Initialize Counts Based on Assets
const initializeCounts = (assetTypes: AssetType[], assets: Asset[]): Count[] => {
  return assetTypes.map((type) => {
    const assetsOfType = assets.filter((asset) => asset.type === type.id);
    const totalQuantity = assetsOfType.length;
    const inUse = assetsOfType.filter((asset) => !asset.isAvailable).length;
    const available = assetsOfType.filter((asset) => asset.isAvailable).length;
    return {
      id: type.id,
      totalQuantity,
      inUse,
      available,
    };
  });
};

// Zustand store implementation with persistence
export const useAssetStore = create(
  persist<AssetStore>(
    (set, get) => ({
      // Assets and Counts
      assetType: assetTypes,
      counts: initializeCounts(assetTypes, initialAssets),
      assets: initialAssets,
      rfids: initialAssets.map(asset => asset.RFID),
      assetMovements: [],
      auditLogs: [],

      // Location management methods
      locations: [
        { id: 1, name: 'Location 1', description: 'Main office' },
        { id: 2, name: 'Location 2', description: 'Warehouse' },
      ],

      addLocation: (name, description) => {
        const newLocation: Location = { id: Date.now(), name, description };
        set((state) => ({
          locations: [...state.locations, newLocation],
        }));
        return newLocation;
      },

      updateLocation: (id, name, description) => {
        set((state) => ({
          locations: state.locations.map(location =>
            location.id === id ? { ...location, name, description } : location
          ),
        }));
      },

      deleteLocation: (id) => {
        set((state) => ({
          locations: state.locations.filter(location => location.id !== id),
        }));
      },

      getLocations: () => get().locations,

      // CRUD operations for assets
      addAsset: (rfid, typeId, fields, parentId, children) => {
        if (get().assets.find((asset) => asset.RFID === rfid)) {
          console.error(`Asset with RFID ${rfid} already exists.`);
          return;
        }

        const assetType = get().assetType.find((at) => at.id === typeId);
        if (!assetType) {
          console.error(`Asset type with ID ${typeId} does not exist.`);
          return;
        }

        if (parentId && !get().assets.find((asset) => asset.RFID === parentId)) {
          console.error(`Parent asset with RFID ${parentId} does not exist.`);
          return;
        }

        const newAsset: Asset = {
          RFID: rfid,
          type: typeId,
          fields,
          isAvailable: true,
          parentId,
          children: children || []
        };

        set((state) => {
          let updatedAssets = [...state.assets, newAsset];
          if (parentId) {
            updatedAssets = updatedAssets.map((asset) =>
              asset.RFID === parentId ? { ...asset, children: [...(asset.children || []), rfid] } : asset
            );
          }

          const updatedRfids = [...state.rfids, rfid];
          const countIndex = state.counts.findIndex((c) => c.id === typeId);
          let updatedCounts = [...state.counts];
          if (countIndex !== -1) {
            updatedCounts[countIndex].totalQuantity += 1;
            updatedCounts[countIndex].available += 1;
          }

          return { assets: updatedAssets, rfids: updatedRfids, counts: updatedCounts };
        });
      },

      updateAsset: (rfid, updatedFields, updatedProperties) => {
        set((state) => ({
          assets: state.assets.map((asset) =>
            asset.RFID === rfid ? { ...asset, ...(updatedProperties || {}), fields: { ...asset.fields, ...updatedFields } } : asset
          ),
        }));
      },

      deleteAsset: (rfid) => {
        const assetToDelete = get().assets.find((asset) => asset.RFID === rfid);
        if (!assetToDelete) {
          console.error(`Asset with RFID ${rfid} does not exist.`);
          return;
        }

        if (assetToDelete.children && assetToDelete.children.length > 0) {
          assetToDelete.children.forEach((childRFID) => {
            get().deleteAsset(childRFID);
          });
        }

        set((state) => {
          const updatedAssets = state.assets.filter((asset) => asset.RFID !== rfid);
          const updatedRfids = state.rfids.filter((r) => r !== rfid);

          let finalAssets = updatedAssets;
          if (assetToDelete.parentId) {
            finalAssets = updatedAssets.map((asset) =>
              asset.RFID === assetToDelete.parentId
                ? { ...asset, children: asset.children?.filter((c) => c !== rfid) || [] }
                : asset
            );
          }

          const countIndex = state.counts.findIndex((c) => c.id === assetToDelete.type);
          let updatedCounts = [...state.counts];
          if (countIndex !== -1) {
            updatedCounts[countIndex].totalQuantity = Math.max(updatedCounts[countIndex].totalQuantity - 1, 0);
            updatedCounts[countIndex].available = Math.max(updatedCounts[countIndex].available - (assetToDelete.isAvailable ? 1 : 0), 0);
            updatedCounts[countIndex].inUse = Math.max(updatedCounts[countIndex].inUse - (!assetToDelete.isAvailable ? 1 : 0), 0);
          }

          return { assets: finalAssets, rfids: updatedRfids, counts: updatedCounts };
        });
      },

      toggleAssetAvailability: (rfid) => {
        set((state) => ({
          assets: state.assets.map((asset) =>
            asset.RFID === rfid ? { ...asset, isAvailable: !asset.isAvailable } : asset
          ),
          counts: state.counts.map((count) => {
            const asset = state.assets.find((a) => a.RFID === rfid);
            if (asset && asset.type === count.id) {
              return asset.isAvailable
                ? { ...count, available: count.available + 1, inUse: Math.max(count.inUse - 1, 0) }
                : { ...count, available: Math.max(count.available - 1, 0), inUse: count.inUse + 1 };
            }
            return count;
          }),
        }));
      },

      // Asset Movements
      addAssetMovement: (movement) => {
        set((state) => ({
          assetMovements: [...state.assetMovements, movement],
        }));
      },

      getAssetMovementsByRFID: (rfid) => {
        return get().assetMovements.filter((movement) => movement.assetRFID === rfid);
      },

      // Audit Logs
      addAuditLog: (audit) => {
        set((state) => ({
          auditLogs: [...state.auditLogs, audit],
        }));
      },

      getAuditLogsByDate: (date) => {
        const targetDate = date.toDateString();
        return get().auditLogs.filter((audit) => audit.auditDate.toDateString() === targetDate);
      },

      // Other Operations
      updateCount: (id, totalQuantity, inUse, available) => {
        set((state) => ({
          counts: state.counts.map((count) =>
            count.id === id ? { ...count, totalQuantity, inUse, available } : count
          ),
        }));
      },

      getAssetByRFID: (rfid) => {
        return get().assets.find((asset) => asset.RFID === rfid);
      },

      getAssetsByType: (typeId) => {
        return get().assets.filter((asset) => asset.type === typeId);
      },

      getTypeById: (typeId) => {
        return get().assetType.find((type) => type.id === typeId);
      },

      getAssetsByParentId: (parentId) => {
        return get().assets.filter((asset) => asset.parentId === parentId);
      },
    }),
    {
      name: 'asset-storage', // Key to store the state in localStorage
      getStorage: () => localStorage, // Use localStorage to persist state
    }
  )
);
