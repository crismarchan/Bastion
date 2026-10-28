import { findAllProducts, findPaginatedProducts, countProducts, createProduct } from "../models/product.model.js";

// GET /api/products
export async function listAllProducts(req, res) {
  try {
    const products = await findAllProducts();
    res.json({ data: products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /api/products/paginated?limit=10&offset=0
export async function listPaginatedProducts(req, res) {
  try {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;

    const [products, total] = await Promise.all([
      findPaginatedProducts({ limit, offset }),
      countProducts(),
    ]);

    res.json({
      data: products,
      pagination: {
        total,
        limit,
        offset,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// POST /api/products
export async function createNewProduct(req, res) {
  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json({ message: "Producto creado exitosamente", data: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

