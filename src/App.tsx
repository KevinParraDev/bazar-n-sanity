import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import IslandOfLostTreasures from './pages/IslandOfLostTreasures'
import IslandExploration from './pages/IslandExploration'
// import WumpaIsland from './pages/WumpaIsland'
// import CatchGame from './pages/CatchGame'
import UnityGame from './pages/FruitCatchers';
import CrashFlap from './pages/CrashFlap';
import './App.css'
import './FruitCatcher.css'
import StorePage from './pages/StorePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore/:islandId" element={<IslandExploration />} />
      <Route path="/wumpa-island" element={<UnityGame />} />
      <Route path="/island-of-lost-treasures" element={<IslandOfLostTreasures/>} />
      <Route path="/crashflap" element={<CrashFlap />} />
      <Route path="/store" element={<StorePage />} />
    </Routes>
  )
}

export default App
