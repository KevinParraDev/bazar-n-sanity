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
    const { addCurrency } = useEconomy();
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState<string | null>(null);

    const handleSpin = () => {
        if (spinning) return;
        setSpinning(true);
        setResult(null);

        const extraSpins = 5 * 360; // al menos 5 vueltas
        const randomAngle = Math.floor(Math.random() * 360);
        const finalAngle = extraSpins + randomAngle;

        setRotation(finalAngle); // React actualizará el estilo con transición

        setTimeout(() => {
            const reward = getRewardByAngle(randomAngle);
            addCurrency(reward.type as any, reward.amount);
            setResult(`¡Ganaste ${reward.amount} ${reward.type === "gem" ? "gema(s)" : "frutas wumpa"}!`);
            setSpinning(false);
        }, 4000); // mismo tiempo que la transición
    };

    return (
        <div className="wheel-modal-backdrop" onClick={onClose}>
            <div className="wheel-modal" onClick={(e) => e.stopPropagation()}>
                <h2>Gira la ruleta</h2>
                <div className="wheel-wrapper">
                    <img
                        src="/images/ruleta.png"
                        alt="Ruleta"
                        className={`wheel-image ${spinning ? "spinning" : ""}`}
                        style={{ transform: `rotate(${rotation}deg)` }}
                    />
                    <div className="wheel-pointer">▼</div>
                </div>
                {!result ? (
                    <button className="button-wheel" onClick={handleSpin} disabled={spinning}>
                        {spinning ? "Girando..." : "Girar"}
                    </button>
                ) : (
                    <button className="button-wheel" onClick={onClose}>Cerrar</button>
                )}
                {result && <p className="wheel-result">{result}</p>}
            </div>
        </div>
    );
};

export default WheelModal;
