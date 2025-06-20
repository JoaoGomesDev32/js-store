import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
  const userId = req.userId;
  const cart = await Cart.findOne({ userId }).populate("products.productId");
  if (!cart) return res.json({ products: [] });
  res.json(cart);
};

export const addToCart = async (req, res) => {
  const userId = req.userId;
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId });
  if (!cart) cart = await Cart.create({ userId, products: [] });
  const productIndex = cart.products.findIndex(p => p.productId.equals(productId));
  if (productIndex > -1) {
    cart.products[productIndex].quantity += quantity;
  } else {
    cart.products.push({ productId, quantity });
  }
  await cart.save();
  res.json(cart);
};

export const updateCartItem = async (req, res) => {
  const userId = req.userId;
  const { productId, quantity } = req.body;
  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ error: "Carrinho não encontrado" });
  const product = cart.products.find(p => p.productId.equals(productId));
  if (!product) return res.status(404).json({ error: "Produto não está no carrinho" });
  product.quantity = quantity;
  await cart.save();
  res.json(cart);
};

export const removeFromCart = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.body;
  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ error: "Carrinho não encontrado" });
  cart.products = cart.products.filter(p => !p.productId.equals(productId));
  await cart.save();
  res.json(cart);
};

export const clearCart = async (req, res) => {
  const userId = req.userId;
  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ error: "Carrinho não encontrado" });
  cart.products = [];
  await cart.save();
  res.json(cart);
}; 