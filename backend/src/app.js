import express from 'express';
import { fileURLToPath } from 'node:url';
import { query } from './config/db.js';
import productRoutes from './routes/product.routes.js';
import cors from 'cors'


const app = express();

app.use(express.json());

app.use(cors())
app.use('/images', express.static(fileURLToPath(new URL('../public/images/', import.meta.url))));

app.get('/', (req, res) => {
  res.send('Bastion API viva');
});

app.get('/api/health', async (req, res) => {
  try {
    await query('SELECT 1');
    res.json({ 
      ok: true, 
      service: 'bastion-api',
      db: true
    });
  } catch (error) {
    res.status(503).json({ 
      ok: false, 
      service: 'bastion-api',
      db: false,
      error: error.message
    });
  }
});

app.use('/api/products', productRoutes);


app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
