const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para receber JSON
app.use(express.json());

// Banco de dados simulado em memória
let produtos = [
  { id: 1, nome: 'Teclado Mecânico', preco: 450.00 },
  { id: 2, nome: 'Mouse Gamer', preco: 150.00 },
  { id: 3, nome: 'Monitor UltraWide', preco: 1200.00 }
];
let nextId = 4;

// Rota raiz
app.get('/', (req, res) => {
  res.send('Bem-vindo à nossa primeira API Back-End com Express!');
});

// Rota sobre
app.get('/sobre', (req, res) => {
  res.send('Esta é a página "Sobre" da nossa aplicação.');
});

// Listar todos os produtos
app.get('/api/produtos', (req, res) => {
  res.json(produtos);
});

// Buscar produto por ID
app.get('/api/produtos/:id', (req, res) => {
  const idProduto = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === idProduto);
  if (!produto) {
    return res.status(404).json({ message: 'Produto não encontrado.' });
  }
  res.json(produto);
});

// Criar produto
app.post('/api/produtos', (req, res) => {
  const { nome, preco } = req.body;
  if (!nome || preco === undefined) {
    return res.status(400).json({ message: 'Nome e preço são obrigatórios.' });
  }
  const novoProduto = { id: nextId++, nome, preco };
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

// Atualizar produto por ID
app.put('/api/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === id);
  if (!produto) {
    return res.status(404).json({ message: 'Produto não encontrado para atualização.' });
  }
  const { nome, preco } = req.body;
  if (!nome && preco === undefined) {
    return res.status(400).json({ message: 'Pelo menos nome ou preço deve ser enviado.' });
  }
  if (nome !== undefined) produto.nome = nome;
  if (preco !== undefined) produto.preco = preco;
  res.json(produto);
});

// Remover produto por ID
app.delete('/api/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Produto não encontrado para exclusão.' });
  }
  produtos.splice(index, 1);
  res.status(204).send();
});

// Inicia servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Para parar o servidor, pressione Ctrl+C.');
});
