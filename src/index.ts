import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import cors from "cors";
import OrderRoutes from '../src/routes/OrderRoute'
const app=express();

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
app.listen(8001,()=>{
    console.log('server connected on port 8001');
})