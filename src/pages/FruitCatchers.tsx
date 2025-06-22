import React, { useEffect, useState, useRef} from "react";
import bgWumpaIsland from '../assets/background_wumpa_island.png'

const UnityGame: React.FC = () => {
  const [points, setPoints] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleUnityFullscreen = () => {
  const iframe = iframeRef.current;
  if (!iframe) return;

  // Accede al iframe y llama a SetFullscreen
  const unityWindow = iframe.contentWindow as any;
  if (unityWindow && unityWindow.unityInstance) {
    unityWindow.unityInstance.SetFullscreen(1);
  } else {
    console.warn("unityInstance no está disponible aún");
  }
};

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log(event.data);

      // Validación opcional de tipo
      if (event.data?.type === 'UPDATE_POINTS') {
        setPoints(event.data.points);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: '#1f202d',
    padding: "1rem",
    boxSizing: "border-box",
  }}
>
  {/* Título del juego */}
  <h1 style={{ color: "#ffe6d7", marginBottom: "1rem" }}>Fruit Catchers</h1>

  {/* Contenedor del juego */}
  <div
    style={{
      width: "100%",
      maxWidth: "960px",
      aspectRatio: "960 / 600",
      maxHeight: "100%",
    }}
  >
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
    <p className="points">Puntaje obtenido: <strong>{points}</strong></p>
    <button
      onClick={() => (window.location.href = "/")}
      className="minigame-button"
    >
      Volver a Inicio
    </button>
    <button
        onClick={handleUnityFullscreen}
        className="minigame-button"
      >
        Full Screen
      </button>
  </div>
</div>
  );
};

export default UnityGame;
