// storeTypes.ts
export interface Location {
    id: number;
    name: string;
    description: string;
  }
  
  export interface AssetType<T = any> {
    id: number;
    name: string;
    fields: T;
  }
  
  export interface Count {
    id: number;
    totalQuantity: number;
    inUse: number;
    available: number;
  }
  
  export interface AssetMovement {
    id: number;
    assetRFID: string;
    date: Date;
    movementType: 'in' | 'out';
  }
  
  export interface AuditLog {
    id: number;
    auditDate: Date;
    details: string;
  }
  
  export interface Asset<T = any> {
    RFID: string;
    type: number;
    fields: T;
    isAvailable: boolean;
    parentId?: string;
    children?: string[];
  }
  
  export interface AssetStore {
    assetType: AssetType[];
    counts: Count[];
    assets: Asset[];
    rfids: string[];
    assetMovements: AssetMovement[];
    auditLogs: AuditLog[];
    locations: Location[];
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
  