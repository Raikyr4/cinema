import api from './api';

const FILMES_KEY = 'filmes';

export const getFilmes = () => api.get(FILMES_KEY);

export const getFilmeById = (id) => {
  const filmes = getFilmes();
  return filmes.find(filme => filme.id === id);
};

export const salvarFilme = (filme) => {
  debugger;
  if (!filme.titulo || !filme.descricao) {
    throw new Error('Título e descrição são obrigatórios');
  }
  const novoFilme = { 
    ...filme, 
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  return api.post(FILMES_KEY, novoFilme);
};

export const excluirFilme = (id) => api.delete(FILMES_KEY, id);