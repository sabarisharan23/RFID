"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAsset = exports.getAllAssets = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllAssets = async (req, res) => {
    try {
        const assets = await prisma.asset.findMany();
        res.json(assets);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch assets' });
    }
};
exports.getAllAssets = getAllAssets;
const createAsset = async (req, res) => {
    const { rfid, partNumber, locationId, reservedBy, isActive } = req.body;
    try {
        const asset = await prisma.asset.create({
            data: { rfid, partNumber, locationId, reservedBy, isActive },
        });
        res.status(201).json(asset);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create asset' });
    }
};
exports.createAsset = createAsset;
