 // services/api.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
console.log('API Key loaded in api.js:', API_KEY ? 'Loaded' : 'NOT Loaded');
if (!API_KEY) {
  console.error('ERRO: API Key não carregada. Verifique seu arquivo .env e o nome da variável.');
}

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
});

// --- Funções para gerenciar favoritos (usando localStorage para simular um "backend") ---

export const listarFavoritos = () => {
  console.log('listarFavoritos called.');
  try {
    const favoritos = JSON.parse(localStorage.getItem('@primeflix')) || [];
    console.log('Favoritos carregados do localStorage:', favoritos);
    return favoritos;
  } catch (e) {
    console.error('Erro ao listar favoritos do localStorage:', e);
    return [];
  }
};

export const adicionarFavorito = (filme) => {
  console.log('adicionarFavorito called. Filme:', filme);
  let favoritos = listarFavoritos();
  const temFilme = favoritos.some((filmeSalvo) => filmeSalvo.tmdb_id === filme.tmdb_id);

  if (temFilme) {
    console.warn('Filme já está na lista de favoritos.');
    return { success: false, message: 'Filme já está na lista de favoritos.' };
  }

  favoritos.push(filme);
  localStorage.setItem('@primeflix', JSON.stringify(favoritos));
  console.log('Filme adicionado aos favoritos:', filme);
  return { success: true, message: 'Filme salvo com sucesso!' };
};

export const deletarFavorito = (tmdb_id) => {
  console.log('deletarFavorito called. TMDB ID:', tmdb_id);
  let favoritos = listarFavoritos();
  const favoritosAtualizados = favoritos.filter((item) => item.tmdb_id !== tmdb_id);

  if (favoritos.length === favoritosAtualizados.length) {
    console.warn('Filme não encontrado na lista de favoritos para exclusão.');
    return { success: false, message: 'Filme não encontrado na lista de favoritos.' };
  }

  localStorage.setItem('@primeflix', JSON.stringify(favoritosAtualizados));
  console.log('Filme removido dos favoritos. TMDB ID:', tmdb_id);
  return { success: true, message: 'Filme removido com sucesso!' };
};

// --- Funções de comunicação com a API do TMDB ---

export const buscarFilmesPopulares = async (page = 1) => {
  console.log('buscarFilmesPopulares called. Page:', page);
  try {
    const response = await api.get('/movie/popular', { params: { page } });
    console.log('API Response data (popular):', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar filmes populares na API:', error);
    if (error.response) {
      console.error('Detalhes do erro da API:', error.response.data);
      console.error('Status do erro da API:', error.response.status);
    }
    throw error;
  }
};

export const buscarGeneros = async () => {
  console.log('buscarGeneros called.');
  try {
    const response = await api.get('/genre/movie/list');
    console.log('API Response data (genres):', response.data);
    return response.data.genres;
  } catch (error) {
    console.error('Erro ao buscar gêneros na API:', error);
    if (error.response) {
      console.error('Detalhes do erro da API (generos):', error.response.data);
    }
    throw error;
  }
};

export const buscarFilmesPorGenero = async (genreId, page = 1) => {
  console.log('buscarFilmesPorGenero called. GenreId:', genreId, 'Page:', page);
  try {
    const response = await api.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
      },
    });
    console.log('API Response data (by genre):', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar filmes por gênero na API:', error);
    if (error.response) {
      console.error('Detalhes do erro da API (genero):', error.response.data);
    }
    throw error;
  }
};

export const buscarFilmesPorCategoria = async (category, page = 1) => {
  console.log('buscarFilmesPorCategoria called. Category:', category, 'Page:', page);
  try {
    const response = await api.get(`/movie/${category}`, { params: { page } });
    console.log(`API Response data (${category}):`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar filmes por categoria (${category}) na API:`, error);
    if (error.response) {
      console.error('Detalhes do erro da API (categoria):', error.response.data);
    }
    throw error;
  }
};

export const buscarFilmes = async (query, page = 1) => {
  console.log('buscarFilmes (search) called. Query:', query, 'Page:', page);
  try {
    const response = await api.get('/search/movie', {
      params: {
        query,
        page,
      },
    });
    console.log('API Response data (search):', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar filmes por termo de busca na API:', error);
    if (error.response) {
      console.error('Detalhes do erro da API (search):', error.response.data);
    }
    throw error;
  }
};

export const buscarDetalhesFilme = async (id) => {
  console.log('buscarDetalhesFilme called. ID:', id);
  try {
    const response = await api.get(`/movie/${id}`);
    console.log('API Response data (details):', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar detalhes do filme na API:', error);
    if (error.response) {
      console.error('Detalhes do erro da API (detalhes):', error.response.data);
    }
    throw error;
  }
};