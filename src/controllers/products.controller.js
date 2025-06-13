import { createService, findAllService } from "../services/products.service.js";

export async function create(req, res) {
  try {
    const product = await createService(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar produto", error });
  }
}

export async function findAll(req, res) {
  try {
    const products = await findAllService();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos", error });
  }
}
