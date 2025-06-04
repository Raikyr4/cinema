import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar/Navbar';
import Footer from './components/common/Footer/Footer';
import HomePage from './pages/Home/HomePage';
import CadastroFilme from './pages/Filmes/CadastroFilme';
import CadastroSala from './pages/Salas/CadastroSala';
import CadastroSessao from './pages/Sessoes/CadastroSessao';
import ListaSessoes from './pages/Sessoes/ListaSessoes';
import VendaIngresso from './pages/Ingressos/VendaIngresso';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/styles/App.css';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 py-4">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/filmes" element={<CadastroFilme />} />
              <Route path="/salas" element={<CadastroSala />} />
              <Route path="/sessoes" element={<CadastroSessao />} />
              <Route path="/sessoes-disponiveis" element={<ListaSessoes />} />
              <Route path="/ingressos" element={<VendaIngresso />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;