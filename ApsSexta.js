const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para processar requisições com corpo em JSON.
app.use(express.json());

// Nosso "banco de dados" em memória para simular dados.
let programas = [
  { id: 1, titulo: 'Jornal da Manhã', horario: '08:00' },
  { id: 2, titulo: 'Desenhos Animados', horario: '10:00' },
  { id: 3, titulo: 'Novela das 9', horario: '21:00' }
];
let nextId = 4; // Para gerar IDs únicos para novos programas

// Rota GET para a URL raiz
app.get('/', (req, res) => {
  res.send('Bem-vindo à API do Canal de TV!');
});

// Rota GET para a URL '/sobre'
app.get('/sobre', (req, res) => {
  res.send('Esta é a API do nosso Canal de TV, onde você encontra a programação.');
});

// Rota GET para listar todos os programas
app.get('/api/programas', (req, res) => {
  res.json(programas);
});

// Rota GET para buscar um programa específico por ID
app.get('/api/programas/:id', (req, res) => {
  const idPrograma = parseInt(req.params.id);
  const programaEncontrado = programas.find(p => p.id === idPrograma);

  if (programaEncontrado) {
    res.json(programaEncontrado);
  } else {
    res.status(404).send('Programa não encontrado.');
  }
});

// Rota POST para criar um novo programa
app.post('/api/programas', (req, res) => {
  const { titulo, horario } = req.body;

  if (!titulo || !horario) {
    return res.status(400).json({ message: 'Título e horário são obrigatórios.' });
  }

  const novoPrograma = {
    id: nextId++,
    titulo,
    horario
  };

  programas.push(novoPrograma);
  res.status(201).json(novoPrograma);
});

// Rota PUT para atualizar um programa existente por ID
app.put('/api/programas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const programaIndex = programas.findIndex(p => p.id === id);

  if (programaIndex !== -1) {
    const { titulo, horario } = req.body;

    if (!titulo && !horario) {
      return res.status(400).json({ message: 'Pelo menos um campo (título ou horário) deve ser fornecido para atualização.' });
    }

    programas[programaIndex] = {
      ...programas[programaIndex],
      titulo: titulo !== undefined ? titulo : programas[programaIndex].titulo,
      horario: horario !== undefined ? horario : programas[programaIndex].horario
    };

    res.json(programas[programaIndex]);
  } else {
    res.status(404).json({ message: 'Programa não encontrado para atualização.' });
  }
});

// Rota DELETE para excluir um programa por ID
app.delete('/api/programas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = programas.length;

  programas = programas.filter(p => p.id !== id);

  if (programas.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Programa não encontrado para exclusão.' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Para parar o servidor, pressione Ctrl+C no terminal.');
});
