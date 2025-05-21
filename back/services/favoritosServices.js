 const Favorito = require('../models/favorito');

exports.salvarFavorito = async (dados) => {
  const novoFavorito = new Favorito(dados);
  return await novoFavorito.save();
};

exports.buscarFavoritos = async () => {
  return await Favorito.find();
};
exports.removerFavorito = async (id) => {
  await Favorito.findByIdAndDelete(id);
};

exports.atualizarFavorito = async (id, dadosAtualizados) => {
  return await Favorito.findByIdAndUpdate(id, dadosAtualizados, { new: true, runValidators: true });
};
