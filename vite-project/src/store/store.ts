import { create } from 'zustand';


// Type for an asset type definition
interface AssetType<T = any> {
  id: number;
  name: string;
  fields: T;
}

// Type for asset count
interface Count {
  id: number;
  totalQuantity: string;
  inUse: string;
  available: string;
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
  assetType: AssetType[]; // Array of different asset types
  Count: Count[]; // Array of counts corresponding to asset types
  assets: Asset[]; // List of assets with RFID
  rfids: string[]; 
  getAssetsByParentId: (parentId: string) => Promise<never[]>;
  getTypeById: (typeId: number) => AssetType | undefined;

  // List of RFID strings

  // CRUD operations
  addAsset: <T>(rfid: string, typeId: number, fields: T, parentId?:string, children?:string[]) => void;
  updateAsset: <T>(rfid: string, updatedFields: T) => void;
  deleteAsset: (rfid: string) => void;
  toggleAssetAvailability: (rfid: string) => void;

  // Other operations
  updateCount: (id: number, totalQuantity: string, inUse: string, available: string) => void;
  getAssetByRFID: (rfid: string) => Asset | undefined;
  getAssetsByType: (typeId: number) => Asset[];
}

// Zustand store implementation
export const useAssetStore = create<AssetStore>((set, get) => ({
    assetType: [
        {
        id: 1,
        name: "filer",
        fields: {
            system: "",
            health: "",
            ds: "",
            ioConfig: ""
        }
        },
        {
        id: 2,
        name: "clientsSummarySection",
        fields: {
            clients: "",
            vendor: ""
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
            warrantyDetails: ""
        }
        },
        {
        id: 4,
        name: "switchSummarySection",
        fields: {
            switches: "",
            vendor: ""
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
            warrantyDetails: ""
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
            busyQuantity: ""
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
            length: ""
        }
        },
        {
        id: 8,
        name: "dimm",
        fields: {
            partNumber3x5: "",
            mfgPn: "",
            vendor: "",
            capacity: ""
        }
        },
        {
        id: 9,
        name: "nvdimm",
        fields: {
            partNumber3x5: "",
            mfgPn: "",
            vendor: "",
            capacity: ""
        }
        },
        {
        id: 10,
        name: "battery",
        fields: {
            partNumber3x5: "",
            mfgPn: ""
        }
        },
        {
        id: 11,
        name: "fans",
        fields: {
            partNumber3x5: "",
            mfgPn: ""
        }
        },
        {
        id: 12,
        name: "usbPendrives",
        fields: {
            capacity: "",
            vendor: ""
        }
        },
        {
        id: 13,
        name: "ssdDrives",
        fields: {
            partNumber3x5: "",
            mfgPn: "",
            vendor: "",
            capacity: ""
        }
        },
        {
        id: 14,
        name: "hddDrives",
        fields: {
            partNumber3x5: "",
            mfgPn: "",
            vendor: "",
            capacity: ""
        }
        },
        {
        id: 15,
        name: "flashCache",
        fields: {
            partNumber3x5: "",
            mfgPn: "",
            vendor: "",
            capacity: ""
        }
        },
        {
        id: 16,
        name: "bootMedia",
        fields: {
            partNumber3x5: "",
            mfgPn: "",
            vendor: "",
            capacity: ""
        }
        },
        {
        id: 17,
        name: "psu",
        fields: {
            partNumber3x5: "",
            mfgPn: "",
            vendor: "",
            capacity: ""
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
            capacity: ""
        }
        },
        {
        id: 19,
        name: "tools",
        fields: {
            toolName: "",
            vendor: ""
        }
        },
        {
        id: 20,
        name: "location",
        fields: {
            name: "",
            description: ""
        }
        },
        {
        id: 21,
        name: "row",
        fields: {
            name: "",
            description: ""
        }
        },
        {
        id: 22,
        name: "rack",
        fields: {
            name: "",
            description: ""
        }
        },
        {
        id: 23,
        name: "cupboard",
        fields: {
            name: "",
            description: ""
        }
        }
    ],
  
  Count:  [
    {
      id: 1,
      totalQuantity: "",
      inUse: "",
      available: ""
    },
    {
      id: 2,
      totalQuantity: "",
      inUse: "",
      available: ""
    },
    {
      id: 3,
      totalQuantity: "",
      inUse: "",
      available: ""
    },
    {
      id: 4,
      totalQuantity: "",
      inUse: "",
      available: ""
    },
    {
      id: 5,
      totalQuantity: "",
      inUse: "",
      available: ""
    },
    {
      id: 6,
      totalQuantity: "",
      inUse: "busyQuantity",
      available: ""
    },
    {
      id: 7,
      totalQuantity: "",
      inUse: "",
      available: ""
    },
    {
      id: 8,
      totalQuantity: "",
      inUse: "",
      available: ""
    },
    {
      id: 9,
      totalQuantity: "",
      inUse: "",
      available: ""
    },
    {
      id: 10,
      totalQuantity: "",
      inUse: "",
      available: ""
    },
    {
      id: 11,
      totalQuantity: "",
      inUse: "",
      available: ""
    },
    {
      id: 12,
      totalQuantity: "",
      inUse: "",
      available: ""
    },
    {
      id: 13,
      totalQuantity: "",
      inUse: "",
      available: ""
    },
    {
      id: 14,
      totalQuantity: "",
      inUse: "",
      available: ""
    },
    {
      id: 15,
      totalQuantity: "",
      inUse: "",
      available: ""
    },
    {
      id: 16,
      totalQuantity: "",
      inUse: "",
      available: ""
    },
    {
      id: 17,
      totalQuantity: "",
      inUse: "",
      available: ""
    },
    {
      id: 18,
      totalQuantity: "",
      inUse: "",
      available: ""
    },
    {
      id: 19,
      totalQuantity: "",
      inUse: "",
      available: ""
    },
    {
        id: 20,
        totalQuantity: "",
        inUse: "",
        available: ""
      },
      {
        id: 21,
        totalQuantity: "",
        inUse: "",
        available: ""
      },
      {
        id: 22,
        totalQuantity: "",
        inUse: "",
        available: ""
      },
      {
        id: 23,
        totalQuantity: "",
        inUse: "",
        available: ""
      },
  ],

  assets: [{RFID: "1234567890", type: 20, fields: {name:"Lab-1", description:"Lab-1 location"}, isAvailable: true,  children: ["1234567891"]}, {RFID: "1234567891", type: 21, fields: {name:"Row-1", description:"Row-1 location"}, isAvailable: true,  parentId: "1234567890"}, {RFID: "1234567892", type: 22, fields: {name:"Rack-1", description:"Rack-1 location"}, isAvailable: true, parentId: "1234567891", children: ["1234567893"]}, {RFID: "1234567893", type: 23, fields: {name:"Cupboard-1", description:"Cupboard-1 location"}, isAvailable: true, parentId: "1234567892"}, {RFID: "1234567896", type: 23, fields: {name:"Cupboard-2", description:"Cupboard-2 location"}, isAvailable: true, parentId: "1234567892"}],

  rfids: [],

  // CRUD operations for assets
  addAsset: (rfid, typeId, fields, parentId, children) => {
    const assetType = get().assetType.find(at => at.id === typeId);
    if (!assetType) return; 

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
      rfids: [...state.rfids, rfid],
    }));
  },

  updateAsset: (rfid, updatedFields) => {
    set((state) => ({
      assets: state.assets.map((asset) =>
        asset.RFID === rfid ? { ...asset, fields: updatedFields } : asset
      ),
    }));
  },

  deleteAsset: (rfid) => {
    set((state) => ({
      assets: state.assets.filter((asset) => asset.RFID !== rfid),
      rfids: state.rfids.filter((r) => r !== rfid),
    }));
  },

  toggleAssetAvailability: (rfid) => {
    set((state) => ({
      assets: state.assets.map((asset) =>
        asset.RFID === rfid ? { ...asset, isAvailable: !asset.isAvailable } : asset
      ),
    }));
  },
  getAssetTypes: () => get().assetType,

  // To update the count of an asset type by ID
  updateCount: (id, totalQuantity, inUse, available) => {
    set((state) => ({
      Count: state.Count.map((count) =>
        count.id === id ? { ...count, totalQuantity, inUse, available } : count
      ),
    }));
  },

  // Retrieve an asset by RFID
  getAssetByRFID: (rfid) => {
    return get().assets.find((asset) => asset.RFID === rfid);
  },

  // Retrieve all assets of a specific type
  getAssetsByType: (typeId) => {
    return get().assets.filter((asset) => asset.type === typeId);
  },
   getTypeById: (typeId) => {
    return get().assetType.find((type) => type.id === typeId);
  },
  getAssetsByParentId: async (parentId: string) => {
    return get().assets.filter((asset) => asset.parentId === parentId);
  }
}));
