// src/pages/Home.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../context/useStore';
import productsData from '../data/products';
import Destaque from '../components/Destaque';
import Notification from '../components/Notification';
import ProductFilter from '../components/ProductFilter';
import ProductModal from '../components/ProductModal';
import '../styles/Home.css';

export default function Home() {
  const addToCart = useStore(state => state.addToCart);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    color: '',
    sort: '',
    type: '',
    priceRange: '',
    saleOnly: false,
  });
  const navigate = useNavigate();

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
      navigate('/carrinho');
    }, 2000);
  };

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
    <div className="home-container">
      {showNotification && <Notification message="Produto adicionado ao carrinho!" />}
      
      <Destaque />
      <h3>Produtos em destaque:</h3>

      <div className="home-content">
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
                    R$ {product.oldPrice.toFixed(2)}
                    <br/>
                  </span>
                )}
                <span style={{ fontWeight: 'bold', fontSize: '30px' }}>
                  R$ {product.price.toFixed(2)}
                </span>
              </p>
              <button onClick={() => handleAddToCart(product)}>Adicionar ao Carrinho</button>
            </div>
          ))}
        </div>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(product) => {
              handleAddToCart(product);
              setSelectedProduct(null);
            }}
          />
        )}
      </div>
    </div>
  );
}