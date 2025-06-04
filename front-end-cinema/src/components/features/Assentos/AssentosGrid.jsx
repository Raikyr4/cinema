import React from 'react';
import PropTypes from 'prop-types';
import Assento from './Assento';
import '../../../assets/styles/components/Assentos.css'; // Importando o CSS para estilização

const AssentosGrid = ({ capacidade, assentosOcupados, assentoSelecionado, onSelectAssento }) => {
  const gerarAssentos = () => {
    const assentos = [];
    const fileiras = Math.ceil(capacidade / 10);
    
    for (let f = 0; f < fileiras; f++) {
      for (let a = 1; a <= 10; a++) {
        const numeroAssento = f * 10 + a;
        if (numeroAssento > capacidade) break;
        
        const letraFileira = String.fromCharCode(65 + f);
        const codigoAssento = `${letraFileira}${a}`;
        
        assentos.push({
          codigo: codigoAssento,
          ocupado: assentosOcupados.includes(codigoAssento),
          selecionado: assentoSelecionado === codigoAssento
        });
      }
    }
    
    return assentos;
  };

  const assentos = gerarAssentos();

  return (
    <div className="assentos-container">
      <div className="tela mb-3">TELA</div>
      <div className="assentos-grid">
        {assentos.map((assento) => (
          <Assento
            key={assento.codigo}
            codigo={assento.codigo}
            ocupado={assento.ocupado}
            selecionado={assento.selecionado}
            onSelect={onSelectAssento}
          />
        ))}
      </div>
    </div>
  );
};

AssentosGrid.propTypes = {
  capacidade: PropTypes.number.isRequired,
  assentosOcupados: PropTypes.arrayOf(PropTypes.string),
  assentoSelecionado: PropTypes.string,
  onSelectAssento: PropTypes.func.isRequired
};

AssentosGrid.defaultProps = {
  assentosOcupados: []
};

export default AssentosGrid;