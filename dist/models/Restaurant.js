"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const restaurantSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    restaurantName: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    deliveryPrice: { type: Number, required: true },
    estimatedDeliveryTime: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    lastUpdated: { type: Date, required: true, default: new Date() },
    isApproved: {
        type: String,
        enum: ["pending", "approved", "suspected", "rejected"],
        default: "pending",
        required: true,
    }
});
const Restaurant = mongoose_1.default.model("Restaurant", restaurantSchema);
exports.default = Restaurant;
