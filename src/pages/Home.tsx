import { Link } from 'react-router-dom';
import bgWumpaIsland from '../assets/background_wumpa_island.png'
import bgIslandOfLostTreasures from '../assets/background_island_of_lost_treasures.png'
import { useState } from 'react';
import Navbar from '../components/Islands/Navbar';


const islands = [
  {
    img: bgWumpaIsland,
    name: "Isla Wumpa",
    path: "/wumpa-island",
    exploreId: "wumpa-island"
  },
  {
    img: bgIslandOfLostTreasures,
    name: "Isla de los tesoros perdidos",
    path: "/island-of-lost-treasures",
    exploreId: "lost-treasures"
  },
];

const Home = () => {
  const [index, setIndex] = useState(0);

  const nextImage = () => setIndex((prev) => (prev + 1) % islands.length);
  const prevImage = () => setIndex((prev) => (prev - 1 + islands.length) % islands.length);

  return (
    <div
      className="w-screen h-screen bg-cover bg-center transition-all duration-700 relative overflow-hidden"
      style={{ backgroundImage: `url(${islands[index].img})` }}
    >
      <Navbar username="Kevin" />      {/* Botón principal */}
      <div className="absolute bottom-10 w-full flex justify-center md:w-40 md:right-20 md:left-auto md:justify-start">
        <Link to={`/explore/${islands[index].exploreId}`}>
          <button className="main-button">
            Explorar
          </button>
        </Link>
      </div>

      <div className="absolute top-10 w-full flex justify-center md:bottom-10 md:left-10 md:top-auto md:justify-start md:w-auto">
        <h1 className="island-name text-center md:text-left">
          {islands[index].name}
        </h1>
      </div>

      {/* Flechas de navegación */}
      <button
        onClick={prevImage}
        className="absolute left-10 top-1/2 -translate-y-1/2 move-arrows"
      >
        {"<"}
      </button>
      <button
        onClick={nextImage}
        className="absolute right-10 top-1/2 -translate-y-1/2 move-arrows"
      >
        {">"}
      </button>
    </div>
  );
};

export default Home;