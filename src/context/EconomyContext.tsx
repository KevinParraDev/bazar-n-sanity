import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface EconomyContextType {
  wumpaCount: number;
  addWumpa: (amount: number) => void;
  spendWumpa: (amount: number) => boolean;
  resetWumpas: () => void;
}

const EconomyContext = createContext<EconomyContextType | undefined>(undefined);

export const EconomyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializar desde localStorage o 0 si no existe
  const [wumpaCount, setWumpaCount] = useState(() => {
    const saved = localStorage.getItem('wumpaCount');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Guardar en localStorage cada vez que cambie el contador
  useEffect(() => {
    localStorage.setItem('wumpaCount', wumpaCount.toString());
  }, [wumpaCount]);

  const addWumpa = (amount: number) => {
    setWumpaCount((prev) => prev + amount);
  };
  const spendWumpa = (amount: number): boolean => {
    if (amount > wumpaCount) return false;
    setWumpaCount((prev) => prev - amount);
    return true;
  };

  const resetWumpas = () => {
    setWumpaCount(0);
  };

  return (
    <EconomyContext.Provider value={{ wumpaCount, addWumpa, spendWumpa, resetWumpas }}>
      {children}
    </EconomyContext.Provider>
  );
};

export const useEconomy = (): EconomyContextType => {
  const context = useContext(EconomyContext);
  if (!context) throw new Error("useEconomy debe usarse dentro de EconomyProvider");
  return context;
};
