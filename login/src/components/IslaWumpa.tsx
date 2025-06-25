import React from 'react';

const IslaWumpa: React.FC = () => {
  const abrirRuleta = () => {
    window.postMessage('abrir-ruleta', '*');
    console.log('[IslaWumpa] Botón EXPLORAR presionado -> mensaje enviado');
  };

  return (
    <div style={{ position: 'relative', width: '960px', margin: '0 auto', paddingBottom: '2rem' }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '2.5rem',
        marginBottom: '1rem',
        fontFamily: '"Crash CT", sans-serif',
        color: 'white'
      }}>
        ISLA WUMPA
      </h1>

      {/* Iframe del juego Unity */}
      <iframe
        src="/game/index.html"
        title="Unity Isla Wumpa"
        width="960"
        height="600"
        style={{ border: 'none', display: 'block', margin: '0 auto' }}
      ></iframe>

      {/* Botón REACT de Exploración */}
      <button
        onClick={abrirRuleta}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          zIndex: 10,
          backgroundColor: '#ffc107',
          color: '#000',
          padding: '12px 24px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          boxShadow: '0 0 8px rgba(0,0,0,0.3)'
        }}
      >
        EXPLORAR
      </button>
    </div>
  );
};

export default IslaWumpa;
