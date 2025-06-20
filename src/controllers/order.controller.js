import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  const userId = req.user.id;
  const { address } = req.body;
  const cart = await Cart.findOne({ userId });
  if (!cart || cart.products.length === 0) return res.status(400).json({ error: "Carrinho vazio" });
  let total = 0;
  const products = await Promise.all(cart.products.map(async item => {
    const product = await Product.findById(item.productId);
    if (!product) throw new Error("Produto não encontrado");
    const price = product.discountPrice || product.price;
    total += price * item.quantity;
    return {
      productId: product._id,
      quantity: item.quantity,
      price,
    };
  }));
  const order = await Order.create({ userId, products, total, address });
  cart.products = [];
  await cart.save();
  res.status(201).json(order);
};

export const getUserOrders = async (req, res) => {
  const userId = req.user.id;
  const orders = await Order.find({ userId });
  res.json(orders);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
}; 