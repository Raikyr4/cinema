import PropTypes from 'prop-types';

const SessaoInfoCard = ({ filme, sala, sessao }) => {
  if (!filme || !sala || !sessao) return null;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{filme.titulo}</h5>
        <p className="card-text">
          <strong>Sala:</strong> {sala.nome} ({sala.tipo}) - Capacidade: {sala.capacidade} lugares
        </p>
        <p className="card-text">
          <strong>Data:</strong> {new Date(sessao.dataHora).toLocaleString()}
        </p>
        <p className="card-text">
          <strong>Preço:</strong> R$ {sessao.preco.toFixed(2)} - {sessao.idioma} - {sessao.formato}
        </p>
      </div>
    </div>
  );
};

SessaoInfoCard.propTypes = {
  filme: PropTypes.shape({
    titulo: PropTypes.string.isRequired,
    // outras propriedades do filme
  }),
  sala: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    tipo: PropTypes.string.isRequired,
    capacidade: PropTypes.number.isRequired
    // outras propriedades da sala
  }),
  sessao: PropTypes.shape({
    dataHora: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    idioma: PropTypes.string.isRequired,
    formato: PropTypes.string.isRequired
    // outras propriedades da sessão
  })
};

export default SessaoInfoCard;