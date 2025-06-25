import React from "react";
import StoreGrid from "../components/Store/StoreGrid";
import { products } from "../components/Store/products";

const StorePage: React.FC = () => {
  return (
    <StoreGrid products={products} />
  );
};

export default StorePage;
