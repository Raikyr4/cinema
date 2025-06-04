import api from './api';
import { getSessaoById } from './sessoesService';

const INGRESSOS_KEY = 'ingressos';

export const getIngressos = async () => {
  try {
    return await api.get(INGRESSOS_KEY);
  } catch (error) {
    console.error('Erro ao buscar ingressos:', error);
    return [];
  }
};

export const getIngressoById = async (id) => {
  try {
    return await api.getById(INGRESSOS_KEY, id);
  } catch (error) {
    console.error(`Erro ao buscar ingresso com ID ${id}:`, error);
    return null;
  }
};

export const getIngressosPorSessao = async (sessaoId) => {
  try {
    const ingressos = await getIngressos();
    return ingressos.filter(ingresso => ingresso.sessaoId === sessaoId);
  } catch (error) {
    console.error(`Erro ao buscar ingressos da sessão ${sessaoId}:`, error);
    return [];
  }
};

export const getAssentosOcupados = async (sessaoId) => {
  try {
    const ingressos = await getIngressosPorSessao(sessaoId);
    return ingressos.map(ingresso => ingresso.assento);
  } catch (error) {
    console.error(`Erro ao buscar assentos ocupados da sessão ${sessaoId}:`, error);
    return [];
  }
};

export const salvarIngresso = async (ingresso) => {
  if (!ingresso.sessaoId || !ingresso.nomeCliente || !ingresso.assento) {
    throw new Error('Sessão, nome do cliente e assento são obrigatórios');
  }

  try {
    // Verifica se a sessão existe
    const sessao = await getSessaoById(ingresso.sessaoId);
    if (!sessao) {
      throw new Error('Sessão não encontrada');
    }

    // Remove campos que devem ser gerados pelo backend
    const { id, dataVenda, ...ingressoParaEnviar } = ingresso;

    // Formata os dados
    const ingressoFormatado = {
      ...ingressoParaEnviar,
      preco: sessao.preco,
      dataVenda: new Date().toISOString()
    };

    return await api.post(INGRESSOS_KEY, ingressoFormatado);
  } catch (error) {
    console.error('Erro ao salvar ingresso:', error);
    throw error;
  }
};

export const excluirIngresso = async (id) => {
  try {
    return await api.delete(INGRESSOS_KEY, id);
  } catch (error) {
    console.error(`Erro ao excluir ingresso com ID ${id}:`, error);
    throw error;
  }
};