import { Link, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', text: 'Home', icon: 'bi-house' },
    { path: '/filmes', text: 'Cadastrar Filmes', icon: 'bi-film' },
    { path: '/salas', text: 'Cadastrar Salas', icon: 'bi-building' },
    { path: '/sessoes', text: 'Cadastrar Sessões', icon: 'bi-calendar-event' },
    { path: '/ingressos', text: 'Vender Ingressos', icon: 'bi-ticket-perforated' },
    { path: '/sessoes-disponiveis', text: 'Sessões Disponíveis', icon: 'bi-list-ul' }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-camera-reels me-2"></i>
          CineJS
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {navItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <Link 
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`} 
                  to={item.path}
                >
                  <i className={`bi ${item.icon} me-1`}></i>
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;