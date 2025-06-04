// Adicione no início do arquivo:
import { getFilmes } from '../../services/filmesService';
import { getSalas } from '../../services/salasService';
import { salvarSessao } from '../../services/sessoesService';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/common/ui/FormInput';
import Button from '../../components/common/ui/Button';
import '../Filmes/CadastroFilme.css';

const CadastroSessao = () => {
  const navigate = useNavigate();
  const [sessao, setSessao] = useState({
    filmeId: '',
    salaId: '',
    dataHora: '',
    preco: '00.00',
    idioma: '',
    formato: ''
  });

  const [filmes, setFilmes] = useState([]);
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      setFilmes(await getFilmes());
      setSalas(await getSalas());
    };
    carregarDados();
  }, []);

  const idiomas = [
    { value: '', label: 'Selecione um idioma', disabled: true },
    { value: 'Dublado', label: 'Dublado' },
    { value: 'Legendado', label: 'Legendado' }
  ];

  const formatos = [
    { value: '', label: 'Selecione um formato', disabled: true },
    { value: '2D', label: '2D' },
    { value: '3D', label: '3D' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSessao({ ...sessao, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await salvarSessao({
        ...sessao,
        preco: parseFloat(sessao.preco)
      });
      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar sessão:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h2 className="mb-4">Cadastro de Sessões</h2>
          <form onSubmit={handleSubmit} className="form-card">
            <FormInput
              label="Filme"
              type="select"
              name="filmeId"
              value={sessao.filmeId}
              onChange={handleChange}
              options={[
                { value: '', label: filmes.length ? 'Selecione um filme' : 'Carregando filmes...', disabled: true },
                ...filmes.map(filme => ({
                  value: filme.id,
                  label: `${filme.titulo} (${filme.classificacao})`
                }))
              ]}
              required
            />
            
            <FormInput
              label="Sala"
              type="select"
              name="salaId"
              value={sessao.salaId}
              onChange={handleChange}
              options={[
                { value: '', label: salas.length ? 'Selecione uma sala' : 'Carregando salas...', disabled: true },
                ...salas.map(sala => ({
                  value: sala.id,
                  label: `${sala.nome} (${sala.tipo}, ${sala.capacidade} lugares)`
                }))
              ]}
              required
            />
            
            <FormInput
              label="Data e Hora"
              type="datetime-local"
              name="dataHora"
              value={sessao.dataHora}
              onChange={handleChange}
              required
            />
            
            <FormInput
              label="Preço (R$)"
              type="number"
              name="preco"
              value={sessao.preco}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
            
            <FormInput
              label="Idioma"
              type="select"
              name="idioma"
              value={sessao.idioma}
              onChange={handleChange}
              options={idiomas}
              required
            />
            
            <FormInput
              label="Formato"
              type="select"
              name="formato"
              value={sessao.formato}
              onChange={handleChange}
              options={formatos}
              required
            />
            
            <div className="form-actions">
              <Button type="submit" variant="primary">
                Salvar Sessão
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroSessao;