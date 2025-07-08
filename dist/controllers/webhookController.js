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
exports.WebhookController = void 0;
const stripe_1 = __importDefault(require("stripe"));
const Order_1 = __importDefault(require("../models/Order"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const WebhookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    console.log('webhook controller called');
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    }
    catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        // You can access metadata to store relevant data
        const customerEmail = (_a = session.customer_details) === null || _a === void 0 ? void 0 : _a.email;
        const amount = session.amount_total;
        const restaurantId = (_b = session.metadata) === null || _b === void 0 ? void 0 : _b.restaurantId;
        // Store the order in DB
        // await Order.create({
        //   userEmail: customerEmail,
        //   restaurant: restaurantId,
        //   totalAmount: amount,
        //   // items: JSON.parse(session.line_items), // from metadata
        // });
        try {
            const orderId = (_c = session === null || session === void 0 ? void 0 : session.metadata) === null || _c === void 0 ? void 0 : _c.orderId;
            console.log('updating order', orderId);
            if (orderId) {
                yield Order_1.default.findByIdAndUpdate(orderId, {
                    status: 'confirmed',
                    paymentStatus: 'paid',
                    paymentIntentId: session.payment_intent
                });
            }
        }
        catch (error) {
            console.error('Error updating order:', error);
        }
    }
    res.status(200).json({ received: true });
});
exports.WebhookController = WebhookController;
