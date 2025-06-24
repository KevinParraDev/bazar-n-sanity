import React, { createContext, useContext, useState, type ReactNode } from "react";

interface EconomyContextType {
  wumpaCount: number;
  addWumpa: (amount: number) => void;
  spendWumpa: (amount: number) => boolean;
}

const EconomyContext = createContext<EconomyContextType | undefined>(undefined);

export const EconomyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wumpaCount, setWumpaCount] = useState(0);

  const addWumpa = (amount: number) => {
    setWumpaCount((prev) => prev + amount);
  };

  const spendWumpa = (amount: number): boolean => {
    if (amount > wumpaCount) return false;
    setWumpaCount((prev) => prev - amount);
    return true;
  };

  return (
    <EconomyContext.Provider value={{ wumpaCount, addWumpa, spendWumpa }}>
      {children}
    </EconomyContext.Provider>
  );
};

export const useEconomy = (): EconomyContextType => {
  const context = useContext(EconomyContext);
  if (!context) throw new Error("useEconomy debe usarse dentro de EconomyProvider");
  return context;
};
