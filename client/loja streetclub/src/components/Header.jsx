import { Link } from 'react-router-dom';
import logoIMG from '../assets/logo.png';
import './Header.css';

export default function Header() {
  return (
    <header className="top-header">
            <Link to="/"><img src={logoIMG} alt="Logo StreetClub Store" id='logo' /></Link>
      <nav className="nav">
        <Link to="/loja">Loja</Link>
        <Link to="/carrinho">Carrinho</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}