// src/components/Destaque.jsx
import './Destaque.css';
import destaqueIMG from '../assets/destaque.jpg';

export default function Destaque() {
  return (
    <div className="destaque-container">
      <img src={destaqueIMG} alt="Destaques" />
      <div className="destaque-overlay" />
    </div>
  );
}