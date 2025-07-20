// src/context/InventoryContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product } from '../components/Store/products-separated';
import { defaultMask } from '../components/Store/products-separated';


let currentUserId: number | null = null;
export const setGlobalUserId = (id: number) => {
  currentUserId = id;
};


interface InventoryItem {
  product: Product;
  quantity: number;
}

interface InventoryContextType {
  inventory: InventoryItem[];
  equippedMask: Product | null;
  addToInventory: (product: Product, userId?: number) => void;
  equipMask: (mask: Product) => void;
  getMasks: () => InventoryItem[];
  getCollectibles: () => InventoryItem[];
  hasItem: (product: Product) => boolean;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { product: defaultMask, quantity: 1 }
  ]);

  const [equippedMask, setEquippedMask] = useState<Product | null>(defaultMask);

  const addToInventory = async (product: Product, userId?: number) => {
    setInventory((prev) => {
      const index = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.product.colors[0].name === product.colors[0].name
      );

      if (index === -1) {
        console.log('Se añadió', product.name, 'al inventario');
        return [...prev, { product, quantity: 1 }];
      }
      return prev;
    });

    // 🛰️ Enviar al backend si el usuario está logueado
    if (userId) {
      try {
        await fetch('http://localhost:3001/api/inventory/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            itemId: product.id,
            color: product.colors[0].name,
          }),
        });
        console.log('📦 Ítem registrado en la base de datos');
      } catch (error) {
        console.error('❌ Error al sincronizar inventario con backend:', error);
      }
    }
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
