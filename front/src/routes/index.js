 import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Favoritos from '../pages/favoritos';
import DetalhesFilme from '../pages/detalhesFilmes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favoritos" element={<Favoritos />} />
      <Route path="/detalhes/:id" element={<DetalhesFilme />} />
    </Routes>
  );
};

export default AppRoutes;
