import React, { useState, useEffect } from 'react';
import { getFilmes } from '../../services/filmesService';
import { getSalas } from '../../services/salasService';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSessoes } from '../../services/sessoesService';
import { salvarIngresso, getIngressosPorSessao } from '../../services/ingressosService';
import FormInput from '../../components/common/ui/FormInput';
import Button from '../../components/common/ui/Button';
import AssentosGrid from '../../components/features/Assentos/AssentosGrid';
import LegendaAssentos from '../../components/features/Assentos/LegendaAssentos';
import SessaoInfoCard from '../../components/features/Sessoes/SessaoInfoCard';
import './VendaIngresso.css';

const VendaIngresso = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessaoIdParam = queryParams.get('sessao');

  const [sessoes, setSessoes] = useState([]);
  const [filmes, setFilmes] = useState([]);
  const [salas, setSalas] = useState([]);
  const [ingresso, setIngresso] = useState({
    sessaoId: sessaoIdParam || '',
    nomeCliente: '',
    cpf: '',
    assento: '',
    pagamento: ''
  });
  const [assentosOcupados, setAssentosOcupados] = useState([]);
  const [capacidadeSala, setCapacidadeSala] = useState(0);
  const [carregando, setCarregando] = useState(true);

  const carregarAssentosOcupados = async (sessaoId) => {
    try {
      const ingressos = await getIngressosPorSessao(sessaoId);
      setAssentosOcupados(ingressos.map(i => i.assento));
      
      // Encontra a sessão e a sala correspondente
      const sessao = sessoes.find(s => s.id === sessaoId);
      if (sessao) {
        const sala = salas.find(s => s.id === sessao.salaId);
        if (sala) {
          setCapacidadeSala(sala.capacidade);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar assentos:', error);
    }
  };

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [sessoesData, filmesData, salasData] = await Promise.all([
          getSessoes(),
          getFilmes(),
          getSalas()
        ]);
        
        setSessoes(sessoesData);
        setFilmes(filmesData);
        setSalas(salasData);
        
        // Agora que temos os dados carregados, podemos carregar os assentos
        if (sessaoIdParam) {
          // Encontra a sessão e a sala para definir a capacidade inicial
          const sessao = sessoesData.find(s => s.id === sessaoIdParam);
          if (sessao) {
            const sala = salasData.find(s => s.id === sessao.salaId);
            if (sala) {
              setCapacidadeSala(sala.capacidade);
            }
          }
          
          await carregarAssentosOcupados(sessaoIdParam);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setCarregando(false);
      }
    };
    
    carregarDados();
  }, [sessaoIdParam]);

  const handleSelectAssento = (assento) => {
    setIngresso(prev => ({ ...prev, assento }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIngresso(prev => ({ ...prev, [name]: value }));
    
    if (name === 'sessaoId' && value) {
      carregarAssentosOcupados(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!ingresso.assento) {
        alert('Por favor, selecione um assento!');
        return;
      }
      
      await salvarIngresso({
        ...ingresso,
        dataVenda: new Date().toISOString()
      });
      
      alert('Ingresso vendido com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao vender ingresso:', error);
      alert('Erro ao vender ingresso: ' + error.message);
    }
  };

  const getSessaoSelecionada = () => sessoes.find(s => s.id === ingresso.sessaoId);
  const getFilmeDaSessao = () => {
    const sessao = getSessaoSelecionada();
    return sessao ? filmes.find(f => f.id === sessao.filmeId) : null;
  };
  const getSalaDaSessao = () => {
    const sessao = getSessaoSelecionada();
    return sessao ? salas.find(s => s.id === sessao.salaId) : null;
  };

  const metodosPagamento = [
    { value: '', label: 'Selecione um tipo', disabled: true },
    { value: 'Cartão', label: 'Cartão' },
    { value: 'Pix', label: 'Pix' },
    { value: 'Dinheiro', label: 'Dinheiro' }
  ];

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h2 className="mb-3">Venda de Ingressos</h2>
          
          {carregando ? (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form-card">
              <FormInput
                label="Sessão"
                type="select"
                name="sessaoId"
                value={ingresso.sessaoId}
                onChange={handleChange}
                options={[
                  { value: '', label: 'Selecione uma sessão', disabled: true },
                  ...sessoes.map(sessao => {
                    const filme = filmes.find(f => f.id === sessao.filmeId);
                    const sala = salas.find(s => s.id === sessao.salaId);
                    return filme && sala ? {
                      value: sessao.id,
                      label: `${filme.titulo} - ${sala.nome} - ${new Date(sessao.dataHora).toLocaleString()}`
                    } : null;
                  }).filter(Boolean)
                ]}
                required
              />
              
              {ingresso.sessaoId && (
                <>
                  <SessaoInfoCard
                    filme={getFilmeDaSessao()}
                    sala={getSalaDaSessao()}
                    sessao={getSessaoSelecionada()}
                  />
                  
                  <FormInput
                    label="Nome do Cliente"
                    name="nomeCliente"
                    value={ingresso.nomeCliente}
                    onChange={handleChange}
                    required
                  />
                  
                  <FormInput
                    label="CPF"
                    name="cpf"
                    value={ingresso.cpf}
                    onChange={handleChange}
                    required
                    pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                    placeholder="000.000.000-00"
                  />
                  
                  <div className="mb-3">
                    <label className="form-label">Selecione o Assento</label>
                    {capacidadeSala > 0 ? (
                      <>
                        <AssentosGrid
                          capacidade={capacidadeSala}
                          assentosOcupados={assentosOcupados}
                          assentoSelecionado={ingresso.assento}
                          onSelectAssento={handleSelectAssento}
                        />
                        <LegendaAssentos />
                      </>
                    ) : (
                      <p>Carregando assentos...</p>
                    )}
                    <input
                      type="hidden"
                      name="assento"
                      value={ingresso.assento}
                      required
                    />
                  </div>
                  
                  <FormInput
                    label="Método de Pagamento"
                    type="select"
                    name="pagamento"
                    value={ingresso.pagamento}
                    onChange={handleChange}
                    options={metodosPagamento}
                    required
                  />
                </>
              )}
              
              <div className="form-actions mt-4">
                <Button 
                  type="submit" 
                  variant="success" 
                  disabled={!ingresso.assento || !ingresso.pagamento}
                >
                  Confirmar Venda
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendaIngresso;