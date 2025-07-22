import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useAuth } from "./AuthContext";

export type CurrencyType = "wumpa" | "gem" | "golden" | "relic";

interface EconomyContextType {
  wumpaCount: number;
  gemCount: number;
  goldenCount: number;
  relicCount: number;
  addCurrency: (type: CurrencyType, amount: number) => void;
  spendCurrency: (type: CurrencyType, amount: number) => boolean;
  setCurrency: (type: CurrencyType, amount: number) => void;
  getCurrency: (type: CurrencyType) => number;
}

const EconomyContext = createContext<EconomyContextType | undefined>(undefined);

// Valores por defecto para cada nuevo usuario
const defaultCurrencies = {
  wumpa: 300,
  gem: 5,
  golden: 0,
  relic: 5
};

export const EconomyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wumpaCount, setWumpaCount] = useState(defaultCurrencies.wumpa);
  const [gemCount, setGemCount] = useState(defaultCurrencies.gem);
  const [goldenCount, setGoldenCount] = useState(defaultCurrencies.golden);
  const [relicCount, setRelicCount] = useState(defaultCurrencies.relic);
  
  const { userId, isAuthenticated } = useAuth();

  // Generar clave única para cada usuario
  const getUserEconomyKey = () => userId ? `gameEconomy_${userId}` : 'gameEconomy_guest';

  // Cargar datos del usuario específico del localStorage al inicializar
  useEffect(() => {
    if (isAuthenticated && userId) {
      const userEconomyKey = getUserEconomyKey();
      const savedEconomy = localStorage.getItem(userEconomyKey);
      
      if (savedEconomy) {
        try {
          const economyData = JSON.parse(savedEconomy);
          setWumpaCount(economyData.wumpa ?? defaultCurrencies.wumpa);
          setGemCount(economyData.gem ?? defaultCurrencies.gem);
          setGoldenCount(economyData.golden ?? defaultCurrencies.golden);
          setRelicCount(economyData.relic ?? defaultCurrencies.relic);
        } catch (error) {
          console.error('Error loading user economy data:', error);
          // Si hay error, usar valores por defecto
          resetToDefaults();
        }
      } else {
        // Usuario nuevo - establecer valores por defecto
        resetToDefaults();
      }
    }
  }, [userId, isAuthenticated]);

  // Resetear a valores por defecto
  const resetToDefaults = () => {
    setWumpaCount(defaultCurrencies.wumpa);
    setGemCount(defaultCurrencies.gem);
    setGoldenCount(defaultCurrencies.golden);
    setRelicCount(defaultCurrencies.relic);
  };

  // Guardar en localStorage específico del usuario cada vez que cambien las monedas
  useEffect(() => {
    if (isAuthenticated && userId) {
      const userEconomyKey = getUserEconomyKey();
      const economyData = {
        wumpa: wumpaCount,
        gem: gemCount,
        golden: goldenCount,
        relic: relicCount
      };
      localStorage.setItem(userEconomyKey, JSON.stringify(economyData));
    }
  }, [wumpaCount, gemCount, goldenCount, relicCount, userId, isAuthenticated]);

  const addCurrency = (type: CurrencyType, amount: number) => {
    if (type === "wumpa") setWumpaCount(prev => prev + amount);
    else if (type === "gem") setGemCount(prev => prev + amount);
    else if (type === "golden") setGoldenCount(prev => prev + amount);
    else if (type === "relic") setRelicCount(prev => prev + amount);
  };

  const spendCurrency = (type: CurrencyType, amount: number): boolean => {
    if (type === "wumpa" && wumpaCount >= amount) {
      setWumpaCount(prev => prev - amount);
      return true;
    } else if (type === "gem" && gemCount >= amount) {
      setGemCount(prev => prev - amount);
      return true;
    } else if (type === "golden" && goldenCount >= amount) {
      setGoldenCount(prev => prev - amount);
      return true;
    } else if (type === "relic" && relicCount >= amount) {
      setRelicCount(prev => prev - amount);
      return true;
    }
    return false;
  };

  const setCurrency = (type: CurrencyType, amount: number) => {
    if (type === "wumpa") setWumpaCount(amount);
    else if (type === "gem") setGemCount(amount);
    else if (type === "golden") setGoldenCount(amount);
    else if (type === "relic") setRelicCount(amount);
  };

  const getCurrency = (type: CurrencyType): number => {
    if (type === "wumpa") return wumpaCount;
    else if (type === "gem") return gemCount;
    else if (type === "golden") return goldenCount;
    else if (type === "relic") return relicCount;
    return 0;
  };

  return (
    <EconomyContext.Provider
      value={{
        wumpaCount,
        gemCount,
        goldenCount,
        relicCount,
        addCurrency,
        spendCurrency,
        setCurrency,
        getCurrency,
      }}
    >
      {children}
    </EconomyContext.Provider>
  );
};

export const useEconomy = (): EconomyContextType => {
  const context = useContext(EconomyContext);
  if (!context) throw new Error("useEconomy debe usarse dentro de EconomyProvider");
  return context;
};
