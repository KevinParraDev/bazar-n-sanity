import { Link } from 'react-router-dom';

const IslandOfLostTreasures = () => {
  return (
    <div>
      <h1>Island Of Lost Treasures</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/wumpa-island">Explore Wumpa Island</Link>
      </nav>
    </div>
  );
};

export default IslandOfLostTreasures;