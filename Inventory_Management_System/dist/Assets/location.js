"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLocation = exports.getAllLocations = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllLocations = async (req, res) => {
    try {
        const locations = await prisma.location.findMany();
        res.json(locations);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch locations' });
    }
};
exports.getAllLocations = getAllLocations;
const createLocation = async (req, res) => {
    const { locationTypeId, name, description, isActive, parentId } = req.body;
    try {
        const location = await prisma.location.create({
            data: { locationTypeId, name, description, isActive, parentId },
        });
        res.status(201).json(location);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create location' });
    }
};
exports.createLocation = createLocation;
