import { useState } from 'react';
import { useEconomy } from '../context/EconomyContext';
import { useInventory } from '../context/InventoryContext';
import { type Product } from './Store/products-separated';
import './Ruleta.css';

const prizeData = [
  { option: 'Wumpa x10', type: 'wumpa', value: 10, image: '/images/wumpa-fruit.png' },
  { option: 'Green Beaker', type: 'amulet', value: 'Green Beaker', image: '/images/green-beaker.png' },
  { option: 'Aku Aku Mask', type: 'amulet', value: 'Aku Aku', image: '/images/mask/mask-aku-aku-basic.png' },
  { option: 'Wumpa x20', type: 'wumpa', value: 20, image: '/images/wumpa-fruit.png' },
  { option: 'Apo Apo Blue', type: 'amulet', value: 'Apo Apo', image: '/images/mask/apo-apo-blue.png' },
  { option: 'Uka Uka Purple', type: 'amulet', value: 'Uka Uka', image: '/images/mask/uka-uka-purple.png' },
  { option: 'Red Beaker', type: 'amulet', value: 'Red Beaker', image: '/images/red-beaker.png' },
  { option: 'Clock', type: 'amulet', value: 'Clock', image: '/images/clock.png' },
];

export default function Ruleta() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState<null | typeof prizeData[0]>(null);
  const { addCurrency } = useEconomy();
  const { addToInventory } = useInventory();

  const handleSpinClick = () => {
    if (mustSpin) return; // Evitar múltiples clicks
    
    const newPrize = Math.floor(Math.random() * prizeData.length);
    setPrizeNumber(newPrize);
    setMustSpin(true);
    setSelectedPrize(null); // Limpiar mensaje mientras gira
    
    // Parar automáticamente después de 3 segundos
    setTimeout(() => {
      handleStopSpinning(newPrize);
    }, 3000);
  };

  const handleStopSpinning = (prizeIndex: number) => {
    const selected = prizeData[prizeIndex];
    setSelectedPrize(selected);

    if (selected.type === 'wumpa') {
      addCurrency('wumpa', selected.value as number);
    } else {
      const product: Product = {
        id: Date.now(),
        name: String(selected.value),
        price: 0,
        currency: 'wumpa',
        category: 'collectible', // Agregar la propiedad category requerida
        colors: [{ name: 'Default', image: selected.image }],
      };
      addToInventory(product);
    }

    setMustSpin(false);
  };

  return (
    <div className="ruleta-wrapper">
      <div className="ruleta-container">
        <div 
          className={`ruleta-wheel ${mustSpin ? 'spinning' : ''}`}
          style={{
            transform: `rotate(${mustSpin ? prizeNumber * (360 / prizeData.length) + 1440 : 0}deg)` // 1440 = 4 vueltas completas
          }}
        >
          {prizeData.map((item, index) => (
            <div
              key={index}
              className="wheel-segment"
              style={{
                transform: `rotate(${index * (360 / prizeData.length)}deg)`,
                backgroundColor: index % 2 === 0 ? '#d32f2f' : '#1976d2'
              }}
            >
              <div className="segment-content">
                <img src={item.image} alt={item.option} className="segment-image" />
                <span className="segment-text">{item.option}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="wheel-pointer"></div>
        
        <div className="ruleta-spin-button">
          <button onClick={handleSpinClick} disabled={mustSpin}>
            {mustSpin ? 'GIRANDO...' : 'JUGAR'}
          </button>
        </div>
      </div>

      <div className="resultado-info">
        {selectedPrize && (
          <>
            <h3>
              ¡Ganaste: {selectedPrize.type === 'wumpa'
                ? `${selectedPrize.value} frutas Wumpa`
                : selectedPrize.value}!
            </h3>
            <img src={selectedPrize.image} alt={selectedPrize.option} />
          </>
        )}
      </div>
    </div>
  );
}
