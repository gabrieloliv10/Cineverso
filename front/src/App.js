import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home'; // Arquivo: home.js
import Favoritos from './pages/favoritos'; // Arquivo: favoritos.js
import DetalhesFilme from './pages/detalhesFilmes'; // Arquivo: detalhesFilmes.js (camelCase)
import Header from './components/header'; // <-- CORRIGIDO: nome do arquivo é header.js
import Footer from './components/footer'; // <-- CORRIGIDO: nome do arquivo é footer.js

function App() {
  return (
    <Router>
      {/* O nome do COMPONENTE (Header, Footer) ainda usa PascalCase,
          mas a IMPORTAÇÃO do caminho do arquivo usa o nome do arquivo (header, footer). */}
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/filme/:id" element={<DetalhesFilme />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;