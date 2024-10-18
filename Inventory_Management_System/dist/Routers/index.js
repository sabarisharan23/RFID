"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const location_1 = __importDefault(require("./location"));
const asset_1 = __importDefault(require("./asset"));
const transaction_1 = __importDefault(require("./transaction"));
const router = express_1.default.Router();
router.use('/locations', location_1.default);
router.use('/assets', asset_1.default);
router.use('/transactions', transaction_1.default);
exports.default = router;
