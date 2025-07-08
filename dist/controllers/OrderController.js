"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrder = exports.getOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
require("../models/Restaurant"); // Register the schema globally (even if not used directly)
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.orderId;
    try {
        const order = yield Order_1.default.findById(orderId).populate("restaurant", "restaurantName city imageUrl deliveryPrice estimatedDeliveryTime");
        if (!order)
            return res.status(404).json({ message: "Can't find any order" });
        return res.json(order);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error, something went wrong" });
    }
});
exports.getOrder = getOrder;
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const orders = yield Order_1.default.find({ user: userId }).populate("restaurant", "restaurantName city imageUrl");
        if (!orders)
            return res.status(404).json({ message: "Can't find any order" });
        return res.json(orders);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error, something went wrong" });
    }
});
exports.getAllOrder = getAllOrder;
