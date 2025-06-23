import {
  createService,
  findAllService,
  countProductsService,
  topProductsService,
  findByIdService,
} from "../services/products.service.js";

const create = async (req, res) => {
  try {
    const { name, description, price, images, category, stockQuantity } =
      req.body;

    if (
      !name ||
      !description ||
      !price ||
      !images ||
      !Array.isArray(images) ||
      images.length === 0 ||
      !category ||
      stockQuantity === undefined
    ) {
      return res
        .status(400)
        .send({ message: "Todos os campos são obrigatórios" });
    }

    const product = await createService({
      name,
      description,
      price,
      images,
      category,
      stockQuantity,
      user: req.userId,
    });

    if (!product) {
      return res.status(500).send({ message: "Erro ao criar produto" });
    }

    res.status(201).json(product);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // <-- Definindo page
    const limit = parseInt(req.query.limit) || 10; // <-- Definindo limit
    const skip = (page - 1) * limit;

    // Supondo que seu service aceite skip e limit:
    const products = await findAllService(skip, limit);
    const total = await countProductsService();
    const totalPages = Math.ceil(total / limit);

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${
      req.path
    }`;
    const nextUrl =
      page < totalPages ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null;

    res.status(200).json({
      products,
      total,
      page,
      totalPages,
      nextUrl,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar produtos", error: error.message });
  }
};

const topProducts = async (req, res) => {
  try {
    const products = await topProductsService(0, 10); // Exemplo de busca dos 10 primeiros produtos
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Nenhum produto encontrado" });
    }

    res.send({
      products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar produtos", error: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await findByIdService({ _id: productId });

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.send({
      product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar produto", error: error.message });
  }
};

export { create, findAll, topProducts, findById };
