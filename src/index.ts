import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import cors from "cors";
const app=express();
import OrderRoutes from '../src/routes/OrderRoute'
import PaymentRoute from "./routes/payment";
import Webhook from "./routes/webhook";

const allowedOrigins = ["http://localhost:5173", "https://khane-wala.vercel.app"];
app.use(
  cors()
);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

  app.use('/api/order',OrderRoutes)
  app.use("/api/payment", Webhook);
app.use("/api/payment", PaymentRoute);

app.listen(8001,()=>{
    console.log('server connected on port 8001');
})