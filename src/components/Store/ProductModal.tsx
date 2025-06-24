// ProductModal.tsx
import React, { useState } from "react";
import type { Product } from "./types";
import "./ProductModal.css";
import { useEconomy } from "../../context/EconomyContext";

interface Props {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<Props> = ({ product, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const { spendWumpa } = useEconomy();

  const handleBuy = () => {
    const success = spendWumpa(product.price);
    if (success) {
      alert("¡Compra exitosa!");
    } else {
      alert("¡No tienes suficientes frutas Wumpa!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-large">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-body">
          <img
            src={selectedColor.image}
            alt={`${product.name} ${selectedColor.name}`}
            className="modal-image"
          />
          <div className="modal-info">
            <h2 className="product-name">{product.name}</h2>
            <p className="modal-price">💰 {product.price}</p>

            <div className="color-selector">
              <p>Color:</p>
              <div className="color-options">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`color-button ${selectedColor.name === color.name ? "selected" : ""}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            <button className="buy-button" onClick={handleBuy}>Comprar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
