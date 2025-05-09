// src/components/Notification.jsx
import './Notification.css';

export default function Notification({ message }) {
  const isThankYou = message.toLowerCase().includes('obrigado') || message.toLowerCase().includes('compra concluída');

  return (
    <div className={`notification ${isThankYou ? 'thank-you' : ''}`}>
      {message}
    </div>
  );
}