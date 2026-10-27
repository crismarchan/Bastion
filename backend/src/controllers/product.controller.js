import { findProducts } from '../models/product.model.js';

// GET /api/products
export async function listProducts(req, res) {
  const limit = Number(req.query.limit) || 6;
  const offset = Number(req.query.offset) || 0;

  const products = await findProducts({ limit, offset });

  res.json({ data: products });
}
