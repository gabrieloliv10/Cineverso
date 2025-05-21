// src/components/FilmeCard.js
import styled from 'styled-components';

const Card = styled.div`
  background-color: #1E1E1E;
  border-radius: 10px;
  padding: 16px;
  margin: 12px;
  width: 200px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const Titulo = styled.h3`
  font-size: 16px;
  margin-top: 10px;
`;

export default function FilmeCard({ titulo, imagem }) {
  return (
    <Card>
      <Poster src={imagem} alt={titulo} />
      <Titulo>{titulo}</Titulo>
    </Card>
  );
}
