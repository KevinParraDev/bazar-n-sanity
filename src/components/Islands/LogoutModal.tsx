import React from 'react';
import './LogoutModal.css';

interface LogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="logout-modal-backdrop" onClick={onCancel}>
      <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="logout-modal-header">
          <h3>Cerrar Sesión</h3>
        </div>
        
        <div className="logout-modal-content">
          <p>¿Estás seguro de que deseas cerrar sesión?</p>
        </div>
        
        <div className="logout-modal-actions">
          <button className="logout-cancel-btn" onClick={onCancel}>
            Cancelar
          </button>
          <button className="logout-confirm-btn" onClick={onConfirm}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
