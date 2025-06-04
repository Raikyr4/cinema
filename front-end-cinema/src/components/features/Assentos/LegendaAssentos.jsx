const LegendaAssentos = () => {
  return (
    <div className="legenda">
      <div className="legenda-item">
        <div className="assento assento-livre"></div>
        <span>Disponível</span>
      </div>
      <div className="legenda-item">
        <div className="assento assento-ocupado"></div>
        <span>Ocupado</span>
      </div>
      <div className="legenda-item">
        <div className="assento assento-selecionado-legenda"></div>
        <span>Selecionado</span>
      </div>
    </div>
  );
};

export default LegendaAssentos;