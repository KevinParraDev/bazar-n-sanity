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
  const [notification, setNotification] = useState<string | null>(null);
  const { addCurrency, spendCurrency, relicCount } = useEconomy();
  const { addToInventory } = useInventory();

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSpinClick = () => {
    if (mustSpin) return; // Evitar múltiples clicks
    
    // Verificar si el jugador tiene suficientes reliquias
    if (relicCount < 5) {
      console.log('No tienes suficientes reliquias. Tienes:', relicCount, 'Necesitas: 5');
      showNotification(`Necesitas ${5 - relicCount} reliquias más para girar`);
      return; // No hacer nada si no tiene suficientes reliquias
    }
    
    // Gastar las reliquias
    console.log('Intentando gastar 5 reliquias. Reliquias actuales:', relicCount);
    const success = spendCurrency('relic', 5);
    if (!success) {
      console.log('Error: No se pudieron gastar las reliquias');
      showNotification('Error: No se pudieron gastar las reliquias');
      return; // No hacer nada si no se pudieron gastar
    }
    
    console.log('Reliquias gastadas exitosamente. Iniciando giro...');
    showNotification('5 reliquias gastadas. ¡Girando la ruleta!');
    const newPrize = Math.floor(Math.random() * prizeData.length);
    setPrizeNumber(newPrize);
    setMustSpin(true);
    setSelectedPrize(null);
    
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
      showNotification(`¡Ganaste ${selected.value} frutas Wumpa!`);
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
      showNotification(`¡Ganaste: ${selected.value}!`);
    }

    setMustSpin(false);
  };

  return (
    <div className="ruleta-wrapper">
      {notification && (
        <div className="ruleta-notification">
          {notification}
        </div>
      )}
      
      <div className="ruleta-container">
        <div className="wheel-wrapper">
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
          
          {/* Imagen central de la ruleta - fuera del contenedor que gira */}
          <div className="wheel-center">
            <img 
              src="/images/ruleta.png" 
              alt="Ruleta" 
              className="center-image"
              onError={(e) => {
                // Fallback si la imagen no carga
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = '<div class="center-text">RULETA</div>';
              }}
            />
          </div>
          
          <div className="wheel-pointer"></div>
        </div>
        
        <div className="ruleta-spin-button">
          {/* Mostrar información de reliquias antes del botón */}
          <div className="ruleta-info">
            <div className="ruleta-cost">
              <img src="/images/time_relic_crash.webp" alt="Reliquia" className="cost-icon" />
              <span>Costo: 5 reliquias</span>
            </div>
            <div className="player-relics">
              <img src="/images/time_relic_crash.webp" alt="Reliquia" className="cost-icon" />
              <span>Tienes: {relicCount}</span>
            </div>
          </div>
          
          <button 
            onClick={handleSpinClick} 
            disabled={mustSpin || relicCount < 5}
            className={relicCount < 5 ? 'disabled' : ''}
          >
            {mustSpin 
              ? 'GIRANDO...' 
              : relicCount < 5 
                ? `NECESITAS ${5 - relicCount} RELIQUIAS MÁS` 
                : 'GIRAR RULETA'
            }
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
