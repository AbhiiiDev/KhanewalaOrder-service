import { Request, Response } from "express";
import Order from "../models/Order";
import "../models/Restaurant"; // Register the schema globally (even if not used directly)


const getOrder=async(req:Request,res:Response)=>{
    const orderId=req.params.orderId;
try {

    const order=await Order.findById(orderId).populate("restaurant","restaurantName city imageUrl deliveryPrice estimatedDeliveryTime");
    if(!order)
        return res.status(404).json({message:"Can't find any order"});
    return res.json(order);
} catch (error) {
    console.log(error);
    res.status(400).json({message:"Internal Server Error, something went wrong"})
}

}
const getAllOrder=async(req:Request,res:Response)=>{
    const userId=req.userId;
try {

    const orders=await Order.find({user:userId}).populate("restaurant","restaurantName city imageUrl");
    if(!orders)
        return res.status(404).json({message:"Can't find any order"});
    return res.json(orders);
} catch (error) {
    console.log(error);
    res.status(400).json({message:"Internal Server Error, something went wrong"})
}

}
const getRestaurantOrder=async(req:Request,res:Response)=>{
    const restId=req.params.restId;
    try {
    const orders=await Order.find({restaurant:restId});
    if(!orders)
        return res.status(404).json({message:"Can't find any order"});
    return res.json(orders);
} catch (error) {
    console.log(error);
    res.status(400).json({message:"Internal Server Error, something went wrong"})
}
}
export {
    getOrder,getAllOrder,getRestaurantOrder
}