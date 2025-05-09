import { useParams, useNavigate } from 'react-router-dom';
import productsData from '../data/products';
import useStore from '../context/useStore';
import '../styles/ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useStore(state => state.addToCart);

  const product = productsData.find(p => p.id === parseInt(id));

  if (!product) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>Produto não encontrado.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/carrinho');
  };

  return (
    <div className="product-details-container">
      <div className="product-details-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-details-info">
        <h2>{product.name}</h2>
        <p><strong>Tipo:</strong> {product.type}</p>
        <p><strong>Cor:</strong> {product.color}</p>
        {product.description && <p>{product.description}</p>}

        {product.promo && product.oldPrice && (
          <p className="product-details-old-price">De R$ {product.oldPrice.toFixed(2)}</p>
        )}

        <p className="product-details-price">Por R$ {product.price.toFixed(2)}</p>

        <button className="product-details-button" onClick={handleAddToCart}>
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}