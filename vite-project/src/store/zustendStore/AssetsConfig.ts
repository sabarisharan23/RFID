// assetsConfig.ts
import { Asset, AssetType } from './storeTypes'; // Ensure the types are correctly imported from the types file

// Asset Types Definition
export const assetTypes: AssetType[] = [
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

// Initial Assets Definition
export const initialAssets: Asset[] = [
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
