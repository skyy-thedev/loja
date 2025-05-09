import { useState } from 'react';
import './ProductModal.css';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [isHovering, setIsHovering] = useState(false);

  if (!product) return null;

  const handleBackgroundClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  const handleMouseMove = (e) => {
    const img = e.target;
    const { left, top, width, height } = img.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    img.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = (e) => {
    setIsHovering(false);
    e.target.style.transformOrigin = 'center';
  };

  return (
    <div className="modal-overlay" onClick={handleBackgroundClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>

        <div
          className="modal-image"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              transform: isHovering ? 'scale(1.2)' : 'scale(1)',
              transition: 'transform 0.2s ease-out',
            }}
          />
        </div>

        <div className="modal-info">
          <h2>{product.name}</h2>
          <p><strong>Tipo:</strong> {product.type}</p>
          <p><strong>Cor:</strong> {product.color}</p>
          {product.description && <p>{product.description}</p>}
          
          {product.promo && product.oldPrice && (
            <p className="modal-old-price">De R$ {product.oldPrice.toFixed(2)}</p>
          )}

          <p className="modal-price">Por R$ {product.price.toFixed(2)}</p>

          <button className="modal-button" onClick={() => onAddToCart(product)}>
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}