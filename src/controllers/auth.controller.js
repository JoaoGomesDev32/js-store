import bcrypt from "bcryptjs";
import { loginService, generateToken } from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginService(email);

    if (!user) {
      return res.status(401).send({ message: "User or password not found" });
    }

    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "User or password not found" });
    }

    const { password: _, ...userWithoutPassword } = user.toObject();

    const secret = process.env.SECRET_JWT;

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_JWT, // aqui deve ser a chave secreta
      { expiresIn: "1d" }
    );

    res.send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { login };
