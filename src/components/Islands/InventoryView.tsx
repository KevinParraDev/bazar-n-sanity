import React from 'react';
import { useInventory } from '../../context/InventoryContext';

const InventoryView: React.FC = () => {
    const { inventory } = useInventory();

    return (
        <div>
            <div className="store-grid">
            {inventory.map((item) => (
                <div className="product-card" key={item.product.id + item.product.colors[0].name}>
                    <div className="product-card-inner product-card-front">
                        <img src={item.product.colors[0].image} alt={item.product.name} className="inventory-image" />
                        <div className="product-price">x{item.quantity}</div>
                    </div>
                </div>
            ))}
            
        </div>
        {inventory.length==0 && (
                <h2 style={{textAlign: 'center', fontSize: '30px'}}>Aún no haz comprado nada...</h2>
            )}
        </div>
    );
};

export default InventoryView;
