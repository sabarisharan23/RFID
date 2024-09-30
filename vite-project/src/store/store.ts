import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // Import persist middleware

// Type Definitions

interface Location {
  id: number;
  name: string;
  description: string;
}

interface AssetType<T = any> {
  id: number;
  name: string;
  fields: T;
}

interface Count {
  id: number;
  totalQuantity: number;
  inUse: number;
  available: number;
}

interface AssetMovement {
  id: number;
  assetRFID: string;
  date: Date;
  movementType: 'in' | 'out';
}

interface AuditLog {
  id: number;
  auditDate: Date;
  details: string;
}

interface Asset<T = any> {
  RFID: string;
  type: number; // Refers to asset type ID
  fields: T;
  isAvailable: boolean;
  parentId?: string;
  children?: string[];
}

interface AssetStore {
  assetType: AssetType[]; // Array of different asset types
  counts: Count[]; // Array of counts corresponding to asset types
  assets: Asset[]; // List of assets with RFID
  rfids: string[]; // List of RFID strings
  assetMovements: AssetMovement[]; // List of asset movements
  auditLogs: AuditLog[]; // List of audit logs

  locations: Location[]; // List of locations
  addLocation: (name: string, description: string) => Location;
  updateLocation: (id: number, name: string, description: string) => void;
  deleteLocation: (id: number) => void;
  getLocations: () => Location[];

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

  addAssetMovement: (movement: AssetMovement) => void;
  getAssetMovementsByRFID: (rfid: string) => AssetMovement[];

  addAuditLog: (audit: AuditLog) => void;
  getAuditLogsByDate: (date: Date) => AuditLog[];

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

// Zustand store with persistence
export const useAssetStore = create<AssetStore>()(
  persist(
    (set, get) => ({
      // Define Initial Locations
      locations: [
        { id: 1, name: 'Location 1', description: 'Main office' },
        { id: 2, name: 'Location 2', description: 'Warehouse' },
      ],

      assetType: [
        {
          id: 1,
          name: 'filer',
          fields: {
            system: '',
            health: '',
            ds: '',
            ioConfig: '',
            quantity: '',
            description: '',
          },
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
    },
  ],
  

  // Define Initial Assets
  assets: [
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
  counts: initializeCounts([], []), // Initialize counts

  rfids: [],

  assetMovements: [],

  auditLogs: [],

  // Location management methods
  addLocation: (name, description) => {
    const newLocation: Location = { id: Date.now(), name, description };
    set((state) => ({
      locations: [...state.locations, newLocation],
    }));
    return newLocation;
  },

  updateLocation: (id, name, description) => {
    set((state) => ({
      locations: state.locations.map((location) =>
        location.id === id ? { ...location, name, description } : location
      ),
    }));
  },

  deleteLocation: (id) => {
    set((state) => ({
      locations: state.locations.filter((location) => location.id !== id),
    }));
  },

  getLocations: () => {
    return get().locations;
  },

  // Asset management
  addAsset: (rfid, typeId, fields, parentId, children) => {
    const newAsset: Asset = {
      RFID: rfid,
      type: typeId,
      fields,
      isAvailable: true,
      parentId,
      children,
    };
    set((state) => ({
      assets: [...state.assets, newAsset],
    }));
  },

  updateAsset: (rfid, updatedFields, updatedProperties) => {
    set((state) => ({
      assets: state.assets.map((asset) =>
        asset.RFID === rfid
          ? { ...asset, ...updatedProperties, fields: { ...asset.fields, ...updatedFields } }
          : asset
      ),
    }));
  },

  deleteAsset: (rfid) => {
    set((state) => ({
      assets: state.assets.filter((asset) => asset.RFID !== rfid),
    }));
  },

  toggleAssetAvailability: (rfid) => {
    set((state) => ({
      assets: state.assets.map((asset) =>
        asset.RFID === rfid ? { ...asset, isAvailable: !asset.isAvailable } : asset
      ),
    }));
  },

  addAssetMovement: (movement) => {
    set((state) => ({
      assetMovements: [...state.assetMovements, movement],
    }));
  },

  getAssetMovementsByRFID: (rfid) => {
    return get().assetMovements.filter((movement) => movement.assetRFID === rfid);
  },

  addAuditLog: (audit) => {
    set((state) => ({
      auditLogs: [...state.auditLogs, audit],
    }));
  },

  getAuditLogsByDate: (date) => {
    const targetDate = date.toDateString();
    return get().auditLogs.filter((audit) => audit.auditDate.toDateString() === targetDate);
  },

  updateCount: (id, totalQuantity, inUse, available) => {
    set((state) => ({
      counts: state.counts.map((count) =>
        count.id === id
          ? { ...count, totalQuantity, inUse, available }
          : count
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
  name: 'asset-store', // name of the local storage key
  getStorage: () => localStorage, // (optional) specify where to persist data (default is localStorage)
}
)
);