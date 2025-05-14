import api from './api';

const FILMES_KEY = 'filmes';

export const getFilmes = () => api.get(FILMES_KEY);

export const getFilmeById = (id) => {
  const filmes = getFilmes();
  return filmes.find(filme => filme.id === id);
};

export const salvarFilme = (filme) => {
  if (!filme.titulo || !filme.descricao) {
    throw new Error('Título e descrição são obrigatórios');
  }

  if (filme.id) {
    return api.put(FILMES_KEY, filme.id, filme);
  } else {
    const novoFilme = { 
      ...filme, 
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    return api.post(FILMES_KEY, novoFilme);
  }
};

export const excluirFilme = (id) => api.delete(FILMES_KEY, id);

// Inicialização (opcional)
if (!localStorage.getItem(FILMES_KEY)) {
  api.post(FILMES_KEY, {
    id: '1',
    titulo: 'Interestelar',
    descricao: 'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço.',
    genero: 'Ficção Científica',
    classificacao: '12',
    duracao: 169,
    dataEstreia: '2014-11-06',
    createdAt: new Date().toISOString()
  });
}