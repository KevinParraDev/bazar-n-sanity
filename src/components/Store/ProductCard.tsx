import React from "react";
import type { Product } from "./types";
import "./ProductCard.css";

interface Props {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onClick }) => {
  return (
    <div className="product-card" onClick={() => onClick(product)}>
      <div className="product-card-inner">
        <img src={product.colors[0].image} alt={product.name} className="product-image" />
        <div className="product-price">
          <img src="/images/wumpa-fruit.png" alt="Fruta" className="fruit-icon" />
          {product.price}
          </div>
      </div>
    </div>
  );
};

export default ProductCard;
