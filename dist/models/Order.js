"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    items: [
        {
            _id: false, // prevent Mongoose from auto-adding _id to subdocs
            name: { type: String, required: true },
            price: { type: Number, required: true }, // price at time of order
            quantity: { type: Number, required: true, min: 1 },
        }
    ],
    total: { type: Number, required: true },
    status: {
        type: String,
        enum: ["pending", "confirmed", "preparing", "ready", "delivered", "cancelled", "refunded"],
        default: "pending"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending"
    },
    paymentIntentId: { type: String }, // for Stripe, Razorpay, PayPal etc
    // or embed Address schema if you want
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true }); // auto adds createdAt + updatedAt
const Order = mongoose_1.default.model('Order', OrderSchema);
exports.default = Order;
