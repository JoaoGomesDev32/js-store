import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require("../swagger.json");

const router = Router();

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.get("/", (req, res) => {
  res.send("API documentation is available at /api-docs");
});

export default router;
