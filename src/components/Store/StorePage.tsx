import React from "react";
import StoreGrid from "./StoreGrid";
import { products } from "./products";
import { useInventory } from "../../context/InventoryContext";

const StorePage: React.FC = () => {

  const { inventory } = useInventory();

  const filteredProducts = products.filter((product) => {
    if (product.name === 'Máscaras') {
      return !inventory.some((item) => item.product.name === 'Máscaras' && item.product.id === product.id);
    }
    return true;
  });

  return (
    <StoreGrid products={filteredProducts} />
  );
};

export default StorePage;
