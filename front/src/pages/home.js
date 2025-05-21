 // pages/home.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  buscarFilmesPopulares,
  buscarGeneros,
  buscarFilmesPorGenero,
  buscarFilmesPorCategoria,
  buscarFilmes
} from '../services/api';

import NoPosterImage from '../assets/no-poster.png';

// --- Styled Components ---
const HomePageContainer = styled.div`
  background-color: #0c0c0c;
  min-height: 100vh;
  padding: 20px;
  color: #e0e0e0;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  padding-top: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: #c0c0c0;
  font-size: 2.2em;
  font-weight: 600;
  margin: 0;
`;

const Icon = styled.span`
  font-size: 2.3em;
  color: #ffda47;
  line-height: 1;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 12px 20px;
  border-radius: 25px;
  border: 1px solid #333;
  background-color: #222;
  color: #e0e0e0;
  font-size: 1.1em;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;

  &::placeholder {
    color: #888;
  }
`;

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
`;

const FilterButton = styled.button`
  background-color: ${props => (props.$ativo ? '#006db2' : '#333')};
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.95em;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${props => (props.$ativo ? '#005a96' : '#555')};
    transform: translateY(-2px);
  }
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 25px;
  max-width: 1200px;
  margin: 0 auto;
`;

const MovieCard = styled.div`
  background-color: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 270px;
  object-fit: cover;
  border-bottom: 1px solid #222;
`;

const MovieTitle = styled.h3`
  color: #e0e0e0;
  font-size: 1.1em;
  padding: 10px 15px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

const Message = styled.p`
  text-align: center;
  color: #aaa;
  font-size: 1.2em;
  margin-top: 50px;
`;

// --- Componente principal ---

export default function Home() {
  const [filmes, setFilmes] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('popular');
  const [activeGenreId, setActiveGenreId] = useState(null);

  const navigate = useNavigate();
  const observer = useRef();

  console.log('Home Component Rendered. Filmes count:', filmes.length, 'Loading:', loading, 'Error:', error);

  const fetchMovies = useCallback(async (category, genreId = null, query = '', page = 1, append = false) => {
    setError(null);
    try {
      let data;
      if (query) {
        data = await buscarFilmes(query, page);
      } else if (genreId) {
        data = await buscarFilmesPorGenero(genreId, page);
      } else if (category === 'popular') {
        data = await buscarFilmesPopulares(page);
      } else {
        data = await buscarFilmesPorCategoria(category, page);
      }

      setFilmes(append ? (prevFilmes => [...prevFilmes, ...data.results]) : data.results);

      console.log('setFilmes called. New Movies data length:', data.results.length, 'New Movies data:', data.results);

      setTotalPages(data.total_pages);
      setCurrentPage(data.page);
    } catch (err) {
      setError('Erro ao carregar filmes. Tente novamente.');
      console.error('Erro ao buscar filmes:', err);
      setFilmes([]);
    } finally {
      setLoading(false);
      console.log('fetchMovies finished. Loading set to false.');
    }
  }, []);

  useEffect(() => {
    console.log('useEffect (initial fetch) triggered.');
    fetchMovies('popular', null, '', 1, false);
  }, []);

  useEffect(() => {
    const fetchGenerosList = async () => {
      try {
        const data = await buscarGeneros();
        setGeneros(data);
        console.log('Generos loaded:', data);
      } catch (err) {
        console.error('Erro ao buscar lista de gêneros:', err);
      }
    };
    fetchGenerosList();
  }, []);

  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && currentPage < totalPages) {
        console.log('IntersectionObserver triggered, loading more movies.');
        setCurrentPage(prevPage => prevPage + 1);
      }
    }, { threshold: 0.5 });

    if (node) observer.current.observe(node);
  }, [loading, currentPage, totalPages]);

  useEffect(() => {
    if (currentPage > 1) {
      console.log('useEffect (currentPage > 1) triggered. Loading page:', currentPage);
      if (searchTerm) {
        fetchMovies('', null, searchTerm, currentPage, true);
      } else if (activeGenreId) {
        fetchMovies('genre', activeGenreId, '', currentPage, true);
      } else {
        fetchMovies(activeCategory, null, '', currentPage, true);
      }
    }
  }, [currentPage, activeCategory, activeGenreId, searchTerm, fetchMovies]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    setCurrentPage(1);
    setActiveCategory('');
    setActiveGenreId(null);
    setFilmes([]);
    setLoading(true);
    console.log('handleSearch triggered. Query:', query);
    if (query.length > 2) {
      fetchMovies('', null, query, 1, false);
    } else if (query.length === 0) {
      setActiveCategory('popular');
      fetchMovies('popular', null, '', 1, false);
    }
  };

  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
    setActiveGenreId(null);
    setSearchTerm('');
    setCurrentPage(1);
    setFilmes([]);
    setLoading(true);
    console.log('handleCategoryFilter triggered. Category:', category);
    fetchMovies(category, null, '', 1, false);
  };

  const handleGenreFilter = (genreId) => {
    setActiveGenreId(genreId);
    setActiveCategory('genre');
    setSearchTerm('');
    setFilmes([]);
    setCurrentPage(1);
    setLoading(true);
    console.log('handleGenreFilter triggered. Genre ID:', genreId);
    fetchMovies('genre', genreId, '', 1, false);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/filme/${movieId}`);
  };

  return (
    <HomePageContainer>
      <Header>
        <TitleContainer>
          <Title>Cineverso</Title>
          <Icon>🍿</Icon>
        </TitleContainer>
        <SearchInput
          type="text"
          placeholder="Buscar filmes..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <FilterSection>
          <FilterButton $ativo={activeCategory === 'popular' && !searchTerm && activeGenreId === null} onClick={() => handleCategoryFilter('popular')}>
            Populares
          </FilterButton>
          <FilterButton $ativo={activeCategory === 'top_rated' && !searchTerm && activeGenreId === null} onClick={() => handleCategoryFilter('top_rated')}>
            Top Avaliados
          </FilterButton>
          <FilterButton $ativo={activeCategory === 'now_playing' && !searchTerm && activeGenreId === null} onClick={() => handleCategoryFilter('now_playing')}>
            Em Cartaz
          </FilterButton>
          <FilterButton $ativo={activeCategory === 'upcoming' && !searchTerm && activeGenreId === null} onClick={() => handleCategoryFilter('upcoming')}>
            Próximos Lançamentos
          </FilterButton>
          {generos.map(genre => (
            <FilterButton
              key={genre.id}
              $ativo={activeGenreId === genre.id}
              onClick={() => handleGenreFilter(genre.id)}
            >
              {genre.name}
            </FilterButton>
          ))}
        </FilterSection>
      </Header>

      {error && <Message>{error}</Message>}
      {loading && filmes.length === 0 && <Message>Carregando filmes...</Message>}
      {!loading && filmes.length === 0 && !error && <Message>Nenhum filme encontrado.</Message>}

      <MoviesGrid>
        {filmes.map((filme, index) => {
          console.log('Attempting to render movie:', filme);
          const isLastElement = filmes.length === index + 1;
          return (
            <MovieCard ref={isLastElement ? lastMovieElementRef : null} key={filme.id} onClick={() => handleMovieClick(filme.id)}>
              <MoviePoster
                src={filme.poster_path ? `https://image.tmdb.org/t/p/w500${filme.poster_path}` : NoPosterImage}
                alt={filme.title}
              />
              <MovieTitle>{filme.title}</MovieTitle>
            </MovieCard>
          );
        })}
      </MoviesGrid>
      {loading && filmes.length > 0 && currentPage < totalPages && <Message>Carregando mais filmes...</Message>}
    </HomePageContainer>
  );
}