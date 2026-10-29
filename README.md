# Bastion

Bastion es un catálogo de ropa para caballero, accesorios y perfumes. El repositorio contiene una API Express, un frontend React y un seed para preparar una base PostgreSQL nueva con productos e imágenes.

## Backend actual

La API está construida con Node.js, Express y PostgreSQL. La base de datos se aloja en Supabase y se consulta con el driver `pg` y SQL directo.

El código está dividido por responsabilidades:

- `backend/src/app.js`: configura Express, expone las rutas generales y conecta las rutas de productos.
- `backend/src/routes/`: asocia direcciones HTTP con sus controladores.
- `backend/src/controllers/`: procesa solicitudes y forma las respuestas HTTP.
- `backend/src/models/`: ejecuta las consultas SQL para productos.
- `backend/src/middlewares/`: contiene el middleware de comprobación de rol usado en las escrituras.
- `backend/src/config/db.js`: configura el pool de conexiones de PostgreSQL con `DATABASE_URL`.
- `backend/public/images/`: almacena las imágenes de productos que Express publica bajo `/images`.
- `backend/db/schema.sql`: define las tablas y relaciones.
- `backend/db/seed.sql`: contiene datos iniciales de categorías, marcas y productos.

## Base de datos y usuarios

El esquema define cuatro tablas:

- `users`: nombre, correo único, hash de contraseña y rol (`admin` o `user`).
- `categories`: nombres únicos de categorías.
- `brands`: nombres únicos de marcas.
- `products`: información de productos y referencias a una categoría y una marca.


Las rutas para crear, editar y borrar productos usan `x-user-role: admin` como comprobación temporal. 

## Requisitos

- Node.js LTS y npm.
- Git para clonar el repositorio.
- Postman para probar las rutas manualmente.

## Preparar una base de datos nueva

La base de datos se aloja en Supabase. Para tener una copia propia del catálogo, crea un proyecto Supabase y abre **SQL Editor**. Ejecuta los archivos en este orden:

1. `backend/db/schema.sql` crea las tablas.
2. `backend/db/seed.sql` inserta las categorías, marcas y 24 productos con IDs estables y sus rutas de imagen.

Ejecuta el seed **una sola vez y únicamente en una base vacía** después del esquema. No es idempotente: volverlo a ejecutar duplica categorías y marcas y puede fallar por sus restricciones `UNIQUE`. La tabla `users` queda vacía; el seed no crea cuentas ni contraseñas.

Los IDs de productos se fijan en el seed para que coincidan con los archivos `backend/public/images/product-<id>.png`. Cinco productos no tienen imagen; su `image_url` queda en `NULL` y el frontend muestra un reemplazo.

## Instalación y configuración local

Requisitos: Node.js LTS, npm, Git y un proyecto Supabase con el esquema y seed ya ejecutados. Desde PowerShell:

```powershell
git clone https://github.com/crismarchan/Bastion.git
cd Bastion
cd backend
npm ci
Copy-Item .env.example .env
```

Abre `backend/.env` y reemplaza el valor de ejemplo por la cadena PostgreSQL de **Supabase > Connect**. No compartas ni subas ese archivo: contiene credenciales. Después de iniciar el backend, revisa la conexión en `http://localhost:3000/api/health`.

### Ejecutar backend y frontend

Abre una terminal para cada servidor. En la primera:

```powershell
cd Bastion\backend
npm run dev
```

El backend escucha en `http://localhost:3000`. En una segunda terminal:

```powershell
cd Bastion\frontend
npm ci
Copy-Item .env.example .env
npm run dev
```

Abre la URL local que Vite muestra en la terminal, normalmente `http://localhost:5173`. El `.env` del frontend puede conservar `VITE_API_URL=http://localhost:3000` para desarrollo local. Si cambias esa variable, reinicia Vite.

Para comprobar la API, visita `http://localhost:3000/api/health` y `http://localhost:3000/api/products/paginated?limit=9&offset=0`. El catálogo debe mostrar hasta nueve productos por página.


## Rutas disponibles

Todas las direcciones siguientes usan como base `http://localhost:3000`.

| Método | Ruta | Acceso actual | Descripción |
|---|---|---|---|
| `GET` | `/` | Público | Confirma que la API responde con un mensaje. |
| `GET` | `/api/health` | Público | Ejecuta `SELECT 1` para comprobar la conexión a PostgreSQL. Devuelve `503` si falla la comprobación. |
| `GET` | `/api/products` | Público | Devuelve todos los productos con nombre de categoría y marca. |
| `GET` | `/api/products/paginated?limit=10&offset=0` | Público | Devuelve una página de productos y metadatos de paginación. |
| `POST` | `/api/products` | Cabecera temporal de rol | Crea un producto. Requiere `x-user-role: admin`. |
| `PUT` | `/api/products/:id` | Cabecera temporal de rol | Reemplaza los datos del producto indicado. Requiere `x-user-role: admin`. |
| `DELETE` | `/api/products/:id` | Cabecera temporal de rol | Elimina el producto indicado. Requiere `x-user-role: admin`. |

Para probar `POST` o `PUT` en Postman:

1. Selecciona **Body > raw > JSON**.
2. Para las rutas de escritura, agrega en **Headers** `x-user-role` con valor `admin`. Esto solo demuestra el middleware temporal; no es una credencial segura.
3. Envía un cuerpo como el siguiente. `category_id` y `brand_id` deben corresponder a IDs existentes en la base:

```json
{
  "name": "Camisa de prueba",
  "description": "Producto creado desde Postman",
  "price": 650.00,
  "stock": 8,
  "image_url": null,
  "category_id": 1,
  "brand_id": 1
}
```

La solicitud `DELETE` modifica la base de datos de forma permanente; prueba con un producto que puedas eliminar.

## Probar la conexión

Con el servidor en ejecución, puedes probar primero estas solicitudes en Postman:

```text
GET http://localhost:3000/
GET http://localhost:3000/api/health
GET http://localhost:3000/api/products
GET http://localhost:3000/api/products/paginated?limit=10&offset=0
```

`localhost` se refiere a la misma laptop donde corre Node.js. Para que otra computadora haga pruebas, el backend debe ejecutarse allí o configurarse para aceptar conexiones de red y la URL debe apuntar a esa computadora, no a `localhost` en el equipo remoto.

## Imágenes de productos

El backend publica los archivos de `backend/public/images/` bajo la ruta `/images`. El seed espera nombres como `product-2.png`; ese archivo se sirve en `http://localhost:3000/images/product-2.png`.

La base solo guarda la ruta relativa en `products.image_url`, no el archivo. El seed ya asocia las rutas de los productos. Los PNG incluidos en Git suman aproximadamente 25 MB; si se reemplazan por otros formatos o nombres, actualiza tanto los archivos como el seed para que las rutas sigan coincidiendo. Para futuras imágenes, se recomienda WebP, unos 800 px de ancho y menos de 150 KB por archivo. Si no hay ruta o el archivo no carga, la tarjeta muestra un reemplazo.

Para comprobar una imagen, inicia el backend y abre su URL directamente en el navegador, por ejemplo `http://localhost:3000/images/product-2.png`. Si no carga, revisa que el nombre y la extensión coincidan con el archivo en la carpeta.

El frontend toma la URL base de `VITE_API_URL`. Para compartir el catálogo, incluye los archivos de imágenes en Git y proporciona una URL de backend accesible desde el equipo del evaluador; `localhost` solo funciona en la misma computadora donde corre Express.

## Alcance y seguridad de la demo

El catálogo y las imágenes son públicos. Las escrituras de productos usan temporalmente la cabecera `x-user-role: admin`, que cualquiera puede falsificar; no es autenticación real y no debe usarse para proteger datos. El login no está implementado todavía.
