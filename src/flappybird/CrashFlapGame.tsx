import Bird from './components/Bird';
import Pipe from './components/Pipe';
import { useGameLogic } from './hooks/useGameLogic';
import relicImg from '../assets/react.svg'; // Usa tu imagen de reliquia real
import crashFlappyBg from '../assets/background_crash_flap.png';
import { useNavigate } from 'react-router-dom';

const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;


const CrashFlapGame = () => {
  const { birdY, pipes, isGameOver, score, jump, restart, pipeGap, relics, relicsCollected } = useGameLogic();
  const navigate = useNavigate();

  return (
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
      )}
      {/* Score y reliquias en español */}
      <div style={{
        position: 'absolute',
        top: 60,
        left: 10,
        color: '#fff',
        fontSize: 28,
        textShadow: '2px 2px 4px #000',
        zIndex: 2,
        userSelect: 'none'
      }}>
        Puntuación: {score} <br />
        Reliquias: {relicsCollected}
      </div>
      {isGameOver && (
        <>
          {/* Fondo oscuro */}
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
          }} />
          {/* Pop-up */}
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
          }}>
            <div style={{ fontSize: 36, marginBottom: 16, fontWeight: 'bold' }}>¡Fin del juego!</div>
            <div style={{ marginBottom: 10 }}>Puntuación: <b>{score}</b></div>
            <div style={{ marginBottom: 24 }}>Reliquias: <b>{relicsCollected}</b></div>
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
          </div>
        </>
      )}
    </div>
  );
};

export default CrashFlapGame;