const express = require('express');
const app = express();
const PORT = 3000;

// middleware para interpretar json
app.use(express.json());

// banco de dados fake
let eventos = [
  { id: 1, atracao: 'bananas de pijama', horario: '14:00' },
  { id: 2, atracao: 'furacao runner', horario: '05:00' },
  { id: 3, atracao: 'show do fofao', horario: '19:00' },
]; 

let nextId = 4;

// iniciando a rota
app.get('/', (req, res) => {
  res.send('teste da api de gestao de eventos!');
});

// sobre o gestor de eventos
app.get('/sobre', (req, res) => {
  res.send("esse é nosso gestor de eventos");
});

// eventos
app.get('/api/eventos', (req, res) => {
  res.json(eventos);
});

// cadastrando novo evento
app.post('/api/eventos', (req, res) => {
  const { atracao, horario } = req.body;

  if (!atracao || horario === undefined) {
    return res.status(400).json({ message: 'atração e horario são obrigátorios.' });
  }

  const novoEvento = { id: nextId++, atracao, horario };
  eventos.push(novoEvento);

  res.status(201).json(novoEvento);
});

// subindo o server
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Para parar o servidor, pressione Ctrl + C no terminal`);
});