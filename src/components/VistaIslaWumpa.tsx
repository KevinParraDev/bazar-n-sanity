import React, { useState } from 'react';
import Ruleta from './Ruleta';

type Recompensa =
  | { tipo: 'frutas'; cantidad: number }
  | { tipo: 'amuleto'; valor: string };

export default function VistaIslaWumpa() {
  const [mostrarRuleta, setMostrarRuleta] = useState(false);
  const [frutasWumpa, setFrutasWumpa] = useState(0);
  const [amuletos, setAmuletos] = useState<string[]>([]);

  const manejarRecompensa = (recompensa: Recompensa) => {
    if (recompensa.tipo === 'frutas') {
      setFrutasWumpa((prev) => prev + recompensa.cantidad);
    } else if (recompensa.tipo === 'amuleto') {
      setAmuletos((prev) => [...prev, recompensa.valor]);
    }
  };

  return (
    <div className="vista-isla">
      <header className="vista-header">
        <h1>Isla Wumpa</h1>
        <div>
          <img src="/wumpa.png" alt="Frutas Wumpa" width={32} height={32} style={{ marginRight: '0.5rem' }} />
          x {frutasWumpa}
        </div>
      </header>

      <section className="vista-productos">
        <h2>Productos del Bazar (Vista de Exhibición)</h2>
        <div className="vista-grid">
          <div className="producto">
            <img src="/objeto1.png" alt="Objeto 1" width={96} height={96} />
            <p>Máscara Aku Aku</p>
          </div>
          <div className="producto">
            <img src="/objeto2.png" alt="Objeto 2" width={96} height={96} />
            <p>Gema Azul</p>
          </div>
        </div>
      </section>

      <button className="jugar-btn" onClick={() => setMostrarRuleta(true)}>
        🎰 JUGAR MINIJUEGO
      </button>

      {mostrarRuleta && (
        <Ruleta
          onCerrar={() => setMostrarRuleta(false)}
          onRecompensa={manejarRecompensa}
        />
      )}
    </div>
  );
}
