# Bastion

Bastion es un catálogo de ropa para caballero, accesorios y perfumes. El proyecto está organizado como una tienda de catálogo con administración de productos; actualmente, el trabajo implementado en este repositorio corresponde al backend.

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

## Instalación en Windows

Abre PowerShell en el directorio donde quieras guardar el repositorio:

```powershell
git clone https://github.com/crismarchan/Bastion.git
cd Bastion\backend
npm ci
```

`npm ci` instala las dependencias fijadas en `package-lock.json`. La configuración local necesaria para ejecutar el servicio se proporciona por separado y no se incluye en el repositorio.

## Ejecutar el servidor

Desde `Bastion\backend`, inicia el modo de desarrollo:

```powershell
npm run dev
```

El servidor usa actualmente el puerto `3000`. Cuando la terminal muestre `Servidor escuchando en http://localhost:3000`, puedes enviar solicitudes. Para detenerlo, presiona `Ctrl+C` en esa terminal.


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

El backend publica los archivos de `backend/public/images/` bajo la ruta `/images`. Guarda allí las imágenes de producto con nombres simples, por ejemplo `camisa-oxford-azul.webp`. Para evitar descargas pesadas, procura usar WebP, un ancho aproximado de 800 px y un peso menor a 150 KB por imagen.

La base de datos guarda únicamente la ruta, no el archivo. En `products.image_url` registra `/images/camisa-oxford-azul.webp`. Express la servirá en `http://localhost:3000/images/camisa-oxford-azul.webp`, y la tarjeta del frontend construye esa URL usando la dirección base de la API. Si no hay ruta o el archivo no carga, la tarjeta muestra un reemplazo con la inicial del producto.

Para comprobar una imagen, inicia el backend y abre su URL directamente en el navegador, por ejemplo `http://localhost:3000/images/camisa-oxford-azul.webp`. Si no carga, revisa que el nombre y la extensión coincidan con el archivo en la carpeta.

El frontend toma la URL base de `VITE_API_URL`. En la carpeta `frontend`, copia `.env.example` a `.env` para desarrollo local. Si el backend está en otra computadora o servidor, cambia esa variable por su URL accesible desde el navegador; `localhost` solo funciona en el mismo equipo que ejecuta el backend.
