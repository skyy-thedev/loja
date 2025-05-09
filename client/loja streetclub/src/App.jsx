import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Loja from './pages/Loja';
import Carrinho from './pages/Carrinho';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';

export default function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loja" element={<Loja />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      <Footer />
    </Router>
  );
}