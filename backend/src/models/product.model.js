import { query } from '../config/db.js';

// Arma el WHERE solo si llega una categoria.
// El valor NO se pega en el texto: viaja aparte como $1, $2... asi no hay inyeccion SQL.
function buildFilter(categoryId, values) {
  if (!categoryId) return '';
  values.push(categoryId);
  return `WHERE p.category_id = $${values.length}`;
}

// pg devuelve NUMERIC (price) como texto para no perder precision.
// Lo pasamos a numero para que el JSON diga 599 y no "599.00".
function mapProduct(row) {
  return { ...row, price: Number(row.price) };
}

export async function findProducts({ categoryId, limit, offset }) {
  const values = [];
  const where = buildFilter(categoryId, values);

  values.push(limit, offset);

  const { rows } = await query(
    `SELECT p.id, p.name, p.description, p.price, p.stock, p.image_url,
            c.name AS category_name, b.name AS brand_name
     FROM products p
     JOIN categories c ON c.id = p.category_id
     JOIN brands b ON b.id = p.brand_id
     ${where}
     ORDER BY p.id
     LIMIT $${values.length - 1} OFFSET $${values.length}`,
    values
  );

  return rows.map(mapProduct);
}

export async function countProducts({ categoryId }) {
  const values = [];
  const where = buildFilter(categoryId, values);

  const { rows } = await query(
    `SELECT COUNT(*)::int AS total FROM products p ${where}`,
    values
  );

  return rows[0].total;
}
