import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import cors from "cors";
const app=express();
import OrderRoutes from '../src/routes/OrderRoute'
import PaymentRoute from "./routes/payment";
import Webhook from "./routes/webhook";

const allowedOrigins = ["http://localhost:5173", "https://khanewala.vercel.app"];
app.use(
  cors({
    origin:allowedOrigins,
    credentials:true
  })
);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
  app.use("/payment", Webhook);
app.use(express.json());
  app.use('/order',OrderRoutes)
app.use("/payment", PaymentRoute);
const PORT = process.env.PORT || 8001;
app.listen(PORT,()=>{
    console.log(`server connected on port: ${PORT}`);
})