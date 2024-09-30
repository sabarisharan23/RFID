import { create } from 'zustand';

// Type Definitions

// Type for location
interface Location {
  id: number;
  name: string;
  description: string;
}

// Type for an asset type definition
// Type for asset type definition
interface AssetType<T = any> {
  id: number;
  name: string;
  fields: T;
}


// Type for asset count
interface Count {
  id: number;
  totalQuantity: number;
  inUse: number;
  available: number;
}

// Type for asset movement
interface AssetMovement {
  id: number;
  assetRFID: string;
  date: Date;
  movementType: 'in' | 'out';
}

// Type for audit log
interface AuditLog {
  id: number;
  auditDate: Date;
  details: string;
}

// Type for an individual asset
interface Asset<T = any> {
  RFID: string;
  type: number; // Refers to asset type ID
  fields: T;
  isAvailable: boolean;
  parentId?: string;
  children?: string[];
}

// Zustand store interface
interface AssetStore {
  // Assets and related properties
  assetType: AssetType[]; // Array of different asset types
  counts: Count[]; // Array of counts corresponding to asset types
  assets: Asset[]; // List of assets with RFID
  rfids: string[]; // List of RFID strings
  assetMovements: AssetMovement[]; // List of asset movements
  auditLogs: AuditLog[]; // List of audit logs

  // Location management
  locations: Location[]; // List of locations
  addLocation: (name: string, description: string) => Location; // Return the new location after adding
  updateLocation: (id: number, name: string, description: string) => void;
  deleteLocation: (id: number) => void;
  getLocations: () => Location[];

  // CRUD operations for assets
  addAsset: <T>(
    rfid: string,
    typeId: number,
    fields: T,
    parentId?: string,
    children?: string[]
  ) => void;
  updateAsset: (
    rfid: string,
    updatedFields: Partial<Asset['fields']>,
    updatedProperties?: Partial<Omit<Asset, 'RFID' | 'type' | 'fields'>>
  ) => void;
  deleteAsset: (rfid: string) => void;
  toggleAssetAvailability: (rfid: string) => void;

  // Asset Movements
  addAssetMovement: (movement: AssetMovement) => void;
  getAssetMovementsByRFID: (rfid: string) => AssetMovement[];

  // Audit Logs
  addAuditLog: (audit: AuditLog) => void;
  getAuditLogsByDate: (date: Date) => AuditLog[];

  // Other operations
  updateCount: (id: number, totalQuantity: number, inUse: number, available: number) => void;
  getAssetByRFID: (rfid: string) => Asset | undefined;
  getAssetsByType: (typeId: number) => Asset[];
  getTypeById: (typeId: number) => AssetType | undefined;
  getAssetsByParentId: (parentId: string) => Asset[];
}

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


// Zustand store implementation
export const useAssetStore = create<AssetStore>((set, get) => {
  // Define Initial Locations
  const initialLocations: Location[] = [
    { id: 1, name: 'Location 1', description: 'Main office' },
    { id: 2, name: 'Location 2', description: 'Warehouse' },
  ];


  const assetTypes: AssetType[] = [
    {
      id: 1,
      name: "filer",
      fields: {
        system: "",
        health: "",
        ds: "",
        ioConfig: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    },
    {
      id: 2,
      name: "clientsSummarySection",
      fields: {
        clients: "",
        vendor: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    },
    {
      id: 3,
      name: "clientsDetailsSection",
      fields: {
        clientName: "",
        os: "",
        capacity: "",
        available: "",
        reservedOwner: "",
        purpose: "",
        warrantyDetails: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    },
    {
      id: 4,
      name: "switchSummarySection",
      fields: {
        switches: "",
        vendor: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    },
    {
      id: 5,
      name: "switchesDetailsSection",
      fields: {
        switchesName: "",
        capacity: "",
        available: "",
        purpose: "",
        warrantyDetails: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    },
    {
      id: 6,
      name: "hbaIoCard",
      fields: {
        hbaCardDetails: "",
        platform: "",
        partNumber3x5: "",
        mfgPn: "",
        vendor: "",
        busyQuantity: "", // Already has a busyQuantity field
        description: ""
      }
    },
    {
      id: 7,
      name: "cables",
      fields: {
        cablesTypeClass: "",
        platform: "",
        partNumber3x5: "",
        mfgPn: "",
        vendor: "",
        length: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    },
    {
      id: 8,
      name: "dimm",
      fields: {
        partNumber3x5: "",
        mfgPn: "",
        vendor: "",
        capacity: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    },
    {
      id: 9,
      name: "nvdimm",
      fields: {
        partNumber3x5: "",
        mfgPn: "",
        vendor: "",
        capacity: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    },
    {
      id: 10,
      name: "battery",
      fields: {
        partNumber3x5: "",
        mfgPn: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    },
    {
      id: 11,
      name: "fans",
      fields: {
        partNumber3x5: "",
        mfgPn: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    },
    {
      id: 12,
      name: "usbPendrives",
      fields: {
        capacity: "",
        vendor: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    },
    {
      id: 13,
      name: "ssdDrives",
      fields: {
        partNumber3x5: "",
        mfgPn: "",
        vendor: "",
        capacity: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    },
    {
      id: 14,
      name: "hddDrives",
      fields: {
        partNumber3x5: "",
        mfgPn: "",
        vendor: "",
        capacity: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    },
    {
      id: 15,
      name: "flashCache",
      fields: {
        partNumber3x5: "",
        mfgPn: "",
        vendor: "",
        capacity: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    },
    {
      id: 16,
      name: "bootMedia",
      fields: {
        partNumber3x5: "",
        mfgPn: "",
        vendor: "",
        capacity: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    },
    {
      id: 17,
      name: "psu",
      fields: {
        partNumber3x5: "",
        mfgPn: "",
        vendor: "",
        capacity: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    },
    {
      id: 18,
      name: "sfps",
      fields: {
        sfpType: "",
        partNumber3x5: "",
        mfgPn: "",
        vendor: "",
        capacity: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    },
    {
      id: 19,
      name: "tools",
      fields: {
        toolName: "",
        vendor: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    },
    {
      id: 20,
      name: "location",
      fields: {
        name: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    },
    {
      id: 21,
      name: "row",
      fields: {
        name: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    },
    {
      id: 22,
      name: "rack",
      fields: {
        name: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    },
    {
      id: 23,
      name: "cupboard",
      fields: {
        name: "",
        quantity: "", // Added quantity before description
        description: ""
      }
    }
  ];
  

  // Define Initial Assets
  const initialAssets: Asset[] = [
    {
      RFID: "1234567890",
      type: 20,
      fields: { name: "Lab-1", description: "Lab-1 location" },
      isAvailable: true,
      children: ["1234567891"],
    },
    {
      RFID: "1234567891",
      type: 21,
      fields: { name: "Row-1", description: "Row-1 location" },
      isAvailable: true,
      parentId: "1234567890",
    },
    {
      RFID: "1234567892",
      type: 22,
      fields: { name: "Rack-1", description: "Rack-1 location" },
      isAvailable: true,
      parentId: "1234567891",
      children: ["1234567893"],
    },
    {
      RFID: "1234567893",
      type: 23,
      fields: { name: "Cupboard-1", description: "Cupboard-1 location" },
      isAvailable: true,
      parentId: "1234567892",
    },
    {
      RFID: "1234567896",
      type: 23,
      fields: { name: "Cupboard-2", description: "Cupboard-2 location" },
      isAvailable: true,
      parentId: "1234567892",
    },
  ];

  // Initialize Counts Based on Initial Assets
  const initialCounts: Count[] = initializeCounts(assetTypes, initialAssets);

  return {
    // Assets and Counts
    assetType: assetTypes,
    counts: initialCounts,
    assets: initialAssets,
    rfids: initialAssets.map(asset => asset.RFID),
    assetMovements: [],
    auditLogs: [],

    // Location management methods
    locations: initialLocations,

    addLocation: (name, description) => {
      const newLocation: Location = { id: Date.now(), name, description };
      set((state) => ({
        locations: [...state.locations, newLocation],
      }));
      return newLocation; // Return the newly added location
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

    getLocations: () => {
      return get().locations;
    },

    // CRUD operations for assets
    addAsset: (rfid, typeId, fields, parentId, children) => {
      // Prevent duplicate RFIDs and validate asset type and parentId
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
  };
});