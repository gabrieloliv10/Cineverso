 // pages/detalhesFilmes.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { adicionarFavorito, listarFavoritos } from '../services/api';

import NoPosterImage from '../assets/no-poster.png';

// --- Styled Components ---

const DetalhesFilmeContainer = styled.div`
  background-color: #0c0c0c;
  min-height: 100vh;
  padding: 40px 20px;
  color: #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilmeContent = styled.div`
  background-color: #1a1a1a;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  padding: 30px;
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
    align-items: flex-start;
  }
`;

const PosterDetalhes = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  margin-bottom: 25px;

  @media (min-width: 768px) {
    margin-right: 30px;
    margin-bottom: 0;
  }
`;

const InfoDetalhes = styled.div`
  flex: 1;
`;

const TituloDetalhes = styled.h2`
  color: #e50914;
  font-size: 2.5em;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
`;

const SinopseDetalhes = styled.p`
  color: #ccc;
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const DataLancamento = styled.p`
  color: #aaa;
  font-size: 1em;
  margin-bottom: 20px;
`;

const BotaoFavoritar = styled.button`
  background-color: ${props => (props.$favoritado ? '#555' : '#28a745')};
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 5px;
  cursor: ${props => (props.$favoritado ? 'not-allowed' : 'pointer')};
  font-size: 1.1em;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 15px;

  &:hover {
    background-color: ${props => (props.$favoritado ? '#555' : '#218838')};
    transform: ${props => (props.$favoritado ? 'none' : 'translateY(-2px)')};
  }
`;

const Message = styled.p`
  text-align: center;
  color: #f8d7da;
  background-color: #721c24;
  border: 1px solid #f5c6cb;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 20px;
`;

// --- Componente React ---

export default function DetalhesFilme() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [userRating, setUserRating] = useState('');

  useEffect(() => {
    const fetchFilmeDetalhes = async () => {
      try {
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: TMDB_API_KEY,
            language: 'pt-BR'
          }
        });
        setFilme(response.data);

        const favoritosExistentes = listarFavoritos();
        const jaFavoritado = favoritosExistentes.some(fav => fav.tmdb_id === response.data.id);
        setIsFavorited(jaFavoritado);

      } catch (err) {
        setError('Erro ao carregar detalhes do filme. Tente novamente mais tarde.');
        console.error('Erro ao buscar detalhes do filme:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmeDetalhes();
  }, [id]);

  const handleAdicionarFavorito = async () => {
    if (!filme) return;

    try {
      const filmeParaFavoritar = {
        titulo: filme.title,
        poster_path: filme.poster_path,
        descricao: filme.overview,
        nota: filme.vote_average ? filme.vote_average.toFixed(1) : 'N/A',
        tmdb_id: filme.id,
      };

      const response = adicionarFavorito(filmeParaFavoritar);
      console.log('Resultado ao adicionar aos favoritos:', response);
      if (response.success) {
        alert(response.message);
        setIsFavorited(true);
      } else {
        alert(response.message);
      }
    } catch (err) {
      console.error('Erro ao adicionar filme aos favoritos:', err);
      alert('Erro ao adicionar filme aos favoritos. Por favor, tente novamente ou verifique o console para mais detalhes.');
    }
  };

  const handleRateMovie = () => {
    const rating = parseFloat(userRating);
    if (rating >= 1 && rating <= 10) {
      alert(`Você avaliou "${filme.title}" com ${rating} estrelas!`); // MENSAGEM CURTA AQUI!
    } else {
      alert('Por favor, insira uma nota entre 1 e 10.');
    }
  };

  if (loading) {
    return <Message>Carregando detalhes do filme...</Message>;
  }

  if (error) {
    return <Message>{error}</Message>;
  }

  if (!filme) {
    return <Message>Filme não encontrado.</Message>;
  }

  return (
    <DetalhesFilmeContainer>
      <FilmeContent>
        <PosterDetalhes
          src={filme.poster_path ? `https://image.tmdb.org/t/p/w500${filme.poster_path}` : NoPosterImage}
          alt={filme.title}
        />
        <InfoDetalhes>
          <TituloDetalhes>{filme.title}</TituloDetalhes>
          <SinopseDetalhes>{filme.overview || 'Sinopse não disponível.'}</SinopseDetalhes>
          <DataLancamento>
            Data de Lançamento: {filme.release_date ? new Date(filme.release_date).toLocaleDateString('pt-BR') : 'N/A'}
          </DataLancamento>
          <DataLancamento>
            Nota TMDB: {filme.vote_average ? filme.vote_average.toFixed(1) : 'N/A'} / 10
          </DataLancamento>

          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <label htmlFor="userRating" style={{ display: 'block', marginBottom: '10px', fontSize: '1.1em', color: '#e0e0e0' }}>
              Sua Avaliação (1-10):
            </label>
            <input
              type="number"
              id="userRating"
              min="1"
              max="10"
              value={userRating}
              onChange={(e) => setUserRating(e.target.value)}
              style={{
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #555',
                backgroundColor: '#333',
                color: '#e0e0e0',
                width: '100px',
                textAlign: 'center'
              }}
            />
            <button
              onClick={handleRateMovie}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1em',
                marginLeft: '10px',
                transition: 'background-color 0.3s ease'
              }}
            >
              Avaliar
            </button>
          </div>

          <BotaoFavoritar onClick={handleAdicionarFavorito} $favoritado={isFavorited}>
            {isFavorited ? 'Já Favoritado' : 'Adicionar aos Favoritos'}
          </BotaoFavoritar>
        </InfoDetalhes>
      </FilmeContent>
    </DetalhesFilmeContainer>
  );
}