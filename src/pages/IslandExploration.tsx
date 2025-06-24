import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Islands/Navbar';
import '../components/Islands/Navbar.css';
import bgWumpaIsland from '../assets/background_wumpa_island.png';
import bgIslandOfLostTreasures from '../assets/background_island_of_lost_treasures.png';

// Configuración de las islas
const islandsConfig = {
  'wumpa-island': {
    name: 'ISLA WUMPA',
    backgroundImage: bgWumpaIsland,
    minigames: [
      {
        id: 'fruit-catcher',
        name: 'FRUIT CATCHER',
        route: '/wumpa-island'
      }
    ]
  },  'lost-treasures': {
    name: 'ISLA DE TESOROS PERDIDOS',
    backgroundImage: bgIslandOfLostTreasures,
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
  }  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* Sección 1: Imagen de la isla + Título + Transición gradual al Bazar */}
      <section style={{
        minHeight: '100vh',
        background: `linear-gradient(to bottom, 
          transparent 0%, 
          transparent 60%, 
          rgba(25, 39, 67, 0.1) 70%, 
          rgba(25, 39, 67, 0.3) 80%, 
          rgba(25, 39, 67, 0.6) 90%, 
          #192743 100%), 
          url(${island.backgroundImage}) center center / cover no-repeat`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Navbar igual que en Home */}
        <Navbar username="Kevin" />

        {/* Título de la isla */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
          paddingTop: '60px'
        }}>
          <h1 style={{
            color: '#fff',
            fontSize: '64px',
            fontWeight: 'bold',
            textShadow: '4px 4px 8px #000',
            margin: 0,
            fontFamily: 'LuckiestGuy, sans-serif',
            letterSpacing: '4px',
            textAlign: 'center'
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
            maxWidth: '1000px',
            width: '100%',
            minHeight: '300px',
            border: '3px dashed rgba(255, 255, 255, 0.5)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '24px',
              fontStyle: 'italic',
              textShadow: '2px 2px 4px #000',
              textAlign: 'center'
            }}>
              Próximamente... Objetos del bazar
            </p>
          </div>
        </div>
      </section>

      {/* Sección de transición suave con azul cielo nocturno */}
      <section style={{
        minHeight: '30vh',
        background: `linear-gradient(to bottom, 
          #192743 0%, 
          #1a2b4d 30%, 
          #1b2e52 60%, 
          #1c3157 100%)`,
        padding: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Contenido adicional del bazar si es necesario */}
        <div style={{
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.3)',
          fontSize: '18px'
        }}>
          {/* Espacio para contenido adicional del bazar */}
        </div>
      </section>

      {/* Transición gradual hacia la imagen de fondo del minijuego */}
      <div style={{
        height: '25vh',
        background: `linear-gradient(to bottom, 
          #1c3157 0%, 
          rgba(28, 49, 87, 0.9) 20%, 
          rgba(28, 49, 87, 0.7) 40%, 
          rgba(28, 49, 87, 0.5) 60%, 
          rgba(28, 49, 87, 0.3) 80%, 
          rgba(0, 0, 0, 0.4) 100%)`
      }} />

      {/* Sección 2: Minijuegos con imagen de fondo */}
      <section style={{
        minHeight: '100vh',
        background: `linear-gradient(to bottom, 
          rgba(0, 0, 0, 0.4) 0%, 
          rgba(0, 0, 0, 0.5) 30%, 
          rgba(0, 0, 0, 0.6) 70%, 
          rgba(0, 0, 0, 0.7) 100%), 
          url(${island.backgroundImage}) center center / cover no-repeat`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Contenido de minijuegos */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '800px',
          width: '100%',
          padding: '0 40px'
        }}>
          <h2 style={{
            color: '#fff',
            fontSize: '48px',
            fontWeight: 'bold',
            textShadow: '3px 3px 6px #000',
            marginBottom: '60px',
            fontFamily: 'LuckiestGuy, sans-serif',
            letterSpacing: '3px'
          }}>
            MINIJUEGOS
          </h2>

          {/* Lista de minijuegos */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px'
          }}>
            {island.minigames.map((minigame) => (
              <div
                key={minigame.id}
                style={{
                  background: 'rgba(0, 0, 0, 0.8)',
                  borderRadius: '20px',
                  padding: '40px',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backdropFilter: 'blur(5px)'
                }}
              >
                <h3 style={{
                  color: '#fff',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  margin: 0,
                  textShadow: '2px 2px 4px #000',
                  fontFamily: 'LuckiestGuy, sans-serif',
                  letterSpacing: '2px'
                }}>
                  {minigame.name}
                </h3>

                <button
                  onClick={() => navigate(minigame.route)}
                  style={{
                    background: '#ff6b35',
                    border: '3px solid #fff',
                    borderRadius: '15px',
                    color: '#fff',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    padding: '15px 35px',
                    cursor: 'pointer',
                    textShadow: '2px 2px 4px #000',
                    fontFamily: 'LuckiestGuy, sans-serif',
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#e55a2b';
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#ff6b35';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
                  }}
                >
                  JUGAR
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default IslandExploration;
