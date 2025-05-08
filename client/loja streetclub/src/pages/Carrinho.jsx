// src/pages/Carrinho.jsx
import { useState } from 'react';
import useStore from '../context/useStore';
import Notification from '../components/Notification';
import './Carrinho.css';

export default function Carrinho() {
  const cart = useStore(state => state.cart);
  const removeFromCart = useStore(state => state.removeFromCart);
  const clearCart = useStore(state => state.clearCart);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleRemove = (productId, productName) => {
    const confirmed = window.confirm(`Tem certeza que deseja remover "${productName}" do carrinho?`);
    if (confirmed) {
      removeFromCart(productId);
      setNotificationMessage(`"${productName}" foi removido do carrinho!`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }
  };

  const handleClearCart = () => {
    const confirmed = window.confirm("Deseja esvaziar todo o carrinho?");
    if (confirmed) {
      clearCart();
      setNotificationMessage("Carrinho esvaziado com sucesso!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }
  };

  return (
    <div className="carrinho-container">
      {showNotification && <Notification message={notificationMessage} />}

      <h1>Seu Carrinho</h1>

      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="carrinho-lista">
            {cart.map(item => (
              <li key={item.id} className="carrinho-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h2>{item.name}</h2>
                  <p>R$ {item.price.toFixed(2)}</p>
                  <button onClick={() => handleRemove(item.id, item.name)}>Remover</button>
                </div>
              </li>
            ))}
          </ul>
          <button className="clear-cart-btn" onClick={handleClearCart}>
            Esvaziar Carrinho
          </button>
        </>
      )}
    </div>
  );
}