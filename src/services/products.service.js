import Product from "../models/Product.js";

const createService = (body) => Product.create(body);

const findAllService = (offset, limit) =>
  Product.find().sort({ _id: -1 }).skip(offset).limit(limit);

const countProductsService = async () => {
  return await Product.countDocuments();
};

export { createService, findAllService, countProductsService };
