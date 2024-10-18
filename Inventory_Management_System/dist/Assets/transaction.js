"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = exports.getAllTransactions = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await prisma.transaction.findMany();
        res.json(transactions);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch transactions" });
    }
};
exports.getAllTransactions = getAllTransactions;
const createTransaction = async (req, res) => {
    const { requestedBy, status, respondedBy, respondedAt, isActive } = req.body;
    try {
        const transaction = await prisma.transaction.create({
            data: { requestedBy, status, respondedBy, respondedAt, isActive },
        });
        res.status(201).json(transaction);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create transaction" });
    }
};
exports.createTransaction = createTransaction;
