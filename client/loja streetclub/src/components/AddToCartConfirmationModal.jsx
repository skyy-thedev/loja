import './AddToCartConfirmationModal.css';

export default function AddToCartConfirmationModal({ isOpen, onContinueShopping, onGoToCart }) {
  if (!isOpen) return null;

  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal-content">
        <h2>Produto adicionado ao carrinho!</h2>
        <p>Deseja continuar comprando ou ir para o carrinho?</p>

        <div className="confirmation-buttons">
          <button className="confirm-button" onClick={onContinueShopping}>
            Continuar comprando
          </button>
          <button className="go-to-cart-button" onClick={onGoToCart}>
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}
