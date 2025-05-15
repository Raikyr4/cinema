import './Footer.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <div className="container text-center">
        <p className="mb-0">Sistema CineJS &copy; {new Date().getFullYear()} - Todos os direitos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;