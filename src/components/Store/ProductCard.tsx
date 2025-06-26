import React, { useState } from "react";
import type { Product } from "./products-separated";
import { useInventory } from "../../context/InventoryContext";
import "./ProductCard.css";

interface Props {
  product: Product;
  onBuy: (product: Product) => void;
}

const currencyIcons = {
  wumpa: "/images/wumpa-fruit.png",
  gem: "/images/purple-crystal.webp",
  golden: "/icons/golden-fruit.png",
};

const ProductCard: React.FC<Props> = ({ product, onBuy }) => {
  const [flipped, setFlipped] = useState(false);
  const { hasItem } = useInventory();

  const handleFlip = () => setFlipped((prev) => !prev);

  // Detectar si el texto es largo para aplicar estilos especiales
  const isLongName = product.name.length > 15;
  const isLongColor = product.colors[0].name.length > 8;
  
  // Verificar si el item ya fue comprado
  const isOwned = hasItem(product);

  return (
    <div className={`product-card ${flipped ? "flipped" : ""} ${isOwned ? "owned" : ""}`} onClick={!isOwned ? handleFlip : undefined}>
      <div className="product-card-inner">
        {/* Frente */}
        <div className="product-card-front">
          <img
            src={product.colors[0].image}
            alt={product.name}
            className="product-image"
          />
          <div className="product-price">
            <img
              src={currencyIcons[product.currency]}
              alt="Moneda"
              className="fruit-icon"
            />
            {product.price}
          </div>
          {isOwned && (
            <div className="owned-overlay">
              <div className="owned-checkmark">✓</div>
              <div className="owned-text">COMPRADO</div>
            </div>
          )}
        </div>

        {/* Reverso */}
        <div
          className="product-card-back"
          onClick={(e) => {
            e.stopPropagation(); // Evita que el click se propague al padre
            setFlipped(false);   // Regresa la carta al frente
          }}
        >
          <div className="product-info">
            <h3 className={isLongName ? "long-text" : ""}>{product.name}</h3>
            <div className={`product-color ${isLongColor ? "long-text" : ""}`}>{product.colors[0].name}</div>
          </div>
          <div className="product-price-back">
            {product.price}
            <img
              src={currencyIcons[product.currency]}
              alt="Moneda"
              className="fruit-icon"
            />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Para que no gire al hacer clic en el botón
              if (!isOwned) {
                onBuy(product);
                setFlipped(false);
              }
            }}
            disabled={isOwned}
            className={isOwned ? "owned-button" : ""}
          >
            {isOwned ? "COMPRADO" : "Comprar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
