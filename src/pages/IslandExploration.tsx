import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Islands/Navbar';
import '../components/Islands/Navbar.css';
import bgWumpaIsland from '../assets/background_wumpa_island.png';
import bgIslandOfLostTreasures from '../assets/background_island_of_lost_treasures.png';
import minigameWumpa from '../assets/minigame-wumpa.png';
import minigameLostTreasures from '../assets/minigame-lost-treasures.png';
import { useState, useEffect } from 'react';
import StorePage from './StorePage';

// Configuración de las islas
const islandsConfig = {
  'wumpa-island': {
    name: 'ISLA WUMPA',
    backgroundImage: bgWumpaIsland,
    minigameBackground: minigameWumpa,
    minigames: [
      {
        id: 'fruit-catcher',
        name: 'FRUIT CATCHER',
        route: '/wumpa-island'
      }
    ]
  }, 'lost-treasures': {
    name: 'ISLA DE TESOROS PERDIDOS',
    backgroundImage: bgIslandOfLostTreasures,
    minigameBackground: minigameLostTreasures,
    minigames: [
      {
        id: 'crash-flap',
        name: 'CRASH FLAP',
        route: '/crashflap'
      }
    ]
  }
};

const IslandExploration = () => {
  const { islandId } = useParams<{ islandId: string }>();
  const navigate = useNavigate();

  // Estado para detectar si estamos en móvil
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024 && window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const island = islandId ? islandsConfig[islandId as keyof typeof islandsConfig] : null;

  if (!island) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        background: '#000'
      }}>
        Isla no encontrada
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative'
    }}>      {/* Sección 1: Imagen de la isla + Título + Transición gradual al Bazar */}
      <section style={{
        minHeight: '100vh',
        background: `linear-gradient(to bottom, 
          transparent 0%, 
          transparent 50%, 
          rgba(15, 23, 42, 0.1) 60%, 
          rgba(15, 23, 42, 0.3) 75%, 
          rgba(15, 23, 42, 0.6) 85%, 
          rgba(15, 23, 42, 0.9) 95%, 
          #0f172a 100%), 
          url(${island.backgroundImage}) center center / cover no-repeat`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Navbar igual que en Home */}
        <Navbar username="Kevin" />{/* Título de la isla */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
          paddingTop: isMobile ? '40px' : '60px',
          padding: isMobile ? '40px 20px 0' : '60px 20px 0'
        }}>
          <h1 style={{
            color: '#fff',
            fontSize: isMobile ? '36px' : isTablet ? '48px' : '64px',
            fontWeight: 'bold',
            textShadow: '4px 4px 8px #000',
            margin: 0,
            fontFamily: 'LuckiestGuy, sans-serif',
            letterSpacing: isMobile ? '2px' : '4px',
            textAlign: 'center',
            lineHeight: '1.2'
          }}>
            {island.name}
          </h1>
        </div>
        {/* Área del bazar integrada en la misma sección */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '60px 40px 80px',
          minHeight: '50vh'
        }}>
          {/* Título del Bazar */}
          <h2 style={{
            color: '#fff',
            fontSize: '48px',
            fontWeight: 'bold',
            textShadow: '3px 3px 6px #000',
            marginBottom: '40px',
            fontFamily: 'LuckiestGuy, sans-serif',
            letterSpacing: '3px'
          }}>
            BAZAR
          </h2>

          {/* Área del bazar */}
          <div style={{
            maxWidth: '1200px',
            width: '100%',
            minHeight: '300px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
          }}>
            <StorePage></StorePage>
          </div>
        </div>
      </section>

      <section style={{
        minHeight: isMobile ? '20vh' : '30vh',
        background: `linear-gradient(to bottom, 
          #0f172a 0%, 
          transparent 100%)`,
        padding: isMobile ? '20px' : '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Contenido adicional del bazar si es necesario */}
        <div style={{
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.3)',
          fontSize: isMobile ? '16px' : '18px'
        }}>
          {/* Espacio para contenido adicional del bazar */}
        </div>
      </section>

      {/* Transición gradual hacia la imagen de fondo del minijuego */}
      <div style={{
        height: isMobile ? '15vh' : '25vh',
        background: `transparent`
      }} />

      {/* Sección 2: Minijuegos con imagen de fondo */}
      <section style={{
        minHeight: '100vh',
        background: `url(${island.minigameBackground}) center center / cover no-repeat`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>        {/* Contenido de minijuegos */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '100%',
          width: '100%',
          padding: isMobile ? '0 20px' : '0 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isMobile ? 'center' : 'flex-end',
          paddingRight: isMobile ? '20px' : '15%'
        }}>
          {/* Lista de minijuegos */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '40px' : '60px',
            alignItems: 'center',
            width: isMobile ? '100%' : 'auto'
          }}>{island.minigames.map((minigame) => (
            <div
              key={minigame.id} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: isMobile ? '40px' : '60px'
              }}
            >                {/* Título principal del minijuego centrado */}
              <h2 style={{
                color: '#fff',
                fontSize: isMobile ? '32px' : isTablet ? '40px' : '48px',
                fontWeight: 'bold',
                textShadow: '3px 3px 6px #000',
                margin: 0,
                fontFamily: 'LuckiestGuy, sans-serif',
                letterSpacing: isMobile ? '2px' : '3px',
                textAlign: 'center'
              }}>
                {minigame.name}
              </h2>

              {/* Botón grande */}
              <button
                onClick={() => navigate(minigame.route)}
                style={{
                  background: '#ff6b35',
                  border: isMobile ? '4px solid #fff' : '5px solid #fff',
                  borderRadius: isMobile ? '20px' : '25px',
                  color: '#fff',
                  fontSize: isMobile ? '28px' : isTablet ? '36px' : '42px',
                  fontWeight: 'bold',
                  padding: isMobile ? '25px 50px' : isTablet ? '30px 60px' : '35px 70px',
                  cursor: 'pointer',
                  textShadow: '2px 2px 4px #000',
                  fontFamily: 'LuckiestGuy, sans-serif',
                  letterSpacing: '1px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
                  minWidth: isMobile ? '200px' : '250px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#e55a2b';
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.5)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#ff6b35';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
                }}
              >
                JUGAR
              </button>
            </div>
          ))}
          </div>
        </div>
      </section>      {/* Fade debajo de la sección de minijuegos */}
      <section style={{
        minHeight: isMobile ? '20vh' : '30vh',
        background: `linear-gradient(to bottom, 
          transparent 0%, 
          #0f172a 100%)`,
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255, 255, 255, 0.3)',
          fontSize: isMobile ? '14px' : '16px',
          textAlign: 'center'
        }}>
          Explora más aventuras en {island.name}
        </div>
      </section>
    </div>
  );
};

export default IslandExploration;
