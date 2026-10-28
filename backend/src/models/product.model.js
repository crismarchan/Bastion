import { query } from "../config/db.js";

// Transforma el NUMERIC (price) de PostgreSQL a número de JavaScript
function mapProduct(row) {
  return { ...row, price: Number(row.price) };
}

// 1. Consulta para TODOS los productos
export async function findAllProducts() {
  const { rows } = await query(
    `SELECT p.id, p.name, p.description, p.price, p.stock, p.image_url,
            c.name AS category_name, b.name AS brand_name
     FROM products p
     JOIN categories c ON c.id = p.category_id
     JOIN brands b ON b.id = p.brand_id
     ORDER BY p.id`,
  );
  return rows.map(mapProduct);
}

// 2. Consulta para productos PAGINADOS
export async function findPaginatedProducts({ limit, offset }) {
  const values = [limit, offset];
  const { rows } = await query(
    `SELECT p.id, p.name, p.description, p.price, p.stock, p.image_url,
            c.name AS category_name, b.name AS brand_name
     FROM products p
     JOIN categories c ON c.id = p.category_id
     JOIN brands b ON b.id = p.brand_id
     ORDER BY p.id
     LIMIT $1 OFFSET $2`,
    values,
  );
  return rows.map(mapProduct);
}

// 3. Conteo total para la paginación
export async function countProducts() {
  const { rows } = await query(`SELECT COUNT(*)::int AS total FROM products`);
  return rows[0].total;
}
