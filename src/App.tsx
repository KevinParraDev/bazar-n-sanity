import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import IslandOfLostTreasures from './pages/IslandOfLostTreasures'
import IslandExploration from './pages/IslandExploration'
import UnityGame from './pages/FruitCatchers';
import CrashFlap from './pages/CrashFlap';
import Inventory from './pages/Inventory';
import './App.css'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore/:islandId" element={<IslandExploration />} />
      <Route path="/wumpa-island" element={<UnityGame />} />
      <Route path="/island-of-lost-treasures" element={<IslandOfLostTreasures/>} />
      <Route path="/crashflap" element={<CrashFlap />} />
      <Route path="/inventory" element={<Inventory />} />
    </Routes>
  )
}

export default App
