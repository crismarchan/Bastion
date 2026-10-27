import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Bastion API viva');
});

app.get('/api/health', (req, res) => {
  res.json({ 
    ok: true, 
    service: 'bastion-api' 
  });
});

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
