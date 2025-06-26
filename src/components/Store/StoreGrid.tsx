import React from "react";
import type { Product } from "./products";
import ProductCard from "./ProductCard";
import "./StoreGrid.css";
import { useEconomy } from "../../context/EconomyContext";
import { useInventory } from "../../context/InventoryContext";

interface Props {
  products: Product[];
}

const StoreGrid: React.FC<Props> = ({ products }) => {
  const { getCurrency, spendCurrency } = useEconomy();
  const {addToInventory} = useInventory()

  const handleBuy = (product: Product) => {
    const balance = getCurrency(product.currency);

    if (balance < product.price) {
      alert("No tienes suficientes " + product.currency);
      return;
    }
    console.log('Se añadió', product.name, 'al inventario');
    spendCurrency(product.currency, product.price);
    addToInventory(product);
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
