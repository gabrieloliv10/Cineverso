 // pages/favoritos.js
import React, { useState, useEffect } from 'react';
import { listarFavoritos, deletarFavorito } from '../services/api';
import styled from 'styled-components';

// --- Styled Components ---

const FavoritosContainer = styled.div`
  padding: 40px 20px;
  background-color: #141414;
  min-height: 100vh;
  color: #e0e0e0;
`;

const TituloPagina = styled.h1`
  text-align: center;
  color: #e50914;
  margin-bottom: 40px;
  font-size: 2.8em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const ListaFavoritos = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const CardFilme = styled.div`
  background-color: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
  }
`;

const PosterFilme = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-bottom: 1px solid #333;
`;

const DetalhesCard = styled.div`
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const TituloFilmeCard = styled.h3`
  color: #e0e0e0;
  font-size: 1.3em;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NotaFilmeCard = styled.p`
  color: gold;
  font-size: 1.1em;
  margin-bottom: 10px;
`;

const DescricaoFilmeCard = styled.p`
  color: #ccc;
  font-size: 0.9em;
  line-height: 1.5;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BotaoRemover = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.95em;
  margin-top: auto;
  transition: background-color 0.2s ease;
  width: calc(100% - 30px);
  margin: 15px;

  &:hover {
    background-color: #c82333;
  }
`;

const MensagemVazio = styled.p`
  text-align: center;
  color: #aaa;
  font-size: 1.5em;
  margin-top: 50px;
`;

// --- Componente React ---

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFavoritos = async () => {
    try {
      setLoading(true);
      const data = listarFavoritos();
      setFavoritos(data);
    } catch (err) {
      setError('Erro ao carregar filmes favoritos. Tente novamente mais tarde.');
      console.error('Erro ao buscar favoritos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoritos();
  }, []);

  const handleRemoverFavorito = (id) => {
    if (window.confirm('Tem certeza que deseja remover este filme dos favoritos?')) {
      try {
        const response = deletarFavorito(id);
        if (response.success) {
          alert('Filme removido dos favoritos!');
          fetchFavoritos();
        } else {
          alert(response.message);
        }
      } catch (err) {
        alert('Erro ao remover filme dos favoritos.');
        console.error('Erro ao remover favorito:', err);
      }
    }
  };

  if (loading) return <p>Carregando seus filmes favoritos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <FavoritosContainer>
      <TituloPagina>Meus Filmes Favoritos</TituloPagina>
      {favoritos.length === 0 ? (
        <MensagemVazio>Você ainda não tem filmes favoritos. Adicione alguns!</MensagemVazio>
      ) : (
        <ListaFavoritos>
          {favoritos.map((fav) => (
            <CardFilme key={fav.tmdb_id || fav.id}>
              <PosterFilme
                src={fav.poster_path ? `https://image.tmdb.org/t/p/w500${fav.poster_path}` : 'https://via.placeholder.com/500x750?text=Sem+Imagem'}
                alt={fav.titulo}
              />
              <DetalhesCard>
                <TituloFilmeCard>{fav.titulo}</TituloFilmeCard> {/* CORRIGIDO AQUI! */}
                <NotaFilmeCard>Nota: {fav.nota} / 10 &#9733;</NotaFilmeCard>
                {fav.descricao && <DescricaoFilmeCard>{fav.descricao}</DescricaoFilmeCard>}
                <BotaoRemover onClick={() => handleRemoverFavorito(fav.tmdb_id || fav.id)}>
                  Remover
                </BotaoRemover>
              </DetalhesCard>
            </CardFilme>
          ))}
        </ListaFavoritos>
      )}
    </FavoritosContainer>
  );
}