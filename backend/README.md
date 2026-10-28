# Bastion Backend

API REST de Bastion construida con Node.js, Express y PostgreSQL (Supabase).

## Requisitos

- Node.js LTS instalado en la laptop. Comprueba la instalación con `node --version` y `npm --version`.
- Acceso a Internet y una base de datos PostgreSQL de Bastion en Supabase.
- Git, si vas a descargar el proyecto desde GitHub.

## Instalación en Windows

Instala Node.js LTS y Git. Abre PowerShell donde quieras guardar el proyecto y clona el repositorio:

```powershell
git clone https://github.com/crismarchan/Bastion.git
cd Bastion\backend
npm ci
Copy-Item .env.example .env
```

`npm ci` instala las dependencias guardadas en `package-lock.json`. `Copy-Item` crea la configuración local. Pon las credenciales reales solo en `.env`; no las guardes en `.env.example` ni las compartas.

## Configurar la base de datos

Abre `backend/.env` y configura `DATABASE_URL` con la URI de conexión de tu propio proyecto Supabase. Puedes obtenerla en Supabase, en **Project Settings > Database > Connection string**. No compartas esa URI: contiene credenciales. Mantén `.env` fuera de Git.

La aplicación espera que las tablas y los datos ya existan en Supabase. Si todavía no están creados, ejecuta una sola vez `db/schema.sql` y después `db/seed.sql` en el SQL Editor de ese proyecto. No vuelvas a ejecutar el esquema sobre una base que ya tiene las tablas.

## Iniciar y detener el servidor

Desde la carpeta `backend`, ejecuta:

```powershell
npm run dev
```

Cuando aparezca `Servidor escuchando en http://localhost:3000`, el backend está listo. Déjalo abierto mientras pruebas en Postman. Para detenerlo, vuelve a esa terminal y presiona `Ctrl+C`. `npm run dev` reinicia el servidor al guardar cambios.

## Probar en Postman

Usa `http://localhost:3000` como base URL. La otra laptop necesita ejecutar su propia copia del backend; `localhost` siempre significa “esta misma laptop”.

| Método | URL | Resultado |
|---|---|---|
| GET | `http://localhost:3000/` | Mensaje para confirmar que la API responde |
| GET | `http://localhost:3000/api/health` | Comprueba la conexión a la base de datos |
| GET | `http://localhost:3000/api/products` | Lista todos los productos |
| GET | `http://localhost:3000/api/products/paginated?limit=10&offset=0` | Lista una página de productos |
| POST | `http://localhost:3000/api/products` | Crea un producto |
| PUT | `http://localhost:3000/api/products/1` | Actualiza el producto con ID 1 |
| DELETE | `http://localhost:3000/api/products/1` | Elimina el producto con ID 1 |

Para `POST` y `PUT`, selecciona **Body > raw > JSON** y envía un cuerpo como este. Los IDs de categoría y marca deben existir en la base:

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

Las rutas de escritura todavía no tienen autenticación y no deben exponerse públicamente. No uses `DELETE` con un ID real que quieras conservar.



## Estructura principal

- `src/app.js`: configura Express, conecta rutas e inicia el servidor.
- `src/routes/`: asigna URLs y métodos HTTP a controladores.
- `src/controllers/`: coordina la solicitud y la respuesta.
- `src/models/`: consulta PostgreSQL mediante SQL.
- `src/config/db.js`: crea el pool de conexiones usando `DATABASE_URL`.
- `db/schema.sql` y `db/seed.sql`: definen y preparan las tablas y datos iniciales.
