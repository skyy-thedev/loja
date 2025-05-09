import { useState } from 'react';
import './ProductModal.css';

export default function ProductModal({ product, onClose, onConfirmAddToCart }) {
  const [isHovering, setIsHovering] = useState(false);
  const [selectedSize, setSelectedSize] = useState(''); // Inicializa o tamanho como vazio
  const [selectedColor] = useState(product.color || ''); // Não deixa o usuário alterar a cor, apenas exibe

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

  const isWearable = product.type === 'camiseta' || product.type === 'bermuda';
  const sizes = ['P', 'M', 'G', 'GG'];

    const handleAddToCart = () => {
      if (isWearable && !selectedSize) return; // Verifica se o tamanho foi selecionado
      const productWithOptions = { ...product, selectedSize, selectedColor }; // Passa o tamanho e cor

      console.log('selectedSize no ProductModal:', selectedSize);
      console.log('productWithOptions:', productWithOptions);

      onConfirmAddToCart(productWithOptions); // Passa o item com as opções selecionadas
      onClose();
    };

  return (
    <div className="modal-overlay" onClick={handleBackgroundClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>

        <div
          className="modal-image"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={(e) => {
            setIsHovering(false);
            e.target.style.transformOrigin = 'center';
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              transform: isHovering ? 'scale(1.8)' : 'scale(1)',
              transition: 'transform 0.2s ease-out',
            }}
          />
        </div>

        <div className="modal-info">
          <h2>{product.name}</h2>
          <p><strong>Tipo:</strong> {product.type}</p>
          <p><strong>Cor:</strong> {selectedColor}</p>  {/* Exibe a cor predefinida do produto */}
          {product.description && <p>{product.description}</p>}

          {product.promo && product.oldPrice && (
            <p className="modal-old-price">De: R$ {product.oldPrice.toFixed(2)}</p>
          )}
          <p className="modal-price">Por: R$ {product.price.toFixed(2)}</p>

          {isWearable && (
            <div className="size-selector">
              <p><strong>Escolha um tamanho:</strong></p>
              <div className="size-buttons">
                {sizes.map((size) => (
                  <button
                    key={size}
                    disabled={!product.stock?.[size]}  // Desabilita o botão se o tamanho não estiver disponível
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}  // Atualiza o tamanho selecionado
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            className={`modal-button ${isWearable && !selectedSize ? 'disabled' : ''}`}
            onClick={handleAddToCart}
            disabled={isWearable && !selectedSize}  // Desabilita o botão se o tamanho não for selecionado
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}