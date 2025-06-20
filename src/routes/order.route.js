import express from "express";
import { createOrder, getUserOrders, getAllOrders } from "../controllers/order.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/my", authMiddleware, getUserOrders);
router.get("/all", authMiddleware, getAllOrders); // proteger com middleware de admin futuramente

export default router; 