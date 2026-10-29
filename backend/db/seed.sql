INSERT INTO categories (name) VALUES
  ('Camisas'),
  ('Pantalones'),
  ('Calzado'),
  ('Accesorios'),
  ('Perfumes');

INSERT INTO brands (name) VALUES
  ('Nordic Line'),
  ('Casa Fuerte'),
  ('Atelier Sur'),
  ('Brisa Noble');

-- Los IDs deben coincidir con los nombres product-<id>.png.
INSERT INTO products (
  id,
  name,
  description,
  price,
  stock,
  image_url,
  category_id,
  brand_id
) OVERRIDING SYSTEM VALUE
SELECT
  seed.id,
  seed.name,
  seed.description,
  seed.price,
  seed.stock,
  seed.image_url,
  categories.id,
  brands.id
FROM (
  VALUES
    (1, 'Camisa Oxford Azul', 'Camisa de algodón manga larga.', 599.00, 20, '/images/product-1.png', 'Camisas', 'Nordic Line'),
    (2, 'Pantalón Chino Beige', 'Corte slim, tela ligera.', 749.90, 15, '/images/product-2.png', 'Pantalones', 'Casa Fuerte'),
    (3, 'Cinturón de Piel', 'Piel genuina con hebilla metálica.', 349.00, 30, NULL, 'Accesorios', 'Atelier Sur'),
    (4, 'Perfume Madera Noble 100 ml', 'Aroma amaderado para uso diario.', 1290.00, 10, '/images/product-4.png', 'Perfumes', 'Brisa Noble'),
    (5, 'Botín de Piel Negro', 'Botín de piel con suela resistente.', 1899.00, 5, '/images/product-5.png', 'Calzado', 'Atelier Sur'),
    (6, 'Perfume Especias 100 ml', 'Aroma especiado para ocasiones especiales.', 1490.00, 5, '/images/product-6.png', 'Perfumes', 'Casa Fuerte'),
    (7, 'Camisa Casual Verde', 'Camisa de manga larga y corte regular.', 579.00, 14, '/images/product-7.png', 'Camisas', 'Casa Fuerte'),
    (8, 'Tenis Urbanos Blancos', 'Calzado casual para uso diario.', 1199.00, 8, '/images/product-8.png', 'Calzado', 'Casa Fuerte'),
    (9, 'Perfume Cuero Intenso 100 ml', 'Aroma intenso con notas de cuero.', 1390.00, 6, '/images/product-9.png', 'Perfumes', 'Atelier Sur'),
    (10, 'Reloj Minimalista', 'Reloj de diseño sencillo para uso diario.', 1599.00, 4, NULL, 'Accesorios', 'Brisa Noble'),
    (11, 'Pantalón de Vestir Gris', 'Pantalón recto para ocasiones formales.', 899.00, 9, '/images/product-11.png', 'Pantalones', 'Nordic Line'),
    (12, 'Mocasín Clásico', 'Mocasín cómodo para vestir casual.', 1399.00, 6, '/images/product-12.png', 'Calzado', 'Brisa Noble'),
    (13, 'Perfume Bosque 100 ml', 'Fragancia amaderada para uso diario.', 1290.00, 8, '/images/product-13.png', 'Perfumes', 'Nordic Line'),
    (14, 'Bufanda Azul Marino', 'Bufanda suave para clima frío.', 449.00, 17, NULL, 'Accesorios', 'Casa Fuerte'),
    (15, 'Pantalón Casual Oliva', 'Pantalón cómodo de algodón.', 729.00, 13, '/images/product-15.png', 'Pantalones', 'Atelier Sur'),
    (16, 'Pantalón Chino Azul', 'Pantalón casual de corte slim.', 779.00, 16, '/images/product-16.png', 'Pantalones', 'Casa Fuerte'),
    (17, 'Zapato Derby Café', 'Zapato clásico con acabado café.', 1499.00, 7, '/images/product-17.png', 'Calzado', 'Nordic Line'),
    (18, 'Cinturón Negro Clásico', 'Cinturón con hebilla metálica.', 399.00, 20, NULL, 'Accesorios', 'Nordic Line'),
    (19, 'Camisa de Lino Arena', 'Camisa ligera de lino para clima cálido.', 699.00, 12, '/images/product-19.png', 'Camisas', 'Atelier Sur'),
    (20, 'Camisa Azul Marino', 'Camisa clásica con cuello estructurado.', 649.00, 10, '/images/product-20.png', 'Camisas', 'Brisa Noble'),
    (21, 'Pantalón Negro Slim', 'Pantalón negro de estilo moderno.', 849.00, 11, '/images/product-21.png', 'Pantalones', 'Brisa Noble'),
    (22, 'Camisa Oxford Blanca', 'Camisa de algodón para uso formal o casual.', 629.00, 18, '/images/product-22.png', 'Camisas', 'Nordic Line'),
    (23, 'Perfume Cítrico 100 ml', 'Fragancia fresca con notas cítricas.', 1190.00, 9, '/images/product-23.png', 'Perfumes', 'Brisa Noble'),
    (24, 'Cartera de Piel Café', 'Cartera compacta con varios compartimentos.', 549.00, 15, NULL, 'Accesorios', 'Atelier Sur')
) AS seed(id, name, description, price, stock, image_url, category_name, brand_name)
JOIN categories ON categories.name = seed.category_name
JOIN brands ON brands.name = seed.brand_name
ORDER BY seed.id;

SELECT setval(
  pg_get_serial_sequence('products', 'id'),
  (SELECT MAX(id) FROM products),
  true
);
