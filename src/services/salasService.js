import api from './api';

const SALAS_KEY = 'salas';

export const getSalas = () => api.get(SALAS_KEY);

export const getSalaById = (id) => {
  const salas = getSalas();
  return salas.find(sala => sala.id === id);
};

export const salvarSala = (sala) => {
  if (!sala.nome || !sala.tipo) {
    throw new Error('Nome e tipo são obrigatórios');
  }
  const novaSala = {
    ...sala,
    id: Date.now().toString(),
    capacidade: sala.capacidade || 50,
    createdAt: new Date().toISOString()
  };
  return api.post(SALAS_KEY, novaSala);
};

export const excluirSala = (id) => api.delete(SALAS_KEY, id);