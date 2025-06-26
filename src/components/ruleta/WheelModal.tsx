import React, { useState } from "react";
import "./WheelModal.css";
import { useEconomy } from "../../context/EconomyContext";

const segments = [
    { type: "wumpa", amount: 10 },
    { type: "gem", amount: 1 },
    { type: "wumpa", amount: 50 },
    { type: "wumpa", amount: 30 },
    { type: "gem", amount: 2 },
    { type: "wumpa", amount: 100 },
    { type: "gem", amount: 3 },
    { type: "wumpa", amount: 20 },
    { type: "wumpa", amount: 70 },
    { type: "gem", amount: 1 },
];

const getRewardByAngle = (angle: number) => {
    const normalized = angle % 360;
    const index = Math.floor((360 - normalized) / 36) % 10;
    return segments[index];
};

const WheelModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { addCurrency, spendCurrency, relicCount } = useEconomy();
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState<string | null>(null);
    const [notification, setNotification] = useState<string | null>(null);

    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSpin = () => {
        if (spinning) return;
        
        // Verificar si el jugador tiene suficientes reliquias
        if (relicCount < 5) {
            showNotification(`Necesitas ${5 - relicCount} reliquias más para girar`);
            return;
        }
        
        // Gastar las reliquias
        const success = spendCurrency('relic', 5);
        if (!success) {
            showNotification('Error: No se pudieron gastar las reliquias');
            return;
        }
        
        setSpinning(true);
        setResult(null);
        showNotification('5 reliquias gastadas. ¡Girando la ruleta!');

        const extraSpins = 5 * 360; // al menos 5 vueltas
        const randomAngle = Math.floor(Math.random() * 360);
        const finalAngle = extraSpins + randomAngle;

        setRotation(finalAngle); // React actualizará el estilo con transición

        setTimeout(() => {
            const reward = getRewardByAngle(randomAngle);
            addCurrency(reward.type as any, reward.amount);
            setResult(`¡Ganaste ${reward.amount} ${reward.type === "gem" ? "gema(s)" : "frutas wumpa"}!`);
            setSpinning(false);
            
            // Limpiar el resultado después de 4 segundos para permitir nuevos giros
            setTimeout(() => {
                setResult(null);
            }, 4000);
        }, 4000); // mismo tiempo que la transición
    };

    return (
        <div className="wheel-modal-backdrop" onClick={onClose}>
            {notification && (
                <div className="wheel-notification">
                    {notification}
                </div>
            )}
            
            <div className="wheel-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Gira la ruleta</h2>
                    <button className="close-button" onClick={onClose}>✕</button>
                </div>
                
                {/* Información de reliquias */}
                <div className="wheel-info">
                    <div className="wheel-cost">
                        <img src="/images/time_relic_crash.webp" alt="Reliquia" className="cost-icon" />
                        <span>Costo: 5 reliquias</span>
                    </div>
                    <div className="player-relics">
                        <img src="/images/time_relic_crash.webp" alt="Reliquia" className="cost-icon" />
                        <span>Tienes: {relicCount}</span>
                    </div>
                </div>
                
                <div className="wheel-wrapper">
                    <img
                        src="/images/ruleta.png"
                        alt="Ruleta"
                        className={`wheel-image ${spinning ? "spinning" : ""}`}
                        style={{ transform: `rotate(${rotation}deg)` }}
                    />
                    <div className="wheel-pointer">▼</div>
                </div>
                
                <button 
                    className={`button-wheel ${relicCount < 5 ? 'disabled' : ''}`} 
                    onClick={handleSpin} 
                    disabled={spinning || relicCount < 5}
                >
                    {spinning 
                        ? "Girando..." 
                        : relicCount < 5 
                            ? `Necesitas ${5 - relicCount} reliquias más` 
                            : "Girar (5 reliquias)"
                    }
                </button>
                
                {result && <p className="wheel-result">{result}</p>}
            </div>
        </div>
    );
};

export default WheelModal;
