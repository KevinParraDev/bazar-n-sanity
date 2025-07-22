import React, { useState } from 'react';
import './DevTools.css';

interface DevToolsProps {
  onResetEconomy: () => void;
  onResetInventory: () => void;
  onResetAll: () => void;
}

const DevTools: React.FC<DevToolsProps> = ({ onResetEconomy, onResetInventory, onResetAll }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón flotante para abrir dev tools */}
      <button 
        className="dev-tools-trigger"
        onClick={() => setIsOpen(!isOpen)}
        title="Herramientas de Desarrollador"
      >
        ⚙️
      </button>

      {/* Panel de herramientas */}
      {isOpen && (
        <div className="dev-tools-panel">
          <h3>🛠️ Dev Tools</h3>
          <p>Herramientas para testing y desarrollo</p>
          
          <div className="dev-tools-buttons">
            <button onClick={onResetEconomy} className="dev-btn reset-btn">
              💰 Reset Monedas
            </button>
            
            <button onClick={onResetInventory} className="dev-btn reset-btn">
              🎒 Reset Inventario
            </button>
            
            <button onClick={onResetAll} className="dev-btn danger-btn">
              🔥 Reset Todo
            </button>
            
            <button onClick={() => setIsOpen(false)} className="dev-btn close-btn">
              ✕ Cerrar
            </button>
          </div>
          
          <div className="dev-info">
            <small>Solo visible en modo desarrollo</small>
          </div>
        </div>
      )}
    </>
  );
};

export default DevTools;
