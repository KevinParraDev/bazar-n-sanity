import React, { useState } from 'react';
import { wumpaMasks } from '../products-separated';
import ProductCard from '../ProductCard';
import { useEconomy } from '../../../context/EconomyContext';
import { useInventory } from '../../../context/InventoryContext';
import './MaskStore.css';

const MaskStore: React.FC = () => {
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
      setNotification("No tienes suficientes gemas");
      setTimeout(() => setNotification(null), 2000);
    }
  };

  return (
    <div className="mask-store">
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
      
      <div className="mask-store-header">
        <h2>🎭 Bazar de Máscaras - Isla Wumpa</h2>
      </div>
      
      <div className="masks-grid-horizontal">
        {wumpaMasks.map((mask) => (
          <div key={mask.id} className="mask-card-container">
            <ProductCard
              product={mask}
              onBuy={handlePurchase}
            />
          </div>
        ))}
      </div>
      
      <div className="store-info">
        <p>✨ Las máscaras te otorgan un nuevo estilo en CrashFlap</p>
        <p>🔮 Los precios aumentan según la rareza de la máscara</p>
      </div>
    </div>
  );
};

export default MaskStore;
