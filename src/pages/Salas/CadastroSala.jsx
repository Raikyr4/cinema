import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { salvarSala } from '../../services/salasService';
import FormInput from '../../components/common/ui/FormInput';
import Button from '../../components/common/ui/Button';
import '../Filmes/CadastroFilme.css';

const CadastroSala = () => {
  const navigate = useNavigate();
  const [sala, setSala] = useState({
    nome: '',
    tipo: '',
    capacidade: 50
  });

  const tiposSala = [
    { value: '', label: 'Selecione um tipo', disabled: true },
    { value: '2D', label: '2D' },
    { value: '3D', label: '3D' },
    { value: 'IMAX', label: 'IMAX' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSala({ ...sala, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await salvarSala({
        ...sala,
        id: Date.now().toString(),
        capacidade: parseInt(sala.capacidade)
      });
      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar sala:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h2 className="mb-4">Cadastro de Salas</h2>
          <form onSubmit={handleSubmit} className="form-card">
            <FormInput
              label="Nome da Sala"
              name="nome"
              value={sala.nome}
              onChange={handleChange}
              required
            />
            
            <FormInput
              label="Tipo"
              type="select"
              name="tipo"
              value={sala.tipo}
              onChange={handleChange}
              options={tiposSala}
              required
            />
            
            <FormInput
              label="Capacidade"
              type="number"
              name="capacidade"
              value={sala.capacidade}
              onChange={handleChange}
              min="1"
              required
            />
            
            <div className="form-actions">
              <Button type="submit" variant="primary">
                Salvar Sala
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroSala;