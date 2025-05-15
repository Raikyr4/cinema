import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { salvarFilme } from '../../services/filmesService';
import FormInput from '../../components/common/ui/FormInput';
import Button from '../../components/common/ui/Button';
import './CadastroFilme.css';

const CadastroFilme = () => {
  const navigate = useNavigate();
  const [filme, setFilme] = useState({
    titulo: '',
    descricao: '',
    genero: '',
    classificacao: '',
    duracao: '',
    dataEstreia: ''
  });

  const generos = [
    { value: '', label: 'Selecione um gênero', disabled: true },
    { value: 'Ação', label: 'Ação' },
    { value: 'Aventura', label: 'Aventura' },
    { value: 'Comédia', label: 'Comédia' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Ficção Científica', label: 'Ficção Científica' },
    { value: 'Terror', label: 'Terror' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Animação', label: 'Animação' }
  ];

  const classificacoes = [
    { value: '', label: 'Selecione uma classificação', disabled: true },
    { value: 'L', label: 'Livre' },
    { value: '10', label: '10 anos' },
    { value: '12', label: '12 anos' },
    { value: '14', label: '14 anos' },
    { value: '16', label: '16 anos' },
    { value: '18', label: '18 anos' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilme({ ...filme, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await salvarFilme({
        ...filme,
        duracao: parseInt(filme.duracao)
      });
      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar filme:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h2 className="mb-4">Cadastro de Filmes</h2>
          <form onSubmit={handleSubmit} className="form-card">
            <FormInput
              label="Título"
              name="titulo"
              value={filme.titulo}
              onChange={handleChange}
              required
            />
            
            <FormInput
              label="Descrição"
              type="textarea"
              name="descricao"
              value={filme.descricao}
              onChange={handleChange}
              required
            />
            
            <FormInput
              label="Gênero"
              type="select"
              name="genero"
              value={filme.genero}
              onChange={handleChange}
              options={generos}
              required
            />
            
            <FormInput
              label="Classificação Indicativa"
              type="select"
              name="classificacao"
              value={filme.classificacao}
              onChange={handleChange}
              options={classificacoes}
              required
            />
            
            <FormInput
              label="Duração (minutos)"
              type="number"
              name="duracao"
              value={filme.duracao}
              onChange={handleChange}
              min="1"
              max="999"
              required
            />
            
            <FormInput
              label="Data de Estreia"
              type="date"
              name="dataEstreia"
              value={filme.dataEstreia}
              onChange={handleChange}
              required
            />
            
            <div className="form-actions">
              <Button type="submit" variant="primary">
                Salvar Filme
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroFilme;