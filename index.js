import express from "express";
import connectDatabase from "./src/database/db.js";
import dotenv from "dotenv";

import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import productsRoute from "./src/routes/products.route.js";
import cartRoute from "./src/routes/cart.route.js";
import orderRoute from "./src/routes/order.route.js";
import swaggerRoute from "./src/routes/swagger.route.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

connectDatabase();
app.use(express.json());
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/products", productsRoute);
app.use("/cart", cartRoute);
app.use("/orders", orderRoute);
app.use("/api-docs", swaggerRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
