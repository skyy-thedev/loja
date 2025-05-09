import { useState } from 'react';
import useStore from '../context/useStore';
import './CartSidebar.css';

export default function CartSidebar({ onGoToCart }) {
  const cartItems = useStore(state => state.cart);
  const [minimized, setMinimized] = useState(false);

  // Calcula o total considerando a quantidade de cada item
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (minimized) {
    return (
      <button
        className="cart-icon-button"
        onClick={() => setMinimized(false)}
        title="Abrir carrinho"
      >
        🛒
      </button>
    );
  }

  return (
    <div className="cart-sidebar open">
      <div className="cart-sidebar-header">
        <h3>Seus produtos:</h3>
        <button className="cart-sidebar-close" onClick={() => setMinimized(true)}>
          ⤫
        </button>
      </div>

      <div className="cart-sidebar-body">
        {cartItems.length === 0 ? (
          <p>Seu carrinho está vazio!</p>
        ) : (
          <ul className="cart-items-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <p>{item.name} <br/> {item.selectedSize}</p>
                  <span>Cor: {item.selectedColor}</span>
                  <span>R$ {item.price.toFixed(2)} x {item.quantity}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="cart-sidebar-footer">
        <div className="total-price">
          <span>Total: </span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        <button className="go-to-cart-button" onClick={onGoToCart}>
          Finalizar compra
        </button>
      </div>
    </div>
  );
}