import { Router } from "express";
import {
  listAllProducts,
  listPaginatedProducts,
  createNewProduct,
  updateExistingProduct,
  removeProduct,
} from "../controllers/product.controller.js";
import { isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// ==========================================
// RUTAS PÚBLICAS 
// ==========================================

// Ruta para traer TODOS los productos
router.get("/", listAllProducts);

// Ruta para traer los productos de forma PAGINADA
router.get("/paginated", listPaginatedProducts);


// ==========================================
//  RUTAS PROTEGIDAS (Exigen x-user-role: admin)
// ==========================================

// Ruta para crear un nuevo producto
router.post("/", isAdmin, createNewProduct);

// Ruta para actualizar un producto existente usando su ID
router.put('/:id',  isAdmin, updateExistingProduct);

// Ruta para eliminar un producto usando su ID
router.delete("/:id", isAdmin, removeProduct);

export default router;