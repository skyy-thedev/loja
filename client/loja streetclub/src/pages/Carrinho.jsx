// src/pages/Carrinho.jsx
import { useState } from 'react';
import useStore from '../context/useStore';
import Notification from '../components/Notification';
import ModalConfirm from '../components/ModalConfirm';
import Destaque from '../components/Destaque';
import '../styles/Carrinho.css';

export default function Carrinho() {
  const cart = useStore(state => state.cart);
  const removeFromCart = useStore(state => state.removeFromCart);
  const clearCart = useStore(state => state.clearCart);
  const [modal, setModal] = useState({ visible: false, action: null, message: '', payload: null });

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleRemove = (productId, productName) => {
    setModal({
      visible: true,
      message: `Deseja remover "${productName}" do carrinho?`,
      action: 'remove',
      payload: { id: productId, name: productName }
    });
  };

  const handleClearCart = () => {
    setModal({
      visible: true,
      message: 'Deseja esvaziar todo o carrinho?',
      action: 'clear'
    });
  };

  const confirmAction = () => {
    if (modal.action === 'remove') {
      const { id, name } = modal.payload;
      removeFromCart(id);
      setNotificationMessage(`"${name}" foi removido do carrinho!`);
    } else if (modal.action === 'clear') {
      clearCart();
      setNotificationMessage('Carrinho esvaziado com sucesso!');
    } else if (modal.action === 'finalize') {
      clearCart();
      setNotificationMessage('Obrigado pela sua compra! Em breve você receberá a confirmação por e-mail.');
    }
  
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    setModal({ visible: false, action: null, message: '', payload: null });
  };

  const cancelAction = () => {
    setModal({ visible: false, action: null, message: '', payload: null });
  };

  return (
    <div className="carrinho-container">
      {showNotification && <Notification message={notificationMessage} />}
      {modal.visible && (
          <ModalConfirm
            message={modal.message}
            onConfirm={confirmAction}
            onCancel={cancelAction}
          />
        )}

      <Destaque/>

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

          <div className="total-container">
            <p className="total-value">
              Total: R${' '}
              {cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
            </p>
            <button
              className="finalize-btn"
              onClick={() =>
                setModal({
                  visible: true,
                  message: 'Tem certeza que deseja finalizar sua compra?',
                  action: 'finalize'
                })
              }
            >
              Finalizar Compra
            </button>
          </div>

          <button className="clear-cart-btn" onClick={handleClearCart}>
            Esvaziar Carrinho
          </button>
        </>
      )}
    </div>
  );
}