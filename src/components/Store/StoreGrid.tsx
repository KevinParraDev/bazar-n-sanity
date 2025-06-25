import React from "react";
import type { Product } from "./products";
import ProductCard from "./ProductCard";
import "./StoreGrid.css";
import { useEconomy } from "../../context/EconomyContext";

interface Props {
  products: Product[];
}

const StoreGrid: React.FC<Props> = ({ products }) => {
  const { getCurrency, spendCurrency } = useEconomy();

  const handleBuy = (product: Product) => {
    const balance = getCurrency(product.currency);

    if (balance < product.price) {
      alert("No tienes suficientes " + product.currency);
      return;
    }

    spendCurrency(product.currency, product.price);
    alert("¡Has comprado " + product.name + "!");
  };

  return (
    <div className="store-grid">
      {products.map((product, index) => (
        <ProductCard
          key={`${product.id}-${index}`}
          product={product}
          onBuy={handleBuy}
        />
      ))}
    </div>
  );
};

export default StoreGrid;
