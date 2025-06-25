import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product } from '../components/Store/products';

interface InventoryItem {
  product: Product;
  quantity: number;
}

interface InventoryContextType {
  inventory: InventoryItem[];
  addToInventory: (product: Product) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const addToInventory = (product: Product) => {
  setInventory((prev) => {
    console.log('Se añadió', product.name, 'al inventario');
    const index = prev.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.product.colors[0].name === product.colors[0].name
    );

    if (index !== -1) {
      const updated = [...prev];
      updated[index].quantity += 1;
      return updated;
    } else {
      return [...prev, { product, quantity: 1 }];
    }
  });
};

  return (
    <InventoryContext.Provider value={{ inventory, addToInventory }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = (): InventoryContextType => {
  const context = useContext(InventoryContext);
  if (!context) throw new Error('useInventory debe usarse dentro de InventoryProvider');
  return context;
};
