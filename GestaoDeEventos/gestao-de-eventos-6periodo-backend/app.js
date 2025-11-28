const express = require('express');
const app = express();

app.use(express.json());

// Array em memória para armazenar os eventos
let eventos = [
  {
    id: 1,
    titulo: 'Feira de Tecnologia',
    descricao: 'Evento sobre novas tecnologias.',
    organizador: 'Ana',
    num_participantes: 100
  }
];

// GET /api/eventos
app.get('/api/eventos', (req, res) => {
  res.json(eventos);
});

// POST /api/eventos
app.post('/api/eventos', (req, res) => {
  const novoEvento = {
    id: eventos.length + 1,
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    organizador: req.body.organizador,
    num_participantes: req.body.num_participantes
  };
  eventos.push(novoEvento);
  res.status(201).json(novoEvento);
});

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
});
