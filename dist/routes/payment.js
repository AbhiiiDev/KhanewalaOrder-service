"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const PaymentController_1 = require("../controllers/PaymentController");
const router = express_1.default.Router();
router.post('/create-checkout-session', auth_1.jwtCheck, auth_1.jwtParse, PaymentController_1.createPayment);
exports.default = router;
