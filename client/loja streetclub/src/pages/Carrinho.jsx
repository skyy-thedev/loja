import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../context/useStore';
import Notification from '../components/Notification';
import ModalConfirm from '../components/ModalConfirm';
import Destaque from '../components/Destaque';
import '../styles/Carrinho.css';

export default function Carrinho() {
  const cart = useStore(state => state.cart);
  const removeFromCart = useStore(state => state.removeFromCart);
  const clearCart = useStore(state => state.clearCart);
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [modal, setModal] = useState({ visible: false, action: null, message: '', payload: null });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleRemove = (productId, selectedSize, productName) => {
    setModal({
      visible: true,
      message: `Deseja remover "${productName}" (${selectedSize}) do carrinho?`,
      action: 'remove',
      payload: { id: productId, selectedSize, name: productName }
    });
  };

  const navigate = useNavigate();

  const handleClearCart = () => {
    setModal({
      visible: true,
      message: 'Deseja esvaziar todo o carrinho?',
      action: 'clear'
    });
  };

  const confirmAction = () => {
    if (modal.action === 'remove') {
      const { id, selectedSize, name } = modal.payload;
      removeFromCart(id, selectedSize);
      setNotificationMessage(`"${name}" (${selectedSize}) foi removido do carrinho!`);
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

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'STREETCLUB') {
      setDiscountApplied(true);
    } else {
      alert('Cupom inválido.');
      setDiscountApplied(false);
    }
  };

  const handleAddMore = () => {
    navigate('/loja');
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = discountApplied ? total * 0.15 : 0;
  const totalWithDiscount = total - discount;

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

      <Destaque />

      <h1>Seu Carrinho</h1>
        <button className="addmore-button" onClick={handleAddMore}>
          Adicionar mais produtos
        </button>

      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="carrinho-lista">
            {cart.map(item => (
              <li key={`${item.id}-${item.selectedSize}`} className="carrinho-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h2>{item.name}</h2>
                  <p>Tipo: {item.type}</p>
                  <p>Cor: {item.selectedColor}</p>
                  <p>Tamanho: {item.selectedSize}</p>
                  <p>Preço: R$ {item.price.toFixed(2)} x {item.quantity}</p>
                  <button onClick={() => handleRemove(item.id, item.selectedSize, item.name)}>Remover</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="coupon-section">
            <input
              type="text"
              placeholder="Digite o cupom"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button onClick={handleApplyCoupon} className='cupom-btn'>Aplicar Cupom</button>
            {discountApplied && (
              <p className="discount-message">Cupom STREETCLUB aplicado! (15% de desconto)</p>
            )}
            <input
              id='cep-input'
              type="text"
              placeholder="Digite o CEP"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button onClick={handleApplyCoupon} className='frete-btn'>Calcular Frete</button>
          </div>

          <div className="total-container">
            <p className="total-value">Total: R$ {total.toFixed(2)}</p>
            {discountApplied && (
              <p className="total-discount">
                Total com desconto: <strong>R$ {totalWithDiscount.toFixed(2)}</strong>
              </p>
            )}
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