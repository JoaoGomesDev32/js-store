import { Router } from "express";
const router = Router();

import {
  create,
  findAll,
  findById,
  topProducts,
  searchByName,
  update,
} from "../controllers/products.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

router.post("/", authMiddleware, adminMiddleware, create);
router.get("/", findAll);
router.get("/top", topProducts);
router.get("/search", searchByName);
router.get("/:id", findById);
router.patch("/:id", authMiddleware, adminMiddleware, update);

export default router;
