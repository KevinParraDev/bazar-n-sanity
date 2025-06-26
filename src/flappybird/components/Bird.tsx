import { useInventory } from '../../context/InventoryContext';
import { useState, useEffect } from 'react';

type BirdProps = { y: number };

const BIRD_SIZE = 40;

const Bird = ({ y }: BirdProps) => {
  const { equippedMask } = useInventory();
  const [prevY, setPrevY] = useState(y);
  const [isFlapping, setIsFlapping] = useState(false);
  
  // Detectar cuando el pájaro está subiendo (después de un salto)
  useEffect(() => {
    const velocity = y - prevY;
    
    if (velocity < -2) { // Si está subiendo rápido (acaba de saltar)
      setIsFlapping(true);
      const timer = setTimeout(() => setIsFlapping(false), 200);
      return () => clearTimeout(timer);
    } else {
      setIsFlapping(false);
    }
    
    setPrevY(y);
  }, [y, prevY]);
  
  // Calcular la rotación basada en la velocidad
  const velocity = y - prevY;
  const rotation = Math.max(-30, Math.min(30, velocity * 3));
  
  return (
    <div style={{
      position: 'absolute',
      left: 80,
      top: y,
      width: BIRD_SIZE,
      height: BIRD_SIZE,
      background: 'transparent',
      borderRadius: '50%',
      backgroundImage: `url(${equippedMask?.colors[0].image || '/images/mask-velo.png'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5))',
      transform: `rotate(${rotation}deg) ${isFlapping ? 'scale(1.1)' : 'scale(1)'}`,
      transition: isFlapping ? 'transform 0.1s ease-out' : 'transform 0.2s ease-in',
      animation: isFlapping ? 'bounce 0.2s ease-out' : 'none'
    }} title={`Crash con ${equippedMask?.name || 'Máscara Velo'}`}>
      <style>{`
        @keyframes bounce {
          0% { transform: rotate(${rotation}deg) scale(1); }
          50% { transform: rotate(${rotation - 10}deg) scale(1.15); }
          100% { transform: rotate(${rotation}deg) scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default Bird;