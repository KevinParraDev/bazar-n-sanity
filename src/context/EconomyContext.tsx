import React, { createContext, useContext, useState, type ReactNode } from "react";

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

export const EconomyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wumpaCount, setWumpaCount] = useState(300);
  const [gemCount, setGemCount] = useState(5);
  const [goldenCount, setGoldenCount] = useState(0);
  const [relicCount, setRelicCount] = useState(5); // Comenzar con 5 reliquias para prueba

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
