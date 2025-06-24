import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import IslandOfLostTreasures from './pages/IslandOfLostTreasures'
// import WumpaIsland from './pages/WumpaIsland'
// import CatchGame from './pages/CatchGame'
import UnityGame from './pages/FruitCatchers';
import './App.css'
import './FruitCatcher.css'
import StorePage from './pages/StorePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wumpa-island" element={<UnityGame />} />
      <Route path="/island-of-lost-treasures" element={<IslandOfLostTreasures/>} />
    </Routes>
  )
}

export default App
