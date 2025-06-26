import { Link } from 'react-router-dom';

const WumpaIsland = () => {
  return (
    <div>
      <h1>Wumpa Island</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/island-of-lost-treasures">Explore Island Of Lost Treasures</Link>
      </nav>
    </div>
  );
};

export default WumpaIsland;