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

const findByIdService = async (id) => {
  return await Product.findById(id);
};

const searchByNameService = (name) =>
  Product.find({
    name: { $regex: name, $options: "i" },
  }).sort({ _id: -1 });

const updateService = async (_id, body) => {
  return await Product.findByIdAndUpdate(productId, updates, { new: true });
};

const eraseService = async (id) => {
  return await Product.findByIdAndDelete(id);
};

const addReviewService = async (productId, userId, comment, rating) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Produto não encontrado");

  // Verifica se o usuário já avaliou
  const alreadyReviewed = product.reviews.find(
    (r) => r.userId.toString() === userId
  );
  if (alreadyReviewed) throw new Error("Você já avaliou este produto");

  product.reviews.push({ userId, comment, rating });

  // Atualiza média e número de reviews
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.numReviews;

  await product.save();
  return product;
};

const deleteReviewService = async (productId, userId, reviewId) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Produto não encontrado");

  // Encontra o review
  const review = product.reviews.id(reviewId);
  if (!review) throw new Error("Comentário não encontrado");

  if (review.userId.toString() !== userId) {
    throw new Error("Você só pode deletar seu próprio comentário");
  }

  // Remove o review usando filter
  product.reviews = product.reviews.filter(
    (r) => r._id.toString() !== reviewId
  );

  // Atualiza média e número de reviews
  product.numReviews = product.reviews.length;
  product.rating =
    product.numReviews > 0
      ? product.reviews.reduce((acc, r) => acc + r.rating, 0) /
        product.numReviews
      : 0;

  await product.save();
  return product;
};

export {
  createService,
  findAllService,
  countProductsService,
  topProductsService,
  findByIdService,
  searchByNameService,
  updateService,
  eraseService,
  addReviewService,
  deleteReviewService,
};
