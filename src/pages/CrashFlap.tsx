import { useEffect, useState } from 'react';
import CrashFlapGame from '../flappybird/CrashFlapGame';
import crashFlappyBg from '../assets/crash_flappy_loading_bg.png'; // importa tu imagen


const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const MIN_SCALE = 0.5;
const MAX_SCALE = 1.5;

const CrashFlap = () => {
  const getScale = () => {
    const scale = Math.min(
      window.innerWidth / GAME_WIDTH,
      window.innerHeight / GAME_HEIGHT
    );
    return Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale));
  };

  const [scale, setScale] = useState(getScale);

  useEffect(() => {
    const handleResize = () => {
      setScale(getScale());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: `url(${crashFlappyBg}) center center / cover no-repeat`, // <-- aquí el fondo
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          boxShadow: '0 0 40px #000a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CrashFlapGame />
      </div>
    </div>
  );
};

export default CrashFlap;