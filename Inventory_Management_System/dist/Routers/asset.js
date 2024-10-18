"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asset_1 = require("../Assets/asset");
const router = express_1.default.Router();
router.get('/', asset_1.getAllAssets);
router.post('/', asset_1.createAsset);
exports.default = router;
