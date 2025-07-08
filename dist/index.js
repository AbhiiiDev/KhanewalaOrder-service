"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const OrderRoute_1 = __importDefault(require("./routes/OrderRoute"));
const payment_1 = __importDefault(require("./routes/payment"));
const webhook_1 = __importDefault(require("./routes/webhook"));
const allowedOrigins = ["http://localhost:5173", "https://khane-wala.vercel.app"];
app.use((0, cors_1.default)());
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("MongoDB connected");
})
    .catch((err) => {
    console.error("MongoDB connection error:", err);
});
app.use('/order', OrderRoute_1.default);
app.use("/payment", webhook_1.default);
app.use("/payment", payment_1.default);
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`server connected on port: ${PORT}`);
});
