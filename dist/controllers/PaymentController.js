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
exports.createPayment = void 0;
const stripe_1 = __importDefault(require("stripe"));
const Order_1 = __importDefault(require("../models/Order"));
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}
const stripe = new stripe_1.default(stripeSecretKey);
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { items, restaurantId } = req.body;
    const userId = req.userId;
    const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const line_items = items.map((item) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: item.name,
            },
            unit_amount: item.price * 100,
        },
        quantity: item.quantity
    }));
    const order = yield Order_1.default.create({
        user: userId,
        restaurant: restaurantId,
        items: items,
        total: totalAmount,
        status: 'pending',
        paymentStatus: 'pending',
    });
    const session = yield stripe.checkout.sessions.create({
        payment_method_types: ["paypal", "card", "alipay"],
        line_items,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/success/${order._id}`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
        metadata: {
            userId: req.userId,
            restaurantId,
            orderId: order._id.toString()
        }
    });
    res.json({ id: session.id });
});
exports.createPayment = createPayment;
