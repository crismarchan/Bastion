import { Router } from 'express';
import {listAllProducts, listPaginatedProducts } from '../controllers/product.controller.js';

const router = Router();
// Ruta para traer TODOS los productos
router.get('/', listAllProducts);
// Ruta para traer los productos PAGINADOS
router.get('/paginated', listPaginatedProducts);

export default router;
