import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto text-center">
          <h1 className="display-4 mb-4">Bem-vindo ao CineJS</h1>
          <p className="lead mb-5">Sistema de gerenciamento de cinema</p>
          
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Menu Rápido</h5>
              <div className="d-grid gap-3">
                <Link to="/filmes" className="btn btn-primary btn-lg">
                  Cadastrar Filme
                </Link>
                <Link to="/salas" className="btn btn-primary btn-lg">
                  Cadastrar Sala
                </Link>
                <Link to="/sessoes" className="btn btn-primary btn-lg">
                  Cadastrar Sessão
                </Link>
                <Link to="/ingressos" className="btn btn-success btn-lg">
                  Vender Ingresso
                </Link>
                <Link to="/sessoes-disponiveis" className="btn btn-info btn-lg">
                  Ver Sessões
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;