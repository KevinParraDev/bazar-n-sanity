import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import IslandOfLostTreasures from './pages/IslandOfLostTreasures'
import WumpaIsland from './pages/WumpaIsland'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wumpa-island" element={<WumpaIsland />} />
      <Route path="/island-of-lost-treasures" element={<IslandOfLostTreasures />} />
    </Routes>
  )
}

export default App
