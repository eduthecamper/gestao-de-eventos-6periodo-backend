app.get('/api/eventos', (req, res) => {
  res.json(eventos);
});

// GET evento por id (público)
app.get('/api/eventos/:id', (req, res) => {
  const evento = eventos.find(ev => ev.id === parseInt(req.params.id));
  if (!evento) return res.status(404).json({ error: 'Evento não encontrado' });
  res.json(evento);
});

// POST criar evento (autenticado)
app.post('/api/eventos', authenticateToken, (req, res) => {
  const { nome, data, localizacao, descricao, participantes } = req.body;
  if (!nome || !data || !localizacao) return res.status(400).json({ error: 'Campos obrigatórios: nome, data, localizacao' });

  const novoEvento = {
    id: eventos.length + 1,
    nome,
    data,
    localizacao,
    descricao: descricao || '',
    participantes: participantes || [],
    organizadorId: req.user.id,
  };
  eventos.push(novoEvento);
  res.status(201).json(novoEvento);
});

// PUT atualizar evento (autenticado + autorizado)
app.put('/api/eventos/:id', authenticateToken, authorizeEventoChange, (req, res) => {
  const { nome, data, localizacao, descricao, participantes } = req.body;

  if (nome) req.evento.nome = nome;
  if (data) req.evento.data = data;
  if (localizacao) req.evento.localizacao = localizacao;
  if (descricao !== undefined) req.evento.descricao = descricao;
  if (participantes !== undefined) req.evento.participantes = participantes;

  res.json(req.evento);
});

// DELETE evento (autenticado + autorizado)
app.delete('/api/eventos/:id', authenticateToken, authorizeEventoChange, (req, res) => {
  eventos = eventos.filter(ev => ev.id !== req.evento.id);
  res.json({ message: 'Evento deletado com sucesso' });
});

// Iniciar servidor
app.listen(port, () => {
  console.log("Servidor rodando na porta ${port}");
});