 // controllers/favoritosController.js
const favoritosService = require('../services/favoritosServices');

exports.criarFavorito = async (req, res) => {
  try {
    const { titulo, descricao, nota, tmdbId, poster_path } = req.body; // Pega todos os dados necessários

    // Validação de backend para os campos obrigatórios
    if (!tmdbId || !titulo || typeof nota === 'undefined' || nota === null || nota < 0 || nota > 5) {
      return res.status(400).json({ error: 'Dados obrigatórios ausentes ou nota inválida. Título, ID do TMDB e nota (0-5) são necessários.' });
    }

    const dadosFavorito = {
      titulo,
      descricao, // descricao pode ser nulo/undefined, pois required: false no Schema
      nota,
      tmdbId,
      poster_path
    };

    const resultado = await favoritosService.salvarFavorito(dadosFavorito);
    res.status(201).json(resultado); // Retorna 201 Created com o favorito salvo
  } catch (error) {
    // Erro de duplicidade do MongoDB (código 11000)
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Este filme já está nos seus favoritos.' });
    }
    console.error("Erro no controlador ao salvar favorito:", error);
    res.status(500).json({ error: 'Erro interno do servidor ao salvar favorito.' }); // Erro 500 para outros erros do servidor
  }
};

exports.listarFavoritos = async (req, res) => {
  try {
    const favoritos = await favoritosService.buscarFavoritos();
    res.json(favoritos);
  } catch (error) {
    console.error("Erro no controlador ao listar favoritos:", error);
    res.status(500).json({ error: 'Erro interno do servidor ao buscar favoritos.' });
  }
};

exports.deletarFavorito = async (req, res) => {
  try {
    const id = req.params.id;
    await favoritosService.removerFavorito(id);
    res.status(204).send(); // 204 No Content, sucesso sem resposta de corpo
  } catch (error) {
    console.error("Erro no controlador ao deletar favorito:", error);
    res.status(500).json({ error: 'Erro interno do servidor ao deletar favorito.' });
  }
};

exports.atualizarFavorito = async (req, res) => {
  try {
    const id = req.params.id;
    const dadosAtualizados = req.body;
    const favoritoAtualizado = await favoritosService.atualizarFavorito(id, dadosAtualizados);
    res.json(favoritoAtualizado);
  } catch (error) {
    console.error("Erro no controlador ao atualizar favorito:", error);
    res.status(500).json({ error: 'Erro interno do servidor ao atualizar favorito.' });
  }
};