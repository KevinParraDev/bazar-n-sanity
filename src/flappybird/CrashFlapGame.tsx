import Bird from './components/Bird';
import Pipe from './components/Pipe';
import { useGameLogic } from './hooks/useGameLogic';
import relicImg from '../assets/react.svg'; // Usa tu imagen de reliquia real
import crashFlappyBg from '../assets/background_crash_flap.png';
import { useNavigate } from 'react-router-dom';
import { useEconomy } from '../context/EconomyContext';
import { useState, useEffect } from 'react';

const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;


const CrashFlapGame = () => {
  const { birdY, pipes, isGameOver, score, jump, restart, pipeGap, relics, relicsCollected } = useGameLogic();
  const { wumpaCount, addWumpa } = useEconomy();
  const navigate = useNavigate();
  
  // Estados para la animación de transferencia de wumpas
  const [gameWumpas, setGameWumpas] = useState(0);
  const [isTransferring, setIsTransferring] = useState(false);
  const [hasTransferred, setHasTransferred] = useState(false);

  // Actualizar wumpas del juego cuando cambie el score
  useEffect(() => {
    setGameWumpas(score);
  }, [score]);

  // Resetear estados cuando se reinicia el juego
  useEffect(() => {
    if (!isGameOver) {
      setIsTransferring(false);
      setHasTransferred(false);
      setGameWumpas(0);
    }
  }, [isGameOver]);

  // Función para iniciar la transferencia de wumpas
  const startWumpaTransfer = () => {
    if (gameWumpas <= 0 || isTransferring || hasTransferred) return;
    
    setIsTransferring(true);
    const interval = setInterval(() => {
      setGameWumpas(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          setIsTransferring(false);
          setHasTransferred(true);
          return 0;
        }
        addWumpa(1);
        return prev - 1;
      });
    }, 100); // Transferir 1 wumpa cada 100ms
  };
  // Iniciar la transferencia automáticamente cuando aparece el pop-up
  useEffect(() => {
    if (isGameOver && gameWumpas > 0 && !hasTransferred) {
      const timer = setTimeout(() => {
        startWumpaTransfer();
      }, 1000); // Esperar 1 segundo después de que aparezca el pop-up
      
      return () => clearTimeout(timer);
    }
  }, [isGameOver, gameWumpas, hasTransferred, isTransferring]);
  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>
      <div
        tabIndex={0}
        onClick={jump}
        style={{
          position: 'relative',
          width: `${GAME_WIDTH}px`,
          height: `${GAME_HEIGHT}px`,
          background: `url(${crashFlappyBg}) center center / cover no-repeat`, // <-- Fondo con imagen
          overflow: 'hidden',
          outline: 'none',
          borderRadius: 16,
          boxShadow: '0 0 20px #0008',
          margin: '0 auto'
        }}
      >
      <h2 style={{
        position: 'absolute',
        top: 10,
        left: 0,
        width: '100%',
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'LuckiestGuy, Crash, sans-serif',
        fontSize: 36,
        letterSpacing: 2,
        textShadow: '2px 2px 4px #000',
        zIndex: 2,
        userSelect: 'none'
      }}>CrashFlap</h2>
      <Bird y={birdY} />
      {pipes.map((pipe, idx) => (
        <>
          <Pipe key={`top-${idx}`} x={pipe.x} height={pipe.gapY} isTop={true} />
          <Pipe
            key={`bottom-${idx}`}
            x={pipe.x}
            height={GAME_HEIGHT - pipe.gapY - pipeGap}
            isTop={false}
          />
        </>
      ))}
      {/* Reliquias */}
      {relics.map((relic, idx) =>
        !relic.collected && (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: relic.x,
              top: relic.y,
              width: 40,
              height: 40,
              backgroundImage: `url(${relicImg})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              zIndex: 2,
            }}
            title="Reliquia"
          />
        )
      )}      {  /* Overlay para el score y reliquias */}
      <div style={{
        position: 'absolute',
        top: 60,
        left: 10,
        color: '#fff',
        fontSize: 28,
        textShadow: '2px 2px 4px #000',
        zIndex: 2,
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="/images/wumpa-fruit.png" alt="Wumpa" style={{ width: 36, height: 36 }} />
          <span style={{ fontWeight: 'bold', fontSize: 32 }}>{score}</span>
        </div>
        <div style={{ fontSize: 20 }}>Reliquias: {relicsCollected}</div>
      </div>
      {isGameOver && (
        <>
          { /* Overlay para el fin del juego */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.7)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }} />          {/* Pop-up */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#222d',
            borderRadius: 20,
            padding: '40px 32px',
            boxShadow: '0 0 30px #000a',
            color: '#fff',
            fontSize: 28,
            textAlign: 'center',
            zIndex: 20,
            minWidth: 300
          }}>            <div style={{ fontSize: 36, marginBottom: 16, fontWeight: 'bold' }}>¡Fin del juego!</div>
            
            {/* Mostrar las wumpas de sesión general y las ganadas en el juego */}
            <div style={{ 
              marginBottom: 16, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 8
            }}>
              <img src="/images/wumpa-fruit.png" alt="Wumpa" style={{ width: 32, height: 32 }} />
              <span>
                Wumpas: <b>{wumpaCount}</b>
                {gameWumpas > 0 && (
                  <span style={{ 
                    color: isTransferring ? '#4CAF50' : '#FFC107',
                    fontWeight: 'bold',
                    animation: isTransferring ? 'pulse 0.5s infinite' : 'none'
                  }}>
                    {' '}(+{gameWumpas})
                  </span>
                )}
              </span>
            </div>

            <div style={{ marginBottom: 24 }}>Reliquias: <b>{relicsCollected}</b></div>

            {/* Botón para transferir wumpas manualmente si no se ha iniciado */}
            {gameWumpas > 0 && !isTransferring && !hasTransferred && (
              <button
                onClick={startWumpaTransfer}
                style={{
                  fontSize: 18,
                  padding: '8px 20px',
                  marginBottom: 12,
                  borderRadius: 8,
                  border: '2px solid #4CAF50',
                  background: '#4CAF50',
                  color: '#fff',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Transferir Wumpas
              </button>
            )}
            
            <button
              onClick={restart}
              style={{
                fontSize: 22,
                padding: '10px 30px',
                marginBottom: 12,
                borderRadius: 8,
                border: '2px solid #fff',
                background: '#ff9800',
                color: '#fff',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Reiniciar
            </button>
            <button
              onClick={() => {
                restart();
                setTimeout(() => navigate('/'), 0);
              }}
              style={{
                fontSize: 18,
                padding: '8px 20px',
                borderRadius: 8,
                border: '2px solid #fff',
                background: '#444',
                color: '#fff',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Volver al inicio
            </button>
          </div>        </>
      )}
    </div>
    </>
  );
};

export default CrashFlapGame;