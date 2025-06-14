import React, { useState } from 'react';

type Recompensa =
  | { tipo: 'frutas'; cantidad: number }
  | { tipo: 'amuleto'; valor: string };

interface RuletaProps {
  onCerrar: () => void;
  onRecompensa: (r: Recompensa) => void;
}

const amuletosPosibles = ['Amuleto Rojo', 'Amuleto Verde', 'Amuleto Azul'];

const Ruleta: React.FC<RuletaProps> = ({ onCerrar, onRecompensa }) => {
  const [girando, setGirando] = useState(false);
  const [resultado, setResultado] = useState<Recompensa | null>(null);

  const girarRuleta = () => {
    setGirando(true);
    setResultado(null);

    setTimeout(() => {
      const tipo = Math.random() < 0.6 ? 'frutas' : 'amuleto';
      const recompensa: Recompensa =
        tipo === 'frutas'
          ? { tipo: 'frutas', cantidad: Math.floor(Math.random() * 10) + 1 }
          : {
              tipo: 'amuleto',
              valor: amuletosPosibles[Math.floor(Math.random() * amuletosPosibles.length)],
            };

      setResultado(recompensa);
      onRecompensa(recompensa);
      setGirando(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div className="bg-yellow-100 p-6 rounded-xl text-black max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-4">🎯 Ruleta Wumpa</h2>

        {resultado ? (
          <div className="my-4">
            {resultado.tipo === 'frutas' ? (
              <p>¡Ganaste {resultado.cantidad} 🍌 frutas Wumpa!</p>
            ) : (
              <p>¡Conseguiste un amuleto: {resultado.valor}!</p>
            )}
          </div>
        ) : (
          <p className="mb-4">{girando ? 'Girando la ruleta...' : 'Pulsa el botón para girar'}</p>
        )}

        <button
          onClick={girarRuleta}
          disabled={girando}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Girar
        </button>

        <button onClick={onCerrar} className="block mt-4 text-sm text-blue-600 underline">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Ruleta;
