 // routes/favoritos.js (Backend - Verificação da rota POST)
const express = require('express');
const router = express.Router();
const Favorito = require('../models/Favorito'); // Caminho correto para o modelo

// Rota para listar todos os favoritos
router.get('/', async (req, res) => {
  try {
    const favoritos = await Favorito.find();
    res.json(favoritos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para adicionar um novo favorito
router.post('/', async (req, res) => {
  const { titulo, poster_path, descricao, nota, tmdb_id } = req.body;

  // Validação básica para garantir que campos essenciais existem
  if (!titulo || tmdb_id === undefined || tmdb_id === null) {
      return res.status(400).json({ message: "Título e ID do TMDB são obrigatórios para favoritar." });
  }

  const favorito = new Favorito({
    titulo,
    poster_path,
    descricao,
    nota,
    tmdb_id // Inclui o tmdb_id
  });

  try {
    const novoFavorito = await favorito.save();
    res.status(201).json(novoFavorito);
  } catch (err) {
    if (err.code === 11000) { // Erro de chave duplicada (por exemplo, tmdb_id único)
      return res.status(409).json({ message: "Este filme já está nos seus favoritos." });
    }
    // Log detalhado do erro de validação do Mongoose
    if (err.name === 'ValidationError') {
        let errors = {};
        Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message;
        });
        return res.status(400).json({ message: "Erro de validação", errors });
    }
    console.error("Erro ao salvar favorito:", err); // Para depuração no servidor
    res.status(400).json({ message: err.message }); // Retorna 400 para erros de validação gerais
  }
});

// Rota para deletar um favorito
router.delete('/:id', async (req, res) => {
  try {
    const favorito = await Favorito.findById(req.params.id);
    if (!favorito) {
      return res.status(404).json({ message: 'Favorito não encontrado' });
    }
    await favorito.deleteOne(); // Alterado para deleteOne()
    res.json({ message: 'Favorito deletado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para atualizar um favorito (opcional, pode ser simplificada)
router.put('/:id', async (req, res) => {
  try {
    const { titulo, poster_path, descricao, nota, tmdb_id } = req.body;
    const favoritoAtualizado = await Favorito.findByIdAndUpdate(
      req.params.id,
      { titulo, poster_path, descricao, nota, tmdb_id },
      { new: true, runValidators: true } // Retorna o documento atualizado e executa validadores
    );
    if (!favoritoAtualizado) {
      return res.status(404).json({ message: 'Favorito não encontrado' });
    }
    res.json(favoritoAtualizado);
  } catch (err) {
    if (err.name === 'ValidationError') {
        let errors = {};
        Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message;
        });
        return res.status(400).json({ message: "Erro de validação", errors });
    }
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;