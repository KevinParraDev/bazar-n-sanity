import React, { useEffect, useState } from 'react';
import AuthContainer from './components/AuthContainer';
import Ruleta from './components/Ruleta';
import IslaWumpa from './components/IslaWumpa';

const App: React.FC = () => {
  const [mostrarRuleta, setMostrarRuleta] = useState(false);

  // Escuchar mensaje desde el botón EXPLORAR
  useEffect(() => {
  const recibirMensaje = (event: MessageEvent) => {
    console.log('[App] mensaje recibido:', event.data); // 👈 AÑADIDO
    if (event.data === 'abrir-ruleta') {
      setMostrarRuleta(true);
    }
  };
  window.addEventListener('message', recibirMensaje);
  return () => window.removeEventListener('message', recibirMensaje);
}, []);

  return (
    <div className="App">
      <AuthContainer />
      <IslaWumpa />

      {/* Superposición de la ruleta */}
      {mostrarRuleta && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <Ruleta />
          <button
            onClick={() => setMostrarRuleta(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              padding: '10px 20px',
              fontSize: '1rem',
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              zIndex: 10000,
            }}
          >
            ✖ Cerrar
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
