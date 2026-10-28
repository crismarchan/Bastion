import { Router } from 'express';
import {listAllProducts, listPaginatedProducts, createNewProduct, removeProduct } from '../controllers/product.controller.js';

const router = Router();
// Ruta para traer TODOS los productos
router.get('/', listAllProducts);
// Ruta para traer los productos PAGINADOS
router.get('/paginated', listPaginatedProducts);

//Ruta para crear un producto
router.post('/', createNewProduct);

//Ruta para eliminar un producto
router.delete('/:id', removeProduct);

export default router;
