export type Filer = {
    system: string;
    health: string;
    ds: string;
    ioConfig: string;
};

export type ClientsSummarySection = {
    clients: string;
    vendor: string;
};

export type ClientsDetailsSection = {
    clientName: string;
    location: string;
    os: string;
    capacity: string;
    available: string;
    reservedOwner: string;
    purpose: string;
    warrantyDetails: string;
};

export type SwitchSummarySection = {
    switches: string;
    vendor: string;
};

export type SwitchesDetailsSection = {
    switchesName: string;
    location: string;
    capacity: string;
    available: string;
    purpose: string;
    warrantyDetails: string;
};

export type HbaIoCard = {
    hbaCardDetails: string;
    platform: string;
    partNumber3x5: string;
    mfgPn: string;
    location: string;
    vendor: string;
    busyQuantity: string;
};

export type Cables = {
    cablesTypeClass: string;
    platform: string;
    partNumber3x5: string;
    mfgPn: string;
    location: string;
    vendor: string;
    length: string;
};

export type Dimm = {
    partNumber3x5: string;
    mfgPn: string;
    location: string;
    vendor: string;
    capacity: string;
};

export type Nvdimm = {
    partNumber3x5: string;
    mfgPn: string;
    location: string;
    vendor: string;
    capacity: string;
};

export type Battery = {
    partNumber3x5: string;
    mfgPn: string;
    location: string;
};

export type Fans = {
    partNumber3x5: string;
    mfgPn: string;
    location: string;
};

export type UsbPendrives = {
    capacity: string;
    location: string;
    vendor: string;
};

export type SsdDrives = {
    partNumber3x5: string;
    mfgPn: string;
    location: string;
    vendor: string;
    capacity: string;
};

export type HddDrives = {
    partNumber3x5: string;
    mfgPn: string;
    location: string;
    vendor: string;
    capacity: string;
};

export type FlashCache = {
    partNumber3x5: string;
    mfgPn: string;
    location: string;
    vendor: string;
    capacity: string;
};

export type BootMedia = {
    partNumber3x5: string;
    mfgPn: string;
    location: string;
    vendor: string;
    capacity: string;
};

export type Psu = {
    partNumber3x5: string;
    mfgPn: string;
    location: string;
    vendor: string;
    capacity: string;
};

export type Sfps = {
    sfpType: string;
    partNumber3x5: string;
    mfgPn: string;
    location: string;
    vendor: string;
    capacity: string;
};

export type Tools = {
    toolName: string;
    vendor: string;
};
