// src/pages/Loja.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../context/useStore';
import products from '../data/products';
import Notification from '../components/Notification';
import './Loja.css';

export default function Loja() {
  const addToCart = useStore(state => state.addToCart);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
      navigate('/carrinho');
    }, 2000); // Mostra o popup por 2 segundos, depois redireciona
  };

  return (
    <div className="loja-container">
      {showNotification && <Notification message="Produto adicionado ao carrinho!" />}

      <h1>Produtos Disponíveis</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>R$ {product.price.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(product)}>Adicionar ao Carrinho</button>
          </div>
        ))}
      </div>
    </div>
  );
}
