import React, { useState } from "react";
import type { Product } from "./products";
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

  const handleFlip = () => setFlipped((prev) => !prev);

  return (
    <div className={`product-card ${flipped ? "flipped" : ""}`} onClick={handleFlip}>
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
        </div>

        {/* Reverso */}
        <div
          className="product-card-back"
          onClick={(e) => {
            e.stopPropagation(); // Evita que el click se propague al padre
            setFlipped(false);   // Regresa la carta al frente
          }}
        >
          <h3>{product.name}</h3>
          <p>
            <div className="product-price-back">
              {product.price}
              <img
                src={currencyIcons[product.currency]}
                alt="Moneda"
                className="fruit-icon"
              />
            </div>
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Para que no gire al hacer clic en el botón
              onBuy(product);
            }}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
