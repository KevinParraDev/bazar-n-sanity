import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product } from '../components/Store/products-separated';
import { defaultMask } from '../components/Store/products-separated';
import { useAuth } from './AuthContext';

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
  
  const { userId, isAuthenticated } = useAuth();

  // Generar claves únicas para cada usuario
  const getUserInventoryKey = () => userId ? `gameInventory_${userId}` : 'gameInventory_guest';
  const getUserEquippedMaskKey = () => userId ? `equippedMask_${userId}` : 'equippedMask_guest';

  // Resetear a inventario por defecto
  const resetToDefaultInventory = () => {
    setInventory([{ product: defaultMask, quantity: 1 }]);
    setEquippedMask(defaultMask);
  };

  // Cargar inventario del usuario específico del localStorage al inicializar
  useEffect(() => {
    if (isAuthenticated && userId) {
      const userInventoryKey = getUserInventoryKey();
      const userEquippedMaskKey = getUserEquippedMaskKey();
      
      const savedInventory = localStorage.getItem(userInventoryKey);
      
      if (savedInventory) {
        try {
          const inventoryData = JSON.parse(savedInventory);
          
          // Asegurar que siempre tenga la máscara por defecto
          const hasDefaultMask = inventoryData.some((item: InventoryItem) => 
            item.product.id === defaultMask.id
          );
          
          if (!hasDefaultMask) {
            inventoryData.unshift({ product: defaultMask, quantity: 1 });
          }
          
          setInventory(inventoryData);
        } catch (error) {
          console.error('Error loading user inventory data:', error);
          resetToDefaultInventory();
        }
      } else {
        // Usuario nuevo - establecer inventario por defecto
        resetToDefaultInventory();
      }

      // Cargar máscara equipada del usuario
      const savedEquippedMask = localStorage.getItem(userEquippedMaskKey);
      if (savedEquippedMask) {
        try {
          const maskData = JSON.parse(savedEquippedMask);
          setEquippedMask(maskData);
        } catch (error) {
          console.error('Error loading user equipped mask:', error);
          setEquippedMask(defaultMask);
        }
      } else {
        // Usuario nuevo - máscara por defecto
        setEquippedMask(defaultMask);
      }
    }
  }, [userId, isAuthenticated]);

  // Guardar inventario específico del usuario en localStorage cada vez que cambie
  useEffect(() => {
    if (isAuthenticated && userId && inventory.length > 0) {
      const userInventoryKey = getUserInventoryKey();
      localStorage.setItem(userInventoryKey, JSON.stringify(inventory));
    }
  }, [inventory, userId, isAuthenticated]);

  // Guardar máscara equipada específica del usuario en localStorage cada vez que cambie
  useEffect(() => {
    if (isAuthenticated && userId && equippedMask) {
      const userEquippedMaskKey = getUserEquippedMaskKey();
      localStorage.setItem(userEquippedMaskKey, JSON.stringify(equippedMask));
    }
  }, [equippedMask, userId, isAuthenticated]);

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
      console.log('Máscara equipada:', mask.name, 'ID:', mask.id, 'Color:', mask.colors[0].name);
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
        item.product.colors[0].name === product.colors[0].name &&
        item.product.name === product.name
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
