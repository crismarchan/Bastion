import { Router } from 'express';
import {listAllProducts, listPaginatedProducts, createNewProduct } from '../controllers/product.controller.js';

const router = Router();
// Ruta para traer TODOS los productos
router.get('/', listAllProducts);
// Ruta para traer los productos PAGINADOS
router.get('/paginated', listPaginatedProducts);

//Ruta para crear un producto
router.post('/', createNewProduct);

export default router;
