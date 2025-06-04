// Adicione no início do arquivo:
import { getFilmes } from '../../services/filmesService';
import { getSalas } from '../../services/salasService';
import { getSessoes} from '../../services/sessoesService';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/ListaSessoes.css';

const ListaSessoes = () => {
  const [sessoes, setSessoes] = useState([]);
  const [filmes, setFilmes] = useState([]);
  const [salas, setSalas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let isMounted = true;  // Flag para verificar se o componente ainda está montado

    const carregarDados = async () => {
      try {
        const [sessoesData, filmesData, salasData] = await Promise.all([
          getSessoes(),
          getFilmes(),
          getSalas()
        ]);
        
        if (isMounted) {  // Só atualiza o estado se o componente ainda estiver montado
          setSessoes(sessoesData);
          setFilmes(filmesData);
          setSalas(salasData);
        }
      } catch (error) {
        if (isMounted) console.error('Erro ao carregar sessões:', error);
      } finally {
        if (isMounted) setCarregando(false);
      }
    };
    
    carregarDados();

    return () => {
      isMounted = false;  // Quando o componente desmontar, isMounted = false
    };
  }, []);

  const getFilmeById = (id) => filmes.find(filme => filme.id === id);
  const getSalaById = (id) => salas.find(sala => sala.id === id);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Sessões Disponíveis</h2>
            <Link to="/sessoes" className="btn btn-primary">
              Nova Sessão
            </Link>
          </div>
          
          {carregando ? (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              <p className="mt-2">Carregando sessões...</p>
            </div>
          ) : sessoes.length === 0 ? (
            <div className="alert alert-info text-center">
              Nenhuma sessão cadastrada
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Filme</th>
                    <th>Sala</th>
                    <th>Data e Hora</th>
                    <th>Preço</th>
                    <th>Idioma</th>
                    <th>Formato</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {sessoes.map((sessao) => {
                    const filme = getFilmeById(sessao.filmeId);
                    const sala = getSalaById(sessao.salaId);
                    
                    if (!filme || !sala) return null;
                    
                    return (
                      <tr key={sessao.id}>
                        <td>{filme.titulo} ({filme.classificacao})</td>
                        <td>{sala.nome} ({sala.tipo})</td>
                        <td>{new Date(sessao.dataHora).toLocaleString()}</td>
                        <td>R$ {sessao.preco.toFixed(2)}</td>
                        <td>{sessao.idioma}</td>
                        <td>{sessao.formato}</td>
                        <td className="table-actions">
                          <Link 
                            to={`/ingressos?sessao=${sessao.id}`} 
                            className="btn btn-sm btn-success"
                          >
                            Comprar Ingresso
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListaSessoes;