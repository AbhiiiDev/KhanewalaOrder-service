"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderController_1 = require("../controllers/OrderController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/:orderId', OrderController_1.getOrder);
router.get('/', auth_1.jwtParse, auth_1.jwtCheck, OrderController_1.getAllOrder);
exports.default = router;
