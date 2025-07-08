"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/webhook.ts
const express_1 = __importDefault(require("express"));
const webhookController_1 = require("../controllers/webhookController");
const router = express_1.default.Router();
// Stripe requires the raw body to validate signature
router.post('/webhook', express_1.default.raw({ type: 'application/json' }), webhookController_1.WebhookController);
exports.default = router;
