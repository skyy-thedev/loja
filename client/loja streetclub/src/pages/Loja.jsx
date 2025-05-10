// src/pages/Loja.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../context/useStore';
import productsData from '../data/products';
import CartSidebar from '../components/CartSidebar';
import AddToCartConfirmationModal from '../components/AddToCartConfirmationModal';
import Destaque from '../components/Destaque';
import ProductFilter from '../components/ProductFilter';
import ProductModal from '../components/ProductModal';
import FaixaContinuaLinear from '../components/FaixaContinuaLinear';
import '../styles/Loja.css';

export default function Loja() {
  const addToCart = useStore(state => state.addToCart);
  const cartItems = useStore(state => state.cart);
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [filters, setFilters] = useState({
    search: '',
    color: '',
    sort: '',
    type: '',
    priceRange: '',
    saleOnly: false,
  });

  const navigate = useNavigate();

  const handleFilterChange = (newFilters) => setFilters(newFilters);

  // Função para abrir o modal de confirmação após adicionar o produto ao carrinho
  const handleAddToCartFromModal = (productWithOptions) => {
    addToCart(productWithOptions);
    setShowConfirmationModal(true);
  };

  // Função para filtrar os produtos com base nos filtros aplicados
  const filteredProducts = productsData
    .filter(p => p.name.toLowerCase().includes(filters.search.toLowerCase()))
    .filter(p => (filters.color ? p.color === filters.color : true))
    .filter(p => (!filters.saleOnly || p.promo))
    .filter(p => (filters.type ? p.type === filters.type : true))
    .filter(p => {
      if (!filters.priceRange) return true;
      const [min, max] = filters.priceRange.split('-').map(Number);
      return p.price >= min && p.price <= max;
    })
    .sort((a, b) => {
      if (filters.sort === 'asc') return a.price - b.price;
      if (filters.sort === 'desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="loja-container">
      {showCartSidebar && (
        <CartSidebar
          cartItems={cartItems}
          onClose={() => setShowCartSidebar(false)}
          onGoToCart={() => navigate('/carrinho')}
        />
      )}

      <AddToCartConfirmationModal
        isOpen={showConfirmationModal}
        onContinueShopping={() => {
          setShowConfirmationModal(false);
          setShowCartSidebar(true);
        }}
        onGoToCart={() => {
          setShowConfirmationModal(false);
          navigate('/carrinho');
        }}
      />
      <FaixaContinuaLinear />
      <Destaque />
      <h3>Produtos em destaque:</h3>

      <div className="loja-content">
        <aside className="filtro-container">
          <h4>Filtrar por:</h4>
          <ProductFilter onFilter={handleFilterChange} />
        </aside>

        <div className="product-list">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
              {product.promo && <span className="badge-promo">Promoção</span>}
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>
                {product.promo && product.oldPrice && (
                  <span style={{ textDecoration: 'line-through', color: '#888', fontSize: '20px' }}>
                    R$ {product.oldPrice.toFixed(2)}<br />
                  </span>
                )}
                <span style={{ fontWeight: 'bold', fontSize: '30px' }}>
                  R$ {product.price.toFixed(2)}
                </span>
              </p>
              <button onClick={(e) => {
                e.stopPropagation();
                setSelectedProduct(product);
              }}>
                Ver Detalhes
              </button>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onConfirmAddToCart={handleAddToCartFromModal}
          />
        )}
      </div>
    </div>
  );
}
