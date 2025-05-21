 // index.js (Backend - Sem alterações significativas, apenas verificação)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB Atlas com sucesso!'))
.catch((error) => console.error('Erro ao conectar no MongoDB:', error));

const favoritosRoutes = require('./routes/favoritos');
app.use('/favoritos', favoritosRoutes);

const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Rotas de filmes da TMDB (mantidas como no último exemplo)
app.get('/filmes/populares', async (req, res) => { /* ... */ });
app.get('/filmes/categoria/:categoria', async (req, res) => { /* ... */ });
app.get('/generos', async (req, res) => { /* ... */ });
app.get('/filmes/genero/:generoId', async (req, res) => { /* ... */ });
app.get('/filmes/buscar', async (req, res) => { /* ... */ });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});