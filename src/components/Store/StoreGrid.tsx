import React, { useState } from "react";
import type { Product } from "./types";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import "./StoreGrid.css";

interface Props {
  products: Product[];
}

const StoreGrid: React.FC<Props> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <div className="store-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={setSelectedProduct}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default StoreGrid;
