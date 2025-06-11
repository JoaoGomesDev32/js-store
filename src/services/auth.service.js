import User from "../models/User.js";
import jwt from "jsonwebtoken";

const loginService = (email) => User.findOne({ email }).select("+password");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "86400s", // 24 hours
  });

export { loginService, generateToken };
