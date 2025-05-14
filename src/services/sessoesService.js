import api from './api';
import { getFilmeById } from './filmesService';
import { getSalaById } from './salasService';

const SESSOES_KEY = 'sessoes';

export const getSessoes = () => api.get(SESSOES_KEY);

export const getSessaoById = (id) => {
  const sessoes = getSessoes();
  return sessoes.find(sessao => sessao.id === id);
};

export const getSessoesComDetalhes = async () => {
  const sessoes = getSessoes();
  
  return Promise.all(sessoes.map(async (sessao) => {
    const [filme, sala] = await Promise.all([
      getFilmeById(sessao.filmeId),
      getSalaById(sessao.salaId)
    ]);
    
    return {
      ...sessao,
      filme: filme || { titulo: 'Filme não encontrado' },
      sala: sala || { nome: 'Sala não encontrada' }
    };
  }));
};

export const salvarSessao = (sessao) => {
  if (!sessao.filmeId || !sessao.salaId || !sessao.dataHora) {
    throw new Error('Filme, sala e data/hora são obrigatórios');
  }

  if (sessao.id) {
    return api.put(SESSOES_KEY, sessao.id, sessao);
  } else {
    const novaSessao = {
      ...sessao,
      id: Date.now().toString(),
      preco: parseFloat(sessao.preco) || 30.00,
      createdAt: new Date().toISOString()
    };
    return api.post(SESSOES_KEY, novaSessao);
  }
};

export const excluirSessao = (id) => api.delete(SESSOES_KEY, id);