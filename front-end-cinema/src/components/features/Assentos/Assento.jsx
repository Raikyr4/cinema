import React from 'react';
import PropTypes from 'prop-types';

const Assento = ({ codigo, ocupado, selecionado, onSelect }) => {
  const handleClick = () => {
    if (!ocupado && onSelect) {
      onSelect(codigo);
    }
  };

  const getClasseAssento = () => {
    if (ocupado) return 'assento-ocupado';
    if (selecionado) return 'assento-selecionado';
    return 'assento-livre';
  };

  return (
    <div
      className={`assento ${getClasseAssento()}`}
      onClick={handleClick}
      aria-label={`Assento ${codigo} ${ocupado ? 'ocupado' : selecionado ? 'selecionado' : 'disponível'}`}
    >
      {codigo}
    </div>
  );
};

Assento.propTypes = {
  codigo: PropTypes.string.isRequired,
  ocupado: PropTypes.bool,
  selecionado: PropTypes.bool,
  onSelect: PropTypes.func
};

export default Assento;