import { useEconomy } from '../context/EconomyContext';
import { useAuth } from '../context/AuthContext';

// Valores por defecto para reset
const defaultCurrencies = {
  wumpa: 300,
  gem: 5,
  golden: 0,
  relic: 5
};

export const useGameDataReset = () => {
  const { setCurrency } = useEconomy();
  const { userId } = useAuth();

  const resetEconomy = () => {
    setCurrency('wumpa', defaultCurrencies.wumpa);
    setCurrency('gem', defaultCurrencies.gem);
    setCurrency('golden', defaultCurrencies.golden);
    setCurrency('relic', defaultCurrencies.relic);
    console.log('💰 Monedas reseteadas para usuario:', userId);
  };

  const resetInventory = () => {
    if (userId) {
      // Limpiar localStorage específico del usuario
      localStorage.removeItem(`gameInventory_${userId}`);
      localStorage.removeItem(`equippedMask_${userId}`);
      
      // Recargar la página para aplicar el reset
      window.location.reload();
    }
  };

  const resetAll = () => {
    if (userId) {
      // Limpiar todos los datos específicos del usuario
      localStorage.removeItem(`gameEconomy_${userId}`);
      localStorage.removeItem(`gameInventory_${userId}`);
      localStorage.removeItem(`equippedMask_${userId}`);
      
      // También limpiar datos generales del juego
      localStorage.removeItem('crashFlap_hasSeenRules');
      
      // Recargar la página para aplicar el reset completo
      window.location.reload();
    }
  };

  return {
    resetEconomy,
    resetInventory,
    resetAll
  };
};
