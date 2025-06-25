// ProductModal.tsx
import React, { useState } from "react";
import type { Product } from "./products";
import "./ProductModal.css";
import { useEconomy } from "../../context/EconomyContext";
import { useInventory } from "../../context/InventoryContext";

interface Props {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<Props> = ({ product, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const { spendCurrency } = useEconomy();
  const { addToInventory } = useInventory();
  const currencyIcons = {
    wumpa: "/images/wumpa-fruit.png",
    gem: "/images/purple-crystal.webp",
    golden: "/icons/golden-fruit.png",
  };

  const handleBuy = () => {
    const success = spendCurrency(product.currency, product.price);
    if (success) {
      addToInventory(product)
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
            <div className="modal-price">
              <img src={currencyIcons[product.currency]} alt="Fruta" className="fruit-icon" />
              <h2>{product.price}</h2>
            </div>
            {product.colors.length > 1 && (
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
            )}

            <button className="buy-button" onClick={handleBuy}>Comprar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
