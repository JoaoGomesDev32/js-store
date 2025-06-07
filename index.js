import express from "express";
import userRouter from "./src/routes/user.route.js";
import connectDatabase from "./src/database/db.js";

const app = express();

const port = 3000;

connectDatabase();
app.use(express.json());
app.use("/user", userRouter);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
