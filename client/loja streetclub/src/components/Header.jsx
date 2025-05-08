import { Link } from 'react-router-dom';
import logoIMG from '../assets/logo.png';
import './Header.css';

export default function Header() {
  return (
    <header className="top-header">
            <img src={logoIMG} alt="Logo StreetClub Store" id='logo' />
      <h1>StreetClub Store</h1>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/loja">Loja</Link>
        <Link to="/carrinho">Carrinho</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}