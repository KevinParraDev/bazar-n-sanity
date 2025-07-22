import React from 'react';
import { useInventory } from '../../context/InventoryContext';
import './InventoryView.css';

const InventoryView: React.FC = () => {
    const { getMasks, getCollectibles, equippedMask, equipMask } = useInventory();
    
    const masks = getMasks();
    const collectibles = getCollectibles();

    // Debug: Log para verificar el estado
    console.log('InventoryView - Equipped mask:', equippedMask);
    console.log('InventoryView - Total masks:', masks.length);

    const handleEquipMask = (mask: any) => {
        equipMask(mask);
    };

    return (
        <div className="inventory-container">
            {/* Sección de Máscaras */}
            <div className="inventory-section">
                <h2 className="section-title">🎭 Máscaras</h2>
                <p className="section-subtitle">Equipa una máscara para usar en CrashFlap</p>
                
                <div className="masks-grid">
                    {masks.map((item) => {
                        // Verificar si esta máscara específica está equipada comparando id y color
                        const isEquipped = equippedMask?.id === item.product.id && 
                                         equippedMask?.colors[0]?.name === item.product.colors[0]?.name;
                        
                        return (
                            <div 
                                className={`mask-card ${isEquipped ? 'equipped' : ''}`} 
                                key={`mask-${item.product.id}-${item.product.colors[0].name}`}
                            >
                                <div className="mask-card-inner">
                                    <img 
                                        src={item.product.colors[0].image} 
                                        alt={item.product.name} 
                                        className="mask-image" 
                                    />
                                    <div className="mask-info">
                                        <h3>{item.product.name}</h3>
                                        <p className="mask-variant">{item.product.colors[0].name}</p>
                                    </div>
                                    <button 
                                        className={`equip-button ${isEquipped ? 'equipped-btn' : ''}`}
                                        onClick={() => handleEquipMask(item.product)}
                                        disabled={isEquipped}
                                    >
                                        {isEquipped ? '✓ Equipada' : 'Equipar'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {masks.length === 0 && (
                    <div className="empty-section">
                        <p>No tienes máscaras aún. Visita el Bazar de Máscaras en la Isla Wumpa.</p>
                    </div>
                )}
            </div>

            {/* Sección de Coleccionables */}
            <div className="inventory-section">
                <h2 className="section-title">💎 Coleccionables</h2>
                <p className="section-subtitle">Tesoros recolectados de las islas</p>
                
                <div className="collectibles-grid">
                    {collectibles.map((item) => (
                        <div className="collectible-card" key={item.product.id + item.product.colors[0].name}>
                            <div className="collectible-card-inner">
                                <img 
                                    src={item.product.colors[0].image} 
                                    alt={item.product.name} 
                                    className="collectible-image" 
                                />
                                <div className="collectible-info">
                                    <h4>{item.product.name}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {collectibles.length === 0 && (
                    <div className="empty-section">
                        <p>No tienes coleccionables aún. Explora la Isla de Tesoros Perdidos.</p>
                    </div>
                )}
            </div>
            
            {masks.length === 0 && collectibles.length === 0 && (
                <div className="completely-empty">
                    <h2>🎒 Inventario Vacío</h2>
                    <p>Explora las islas y visita los bazares para comenzar tu colección.</p>
                </div>
            )}
        </div>
    );
};

export default InventoryView;
