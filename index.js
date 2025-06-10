import express from "express";
import connectDatabase from "./src/database/db.js";
import userRouter from "./src/routes/user.route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

connectDatabase();
app.use(express.json());
app.use("/user", userRouter);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
