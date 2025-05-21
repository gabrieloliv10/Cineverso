 // models/Favorito.js
const mongoose = require('mongoose');

const favoritoSchema = new mongoose.Schema({
  tmdb_id: { // O ID do filme na TMDB, crucial para identificação única
    type: Number,
    required: true,
    unique: true // Garante que não haverá favoritos duplicados pelo ID do TMDB
  },
  titulo: {
    type: String,
    required: true
  },
  poster_path: {
    type: String,
    required: false // Pode ser opcional se nem todo filme tiver pôster
  },
  descricao: {
    type: String,
    required: false
  },
  nota: {
    type: String, // Ou Number, dependendo como você armazena. String para "N/A" é ok.
    required: false
  },
  // Você pode adicionar outros campos se desejar, como data de adição, etc.
  dataAdicao: {
    type: Date,
    default: Date.now // Adiciona automaticamente a data de criação
  }
});

module.exports = mongoose.model('Favorito', favoritoSchema);