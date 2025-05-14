// api.js - Camada genérica para operações no localStorage
const api = {
  get: (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Erro ao ler ${key} do localStorage:`, error);
      return [];
    }
  },

  post: (key, value) => {
    const currentData = api.get(key);
    const newData = [...currentData, value];
    localStorage.setItem(key, JSON.stringify(newData));
    return value;
  },

  put: (key, id, value) => {
    const currentData = api.get(key);
    const updatedData = currentData.map(item => item.id === id ? value : item);
    localStorage.setItem(key, JSON.stringify(updatedData));
    return value;
  },

  delete: (key, id) => {
    const currentData = api.get(key);
    const filteredData = currentData.filter(item => item.id !== id);
    localStorage.setItem(key, JSON.stringify(filteredData));
    return id;
  }
};

export default api;