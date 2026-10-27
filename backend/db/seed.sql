INSERT INTO categories (name) VALUES
  ('Camisas'), ('Pantalones'), ('Calzado'), ('Accesorios'), ('Perfumes');

INSERT INTO brands (name) VALUES
  ('Nordic Line'), ('Casa Fuerte'), ('Atelier Sur'), ('Brisa Noble');

INSERT INTO products (name, description, price, stock, category_id, brand_id) VALUES
  ('Camisa Oxford Azul', 'Camisa de algodón manga larga.', 599.00, 20,
    (SELECT id FROM categories WHERE name = 'Camisas'),
    (SELECT id FROM brands WHERE name = 'Nordic Line')),
  ('Pantalón Chino Beige', 'Corte slim, tela ligera.', 749.90, 15,
    (SELECT id FROM categories WHERE name = 'Pantalones'),
    (SELECT id FROM brands WHERE name = 'Casa Fuerte')),
  ('Cinturón de Piel', 'Piel genuina con hebilla metálica.', 349.00, 30,
    (SELECT id FROM categories WHERE name = 'Accesorios'),
    (SELECT id FROM brands WHERE name = 'Atelier Sur')),
  ('Perfume Madera Noble 100 ml', 'Aroma amaderado para uso diario.', 1290.00, 10,
    (SELECT id FROM categories WHERE name = 'Perfumes'),
    (SELECT id FROM brands WHERE name = 'Brisa Noble'));