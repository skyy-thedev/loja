// src/components/ModalConfirm.jsx
import './ModalConfirm.css';

export default function ModalConfirm({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p>{message}</p>
        <div className="modal-actions">
          <button className="confirm-btn" onClick={onConfirm}>Confirmar</button>
          <button className="cancel-btn" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
