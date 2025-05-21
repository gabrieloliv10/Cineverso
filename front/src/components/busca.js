import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 8px 12px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export default function Busca({ onChangeBusca }) {
  const [valor, setValor] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onChangeBusca(valor);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [valor, onChangeBusca]);

  return (
    <Input
      type="text"
      placeholder="Busque um filme..."
      value={valor}
      onChange={e => setValor(e.target.value)}
    />
  );
}
