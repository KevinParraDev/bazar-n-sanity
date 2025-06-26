import React, { useState } from 'react';
import { treasureCollectibles } from '../products-separated';
import ProductCard from '../ProductCard';
import { useEconomy } from '../../../context/EconomyContext';
import { useInventory } from '../../../context/InventoryContext';
import './TreasureStore.css';

const TreasureStore: React.FC = () => {
  const { spendCurrency } = useEconomy();
  const { addToInventory, hasItem } = useInventory();
  const [notification, setNotification] = useState<string | null>(null);

  const handlePurchase = (product: any) => {
    // Verificar si ya se tiene el item
    if (hasItem(product)) {
      setNotification("Ya tienes este item");
      setTimeout(() => setNotification(null), 2000);
      return;
    }

    if (spendCurrency(product.currency, product.price)) {
      addToInventory(product);
      setNotification(`¡${product.name} comprado!`);
      setTimeout(() => setNotification(null), 2000);
    } else {
      setNotification("No tienes suficientes wumpas");
      setTimeout(() => setNotification(null), 2000);
    }
  };

  return (
    <div className="treasure-store">
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
      
      <div className="treasure-store-header">
        <h2>💎 Bazar de Tesoros - Isla Perdida</h2>
      </div>
      
      <div className="treasures-grid">
        {treasureCollectibles.map((treasure) => (
          <div key={treasure.id} className="treasure-card-container">
            <ProductCard
              product={treasure}
              onBuy={handlePurchase}
            />
          </div>
        ))}
      </div>
      
      <div className="store-info">
        <p>⚡ Colecciona poderosos artefactos de las islas perdidas</p>
        <p>🎯 Cada objeto tiene un poder único esperando ser descubierto</p>
      </div>
    </div>
  );
};

export default TreasureStore;
