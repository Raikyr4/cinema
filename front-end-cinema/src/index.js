import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Inicializar dados de exemplo se localStorage estiver vazio
if (!localStorage.getItem('filmes')) {
  localStorage.setItem('filmes', JSON.stringify([]));
  localStorage.setItem('salas', JSON.stringify([]));
  localStorage.setItem('sessoes', JSON.stringify([]));
  localStorage.setItem('ingressos', JSON.stringify([]));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);