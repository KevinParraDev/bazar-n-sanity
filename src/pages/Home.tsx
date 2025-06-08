import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/wumpa-island">Explore Wumpa Island</Link> | <Link to="/island-of-lost-treasures">Explore Island Of Lost Treasures</Link>
      </nav>
    </div>
  );
};

export default Home;