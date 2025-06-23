import Product from "../models/Product.js";

const createService = (body) => Product.create(body);

const findAllService = (offset, limit) =>
  Product.find().sort({ _id: -1 }).skip(offset).limit(limit);

const countProductsService = async () => {
  return await Product.countDocuments();
};

const topProductsService = async () => {
  return await Product.find().sort({ price: -1 }).limit(10);
};

export {
  createService,
  findAllService,
  countProductsService,
  topProductsService,
};
