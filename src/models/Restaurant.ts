import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    restaurantName: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    deliveryPrice: { type: Number, required: true },
    estimatedDeliveryTime: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    lastUpdated: { type: Date, required: true,default:new Date() },
    isApproved:{
        type:String,
        enum:["pending","approved","suspected","rejected"],
        default:"pending",
        required:true,
    }
  });

  const Restaurant= mongoose.model("Restaurant",restaurantSchema);
  export default Restaurant;
