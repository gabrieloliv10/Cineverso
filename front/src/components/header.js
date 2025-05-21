 // src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #1a1a1a; /* Um tom escuro que combina com os cards de filme */
  padding: 1.2rem 2rem; /* Mais padding para um visual mais espaçoso */
  display: flex;
  justify-content: center; /* Centraliza os links de navegação */
  align-items: center;
  gap: 2.5rem; /* Aumenta o espaçamento entre os links */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); /* Sombra para dar profundidade */
  position: sticky; /* Fixa o header no topo */
  top: 0;
  z-index: 1000; /* Garante que fique acima de outros elementos */
  border-bottom: 1px solid #333; /* Uma linha sutil na parte inferior */
`;

const StyledLink = styled(Link)`
  color: #e0e0e0; /* Cor do texto mais clara para contraste */
  text-decoration: none;
  font-size: 1.2em; /* Tamanho da fonte um pouco maior */
  font-weight: 500;
  transition: color 0.3s ease, transform 0.2s ease; /* Transição mais suave */
  position: relative; /* Para o efeito de sublinhado */

  &:hover {
    color: #ffda47; /* Cor de destaque ao passar o mouse (amarelo/dourado) */
    transform: translateY(-2px); /* Pequeno movimento para cima */
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px; /* Posição do sublinhado */
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffda47; /* Cor do sublinhado */
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%; /* Expande o sublinhado ao passar o mouse */
  }
`;

const Header = () => (
  <Nav>
    <StyledLink to="/">Início</StyledLink>
    <StyledLink to="/favoritos">Favoritos</StyledLink>
  </Nav>
);

export default Header;