import React, { useRef, useState } from 'react';
import './Ruleta.css';

const opciones = [
  { nombre: 'Frutas Wumpa', imagen: '/images/fruta.png' },
  { nombre: 'Amuleto Rojo', imagen: '/images/amuletorojo.png' },
  { nombre: 'Amuleto Verde', imagen: '/images/amuletoverde.png' },
  { nombre: 'Amuleto Azul', imagen: '/images/amuletoazul.png' },
  { nombre: 'Bonus x2', imagen: '/images/bonus.png' },
  { nombre: 'Frutas Wumpa', imagen: '/images/fruta.png' }
];

export default function Ruleta() {
  const ruedaRef = useRef<HTMLDivElement>(null);
  const [girando, setGirando] = useState(false);
  const [resultado, setResultado] = useState<string | null>(null);

  const girar = () => {
    if (girando) return;
    setGirando(true);
    setResultado(null);

    const giros = Math.floor(Math.random() * 4) + 5;
    const anguloFinal = Math.floor(Math.random() * 360);
    const rotacionTotal = giros * 360 + anguloFinal;

    if (ruedaRef.current) {
      ruedaRef.current.style.transition = 'transform 4s ease-out';
      ruedaRef.current.style.transform = `rotate(${rotacionTotal}deg)`;
    }

    setTimeout(() => {
      const gradosPorOpcion = 360 / opciones.length;
      const angulo = (rotacionTotal % 360 + 360) % 360;
      const indice = Math.floor((opciones.length - (angulo / gradosPorOpcion)) % opciones.length);
      const opcionGanadora = opciones[indice];
      setResultado(opcionGanadora.nombre);
      setGirando(false);
    }, 4000);
  };

  return (
    <div className="ruleta-container">
      <h2>🎯 Mini juego Ruleta</h2>
      <div className="ruleta-wrapper">
        <div className="ruleta" ref={ruedaRef}>
          {opciones.map((opcion, i) => {
            const rotacion = (360 / opciones.length) * i;
            return (
              <div
                key={i}
                className="opcion"
                style={{ transform: `rotate(${rotacion}deg) translateY(-50%)` }}
              >
                <img src={opcion.imagen} alt={opcion.nombre} />
              </div>
            );
          })}
        </div>
        <div className="puntero">▼</div>
      </div>
      <button className="boton-girar" onClick={girar} disabled={girando}>
        {girando ? 'Girando...' : 'Girar'}
      </button>
      {resultado && <p className="resultado">¡Ganaste: {resultado}!</p>}
    </div>
  );
}
