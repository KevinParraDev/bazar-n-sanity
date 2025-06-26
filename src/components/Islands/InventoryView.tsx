import React from 'react';
import { useInventory } from '../../context/InventoryContext';
import './InventoryView.css';

const InventoryView: React.FC = () => {
    const { getMasks, getCollectibles, equippedMask, equipMask } = useInventory();
    
    const masks = getMasks();
    const collectibles = getCollectibles();

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
                    {masks.map((item) => (
                        <div 
                            className={`mask-card ${equippedMask?.id === item.product.id ? 'equipped' : ''}`} 
                            key={item.product.id + item.product.colors[0].name}
                        >
                            <div className="mask-card-inner">
                                <img 
                                    src={item.product.colors[0].image} 
                                    alt={item.product.name} 
                                    className="mask-image" 
                                />
                                <div className="mask-info">
                                    <h3>{item.product.name}</h3>
                                </div>
                                <button 
                                    className={`equip-button ${equippedMask?.id === item.product.id ? 'equipped-btn' : ''}`}
                                    onClick={() => handleEquipMask(item.product)}
                                    disabled={equippedMask?.id === item.product.id}
                                >
                                    {equippedMask?.id === item.product.id ? '✓ Equipada' : 'Equipar'}
                                </button>
                            </div>
                        </div>
                    ))}
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
