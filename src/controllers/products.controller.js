import { createService, findAllService } from "../services/products.service.js";

const create = async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, stockQuantity } =
      req.body;

    if (
      !name ||
      !description ||
      !price ||
      !imageUrl ||
      !category ||
      stockQuantity === undefined
    ) {
      return res
        .status(400)
        .send({ message: "Todos os campos são obrigatórios" });
    }

    await createService({
      name,
      description,
      price,
      imageUrl,
      category,
      stockQuantity,
      user: req.userId,
    });

    res.send(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  const Product = await findAllService();
  if (Product.length === 0) {
    return res.status(500).send({ message: "Erro ao recuperar produtos" });
  }
  res.send(Product);
};

export { create, findAll };
