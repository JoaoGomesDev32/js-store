import mongoose from "mongoose";
import userService from "../services/user.service.js";

const validId = (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid user ID" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const validUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await userService.findByIdService(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    req.id = id;
    req.user = user;

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const validProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await productService.findByIdService(id);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    req.id = id;
    req.product = product;

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { validId, validUser, validProduct };
