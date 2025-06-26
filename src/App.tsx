import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import IslandOfLostTreasures from './pages/IslandOfLostTreasures'
import IslandExploration from './pages/IslandExploration'
import UnityGame from './pages/FruitCatchers';
import CrashFlap from './pages/CrashFlap';
import Inventory from './pages/Inventory';
import WordlePage from "./pages/WordlePage";
import './App.css'
import AuthContainer from './components/Islands/AuthContainer';


function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/explore/:islandId" element={<IslandExploration />} />
      <Route path="/wumpa-island" element={<UnityGame />} />
      <Route path="/island-of-lost-treasures" element={<IslandOfLostTreasures/>} />
      <Route path="/crashflap" element={<CrashFlap />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/wordle" element={<WordlePage />} />
      <Route path="/" element={<AuthContainer />} />
    </Routes>
  )
}

export default App
