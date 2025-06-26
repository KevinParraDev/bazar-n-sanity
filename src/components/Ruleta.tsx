import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { useEconomy } from '../context/EconomyContext';
import { useInventory } from '../context/InventoryContext';
import { type Product } from './Store/products';
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
    const newPrize = Math.floor(Math.random() * prizeData.length);
    setPrizeNumber(newPrize);
    setMustSpin(true);
    setSelectedPrize(null); // Limpiar mensaje mientras gira
  };

  const handleStopSpinning = () => {
    const selected = prizeData[prizeNumber];
    setSelectedPrize(selected);

    if (selected.type === 'wumpa') {
      addCurrency('wumpa', selected.value as number);
    } else {
      const product: Product = {
        id: Date.now(),
        name: String(selected.value),
        price: 0,
        currency: 'wumpa', // or 'gem', depending on your logic
        colors: [{ name: 'Default', image: selected.image }],
      };
      addToInventory(product);
    }

    setMustSpin(false);
  };

  return (
    <div className="ruleta-wrapper">
      <div className="ruleta-wheel">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={prizeData.map(item => ({ option: item.option }))}
          outerBorderColor="#ffd700"
          outerBorderWidth={8}
          radiusLineColor="#ffffff"
          radiusLineWidth={2}
          textColors={['#fff']}
          fontSize={16}
          backgroundColors={['#d32f2f', '#1976d2']}
          onStopSpinning={handleStopSpinning}
        />

        <div className="ruleta-spin-button">
          <button onClick={handleSpinClick}>JUGAR</button>
        </div>
      </div>

      <div className="resultado-info">
        {selectedPrize && (
          <>
            <h3>
              ¡Ganaste: {selectedPrize.type === 'wumpa'
                ? `          ${selectedPrize.value} frutas Wumpa`
                : selectedPrize.value}!
            </h3>
            <img src={selectedPrize.image} alt={selectedPrize.option} />
          </>
        )}
      </div>
    </div>
  );
}
