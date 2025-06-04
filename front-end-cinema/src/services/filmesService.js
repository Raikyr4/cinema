import api from './api';

const FILMES_KEY = 'filmes';

export const getFilmes = async () => {
  try {
    return await api.get(FILMES_KEY);
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return [];
  }
};

export const getFilmeById = async (id) => {
  try {
    return await api.getById(FILMES_KEY, id);
  } catch (error) {
    console.error(`Erro ao buscar filme com ID ${id}:`, error);
    return null;
  }
};

export const salvarFilme = async (filme) => {
  if (!filme.titulo || !filme.descricao) {
    throw new Error('Título e descrição são obrigatórios');
  }
  
  // Remove campos que devem ser gerados pelo backend
  const { id, createdAt, ...filmeParaEnviar } = filme;
  
  // Converte tipos se necessário
  const filmeFormatado = {
    ...filmeParaEnviar,
    duracao: parseInt(filmeParaEnviar.duracao) || 0,
    dataEstreia: new Date(filmeParaEnviar.dataEstreia).toISOString()
  };

  try {
    return await api.post(FILMES_KEY, filmeFormatado);
  } catch (error) {
    console.error('Erro ao salvar filme:', error);
    throw error;
  }
};

export const excluirFilme = async (id) => {
  try {
    return await api.delete(FILMES_KEY, id);
  } catch (error) {
    console.error(`Erro ao excluir filme com ID ${id}:`, error);
    throw error;
  }
};