import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product } from '../components/Store/products-separated';
import { defaultMask } from '../components/Store/products-separated';

interface InventoryItem {
  product: Product;
  quantity: number;
}

interface InventoryContextType {
  inventory: InventoryItem[];
  equippedMask: Product | null;
  addToInventory: (product: Product) => void;
  equipMask: (mask: Product) => void;
  getMasks: () => InventoryItem[];
  getCollectibles: () => InventoryItem[];
  hasItem: (product: Product) => boolean;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializar inventario con Mask Velo por defecto
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { product: defaultMask, quantity: 1 }
  ]);
  
  // Mask Velo equipada por defecto
  const [equippedMask, setEquippedMask] = useState<Product | null>(defaultMask);

  const addToInventory = (product: Product) => {
    setInventory((prev) => {
      console.log('Se añadió', product.name, 'al inventario');
      const index = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.product.colors[0].name === product.colors[0].name
      );

      // Solo agregar si no existe (cantidades siempre serán 1)
      if (index === -1) {
        return [...prev, { product, quantity: 1 }];
      }
      return prev; // No agregar si ya existe
    });
  };

  const equipMask = (mask: Product) => {
    if (mask.category === 'mask') {
      setEquippedMask(mask);
      console.log('Máscara equipada:', mask.name);
    }
  };

  const getMasks = () => {
    return inventory.filter(item => item.product.category === 'mask');
  };

  const getCollectibles = () => {
    return inventory.filter(item => item.product.category === 'collectible');
  };

  const hasItem = (product: Product): boolean => {
    return inventory.some(
      (item) =>
        item.product.id === product.id &&
        item.product.colors[0].name === product.colors[0].name
    );
  };


  return (
    <InventoryContext.Provider value={{ 
      inventory, 
      equippedMask,
      addToInventory, 
      equipMask,
      getMasks,
      getCollectibles,
      hasItem
    }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = (): InventoryContextType => {
  const context = useContext(InventoryContext);
  if (!context) throw new Error('useInventory debe usarse dentro de InventoryProvider');
  return context;
};
