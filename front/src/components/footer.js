 // src/components/Footer.js
import React from 'react';
import styled from 'styled-components';

const Rodape = styled.footer`
  background-color: #1a1a1a; /* Cor de fundo escura, a mesma do header e cards */
  color: #888; /* Cor do texto mais suave para um visual moderno */
  padding: 1.5rem; /* Mais padding para um visual mais espaçoso */
  text-align: center;
  font-size: 0.95rem; /* Levemente maior para melhor legibilidade */
  border-top: 1px solid #333; /* Uma linha sutil na parte superior para separar do conteúdo */
  margin-top: 40px; /* Adiciona um espaço acima do footer, afastando-o do último elemento da página */

  /* Remover position: fixed para que o footer fique no final do conteúdo */
  /* Isso garante que ele não cubra conteúdo ou fique flutuando de forma estranha */
  /* Se a página for curta, ele naturalmente ficará na parte inferior visível. */
  /* Se a página for longa, ele aparecerá ao final da rolagem. */
`;

const Footer = () => {
  return (
    <Rodape>
      © {new Date().getFullYear()} Cineverso. Todos os direitos reservados.
    </Rodape>
  );
};

export default Footer;