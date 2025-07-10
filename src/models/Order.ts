import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
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
    updatedAt: { type: Date, default: Date.now },
      // ✅ New Fields for Tracking
 // Timestamps for status flow
  timestamps: {
    placedAt: Date,
    confirmedAt: Date,
    preparedAt: Date,
    pickedAt: Date,
    deliveredAt: Date,
  },

  // Tracking history (can be used even without delivery partner)
  trackingUpdates: [
    {
      timestamp: { type: Date, default: Date.now },
      status: String
    }
  ]
}, { timestamps: true }); // auto adds createdAt + updatedAt


const Order=mongoose.model('Order',OrderSchema);
export default Order;
