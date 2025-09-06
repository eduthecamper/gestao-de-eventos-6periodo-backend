const express = require('express');
const app = express();
const PORT = 3000;

// interpretador de Json.
app.use(express.json());

// banco falso/teste.
let Programas = [
  { id: 1, Show: 'corrida maluca', horario: '10:00' },
  { id: 2, Show: 'Tom e Jerry', horario: '12:00' },
  { id: 3, Show: 'Ozzy e as baratas tontas', horario: '15:00' },
]; 

let nextId = 4;

// começo de rota
app.get('/', (req, res) => {
  res.send('teste da api de gestao de eventos!');
});

// gestor de Programas
app.get('/sobre', (req, res) => {
  res.send("esse é nosso gestor de eventos");
});

// Programas
app.get('/api/programas', (req, res) => {
  res.json(Programas);
});

// adicionar novos shows
app.post('/api/programas', (req, res) => {
  const { Show, horario } = req.body;

  if (!Show || horario === undefined) {
    return res.status(400).json({ message: 'É obrigatorio definir horario e Show.' });
  }

  const novoEvento = { id: nextId++, Show, horario };
  Programas.push(novoEvento);

  res.status(201).json(novoEvento);
});

// upando no servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Para parar o servidor, pressione Ctrl + C no terminal');
});
