import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Islands/Navbar';
import '../components/Islands/Navbar.css';
import '../IslandExploration.css';
import bgWumpaIsland from '../assets/background_wumpa_island.png';
import bgIslandOfLostTreasures from '../assets/background_island_of_lost_treasures.png';
import minigameWumpa from '../assets/minigame-wumpa.png';
import minigameLostTreasures from '../assets/minigame-lost-treasures.png';
import { useState, useEffect } from 'react';
import StorePage from '../components/Store/StorePage';
import WordleGame from '../components/wordle/WordleGame';
import Ruleta from '../components/Ruleta';


const islandsConfig = {
  'wumpa-island': {
    name: 'ISLA WUMPA',
    backgroundImage: bgWumpaIsland,
    minigameBackground: minigameWumpa,
    minigames: [
      { id: 'fruit-catcher', name: 'FRUIT CATCHER', route: '/wumpa-island' }
    ]
  },
  'lost-treasures': {
    name: 'ISLA DE TESOROS PERDIDOS',
    backgroundImage: bgIslandOfLostTreasures,
    minigameBackground: minigameLostTreasures,
    minigames: [
      { id: 'crash-flap', name: 'CRASH FLAP', route: '/crashflap' },
      { id: 'wordle', name: 'CRASH WORDLE', route: '/wordle'}
    ]
  }
};

const IslandExploration = () => {
  const { islandId } = useParams<{ islandId: string }>();
  const navigate = useNavigate();

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
    return <div className="not-found">Isla no encontrada</div>;
  }

  return (
    <div className="island-wrapper">
      <section
        className="island-section"
        style={{
          background: `linear-gradient(to bottom, 
            transparent 0%, transparent 50%, rgba(15, 23, 42, 0.1) 60%, 
            rgba(15, 23, 42, 0.3) 75%, rgba(15, 23, 42, 0.6) 85%, 
            rgba(15, 23, 42, 0.9) 95%, #0f172a 100%), 
            url(${island.backgroundImage}) center center / cover no-repeat`
        }}
      >
        <Navbar username="Kevin" />
        <div className={`island-title-container ${isMobile ? 'mobile' : ''}`}>
          <h1 className={`island-title ${isMobile ? 'mobile' : isTablet ? 'tablet' : ''}`}>
            {island.name}
          </h1>
        </div>

        
      </section>

        <div className="bazaar-section">
          <h2 className="bazaar-title">BAZAR</h2>
          <div className="bazaar-container">
            <StorePage />
          </div>
        </div>
        {islandId === 'wumpa-island' && (
          <section className="roulette-section">
            <h2 className="roulette-title">MINIJUEGO – RULETA</h2>
                
            <div className="roulette-full">
              <Ruleta />
            </div>
          </section>
        )}


      <section
        className="minigame-section"
        style={{ background: `url(${island.minigameBackground}) center center / cover no-repeat` }}
      >
        <div className={`minigame-content ${isMobile ? 'mobile' : ''}`}>
          <div className={`minigame-list ${isMobile ? 'mobile' : ''}`}>
            {island.minigames.map((minigame) => (
              <div key={minigame.id}>
                <h2 className={`minigame-title ${isMobile ? 'mobile' : isTablet ? 'tablet' : ''}`}>
                  {minigame.name}
                </h2>
                <button
                  className={`minigame-button ${isMobile ? 'mobile' : isTablet ? 'tablet' : ''}`}
                  onClick={() => navigate(minigame.route)}
                >
                  JUGAR
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`minigame-fade ${isMobile ? 'mobile' : ''}`}>
        <div className={`minigame-fade-text ${isMobile ? 'mobile' : ''}`}>
          Explora más aventuras en {island.name}
        </div>
      </section>
    </div>
  );
};

export default IslandExploration;
