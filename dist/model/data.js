"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dataSchema = new mongoose_1.default.Schema({
    article: {
        type: [Object],
        required: [true, "please this field cannot be empty"]
    },
    createdAt: {
        type: Date
    }
});
exports.Data = mongoose_1.default.model('data', dataSchema);
