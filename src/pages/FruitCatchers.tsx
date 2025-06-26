import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Islands/Navbar";
import { useEconomy } from "../context/EconomyContext";
import { Link } from "react-router-dom";
import '../FruitCatcher.css'

const UnityGame: React.FC = () => {
  const [score,setScore] = useState(0);
  const { addCurrency } = useEconomy();

  // Pantalla completa
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const handleUnityFullscreen = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const unityWindow = iframe.contentWindow as any;
    if (unityWindow && unityWindow.unityInstance) {
      unityWindow.unityInstance.SetFullscreen(1);
    } else {
      console.warn("unityInstance no está disponible aún");
    }
  };

  //Actualizar
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log(event.data);
      if (event.data?.type === 'UPDATE_POINTS') {
        addCurrency("wumpa", event.data.points);
        addCurrency("gem", event.data.gems);
        setScore(event.data.points)
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: '#1f202d',
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <Navbar username="Kevin" />
      {/* Título del juego */}
      <h1 style={{ color: "#ffe6d7", marginBottom: "1rem" }}>Fruit Catchers</h1>

      {/* Contenedor del juego */}
      <div className="unity-game-container">
        <iframe
          ref={iframeRef}
          src="/game/index.html"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            border: "3px solid",
            borderRadius: "20px"
          }}
          allowFullScreen
        ></iframe>
      </div>

      {/* Puntaje + botón */}
      <div style={{ marginTop: "1rem", textAlign: "center", color: "white" }}>
        <p className="points">Puntaje obtenido: <strong>{score}</strong></p>
        <Link to="/home">
          <button
            className="minigame-fruitCatcher-button"
          >
            Volver a Inicio
          </button>
        </Link>
        
        <button
          onClick={handleUnityFullscreen}
          className="minigame-fruitCatcher-button"
        >
          Pantalla Completa
        </button>
      </div>
    </div>
  );
};

export default UnityGame;
