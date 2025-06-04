// api.js - Camada genérica para operações com a API backend
const API_BASE_URL = 'http://localhost:3001'; // Altere se sua API estiver em outro endereço

const api = {
  // GET (listar todos)
  get: async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`);
      if (!response.ok) throw new Error('Erro na requisição');
      return await response.json();
    } catch (error) {
      console.error(`Erro ao buscar ${endpoint}:`, error);
      return [];
    }
  },

  // GET by ID (buscar um específico)
  getById: async (endpoint, id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`);
      if (!response.ok) throw new Error('Erro na requisição');
      return await response.json();
    } catch (error) {
      console.error(`Erro ao buscar ${endpoint} com ID ${id}:`, error);
      return null;
    }
  },

  // POST (criar)
  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro na criação');
      return await response.json();
    } catch (error) {
      console.error(`Erro ao criar ${endpoint}:`, error);
      throw error;
    }
  },

  // PUT/PATCH (atualizar)
  put: async (endpoint, id, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
        method: 'PATCH', // ou 'PUT' dependendo da sua API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro na atualização');
      return await response.json();
    } catch (error) {
      console.error(`Erro ao atualizar ${endpoint} com ID ${id}:`, error);
      throw error;
    }
  },

  // DELETE (remover)
  delete: async (endpoint, id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar');
      return id;
    } catch (error) {
      console.error(`Erro ao deletar ${endpoint} com ID ${id}:`, error);
      throw error;
    }
  }
};

export default api;