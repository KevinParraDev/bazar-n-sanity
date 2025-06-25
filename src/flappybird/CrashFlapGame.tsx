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

  // Estado para detectar si estamos en móvil para estilos responsive del UI
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    }  }, [isGameOver, gameWumpas, hasTransferred, isTransferring]);

  // Calcular escala responsive
  const getScale = () => {
    const scaleX = Math.min(1, (window.innerWidth - 40) / GAME_WIDTH);
    const scaleY = Math.min(1, (window.innerHeight - 200) / GAME_HEIGHT);
    return Math.min(scaleX, scaleY, 1); // Nunca escalar más grande que el original
  };

  const [scale, setScale] = useState(getScale);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setScale(getScale());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        transition: 'transform 0.3s ease'
      }}>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.05); }
          }
        `}</style><div
        tabIndex={0}
        onClick={jump}
        style={{
          position: 'relative',
          width: `${GAME_WIDTH}px`,
          height: `${GAME_HEIGHT}px`,
          background: `url(${crashFlappyBg}) center center / cover no-repeat`,
          overflow: 'hidden',
          outline: 'none',
          borderRadius: 16,
          boxShadow: '0 0 20px #0008',
          margin: '0 auto'
        }}
      >      <h2 style={{
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
          <Pipe key={`top-${idx}`} x={pipe.x} height={pipe.gapY} isTop={true} />          <Pipe
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
          }} />          {/* Pop-up */}          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#222d',
            borderRadius: 20,
            padding: '40px 32px',
            boxShadow: '0 0 30px #000a',
            color: '#fff',
            fontSize: isMobile ? 20 : 28,
            textAlign: 'center',
            zIndex: 20,
            minWidth: isMobile ? 250 : 300,
            maxWidth: isMobile ? '90%' : 'none'
          }}>            <div style={{ fontSize: isMobile ? 28 : 36, marginBottom: 16, fontWeight: 'bold' }}>¡Fin del juego!</div>
              {/* Mostrar las wumpas de sesión general y las ganadas en el juego */}
            <div style={{ 
              marginBottom: 16, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 8,
              flexWrap: 'wrap'
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
            </div>            <div style={{ marginBottom: 24 }}>Reliquias: <b>{relicsCollected}</b></div>
            
            <button
              onClick={restart}
              style={{
                fontSize: isMobile ? 18 : 22,
                padding: isMobile ? '10px 20px' : '10px 30px',
                marginBottom: isMobile ? 10 : 12,
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
                fontSize: isMobile ? 16 : 18,
                padding: isMobile ? '8px 16px' : '8px 20px',
                borderRadius: 8,
                border: '2px solid #fff',
                background: '#444',
                color: '#fff',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Volver al inicio            </button>
          </div>        </>
      )}
    </div>
      </div>
    </div>
  );
};

export default CrashFlapGame;