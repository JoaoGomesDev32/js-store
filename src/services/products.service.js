import Product from "../models/Product.js";

const createService = (body) => Product.create(body);

const findAllService = () => Product.find();

export { createService, findAllService };
