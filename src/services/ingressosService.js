import api from './api';
import { getSessaoById } from './sessoesService';

const INGRESSOS_KEY = 'ingressos';

export const getIngressos = () => api.get(INGRESSOS_KEY);

export const getIngressoById = (id) => {
  const ingressos = getIngressos();
  return ingressos.find(ingresso => ingresso.id === id);
};

export const getIngressosPorSessao = (sessaoId) => {
  const ingressos = getIngressos();
  return ingressos.filter(ingresso => ingresso.sessaoId === sessaoId);
};

export const getAssentosOcupados = async (sessaoId) => {
  const ingressos = getIngressosPorSessao(sessaoId);
  return ingressos.map(ingresso => ingresso.assento);
};

export const salvarIngresso = async (ingresso) => {
  if (!ingresso.sessaoId || !ingresso.nomeCliente || !ingresso.assento) {
    throw new Error('Sessão, nome do cliente e assento são obrigatórios');
  }

  // Verifica se a sessão existe
  const sessao = await getSessaoById(ingresso.sessaoId);
  if (!sessao) {
    throw new Error('Sessão não encontrada');
  }

  const novoIngresso = {
    ...ingresso,
    id: Date.now().toString(),
    dataVenda: new Date().toISOString(),
    preco: sessao.preco
  };

  return api.post(INGRESSOS_KEY, novoIngresso);
};

export const excluirIngresso = (id) => api.delete(INGRESSOS_KEY, id);