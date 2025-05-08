// src/components/Notification.jsx
import './Notification.css';

export default function Notification({ message }) {
  return (
    <div className="notification">
      {message}
    </div>
  );
}