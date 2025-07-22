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
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <Routes>
      <Route path="/home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/explore/:islandId" element={
        <ProtectedRoute>
          <IslandExploration />
        </ProtectedRoute>
      } />
      <Route path="/wumpa-island" element={
        <ProtectedRoute>
          <UnityGame />
        </ProtectedRoute>
      } />
      <Route path="/island-of-lost-treasures" element={
        <ProtectedRoute>
          <IslandOfLostTreasures/>
        </ProtectedRoute>
      } />
      <Route path="/crashflap" element={
        <ProtectedRoute>
          <CrashFlap />
        </ProtectedRoute>
      } />
      <Route path="/inventory" element={
        <ProtectedRoute>
          <Inventory />
        </ProtectedRoute>
      } />
      <Route path="/wordle" element={
        <ProtectedRoute>
          <WordlePage />
        </ProtectedRoute>
      } />
      <Route path="/" element={<AuthContainer />} />
    </Routes>
  )
}

export default App
