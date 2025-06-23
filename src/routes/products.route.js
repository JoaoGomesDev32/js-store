import { Router } from "express";
const router = Router();

import {
  create,
  findAll,
  topProducts,
} from "../controllers/products.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

router.post("/", authMiddleware, adminMiddleware, create);
router.get("/", findAll);
router.get("/top", topProducts);

export default router;
