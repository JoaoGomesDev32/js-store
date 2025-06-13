import Product from "../models/Product.js";

export async function createService(productData) {
  const product = new Product(productData);
  return await product.save();
}

export async function findAllService() {
  return await Product.find();
}
