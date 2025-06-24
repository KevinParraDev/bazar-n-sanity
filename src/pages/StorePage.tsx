import React from "react";
import StoreGrid from "../components/Store/StoreGrid";
import Navbar from "../components/Islands/Navbar";
import type { Product } from "../components/Store/types";

const products: Product[] = [
  {
    id: 1,
    name: "Máscaras",
    price: 100,
    colors: [
      { name: "Aku Aku", image: "/images/mask-aku-aku.png" },
      { name: "Uka Uka", image: "/images/mask-uka-ula.png" },
      { name: "Apo Apo", image: "/images/mask-apo-apo.png" },
    ],
  },
  {
    id: 2,
    name: "Bomba",
    price: 100,
    colors: [
      { name: "Bomba", image: "/images/bomb.png" },
    ],
  },
  {
    id: 3,
    name: "Pocion",
    price: 100,
    colors: [
      { name: "Pocion verde", image: "/images/green-beaker.png" },
      { name: "Pocion roja", image: "/images/red-beaker.png" },
    ],
  },
  {
    id: 4,
    name: "TNT",
    price: 100,
    colors: [
      { name: "Clásico", image: "/images/tnt.png" },
    ],
  },
  {
    id: 4,
    name: "nitro",
    price: 100,
    colors: [
      { name: "Clásico", image: "/images/nitro.png" },
    ],
  },
  
];

const StorePage: React.FC = () => {
  return (
    <div>
      <Navbar username="Kevin" />
      <h1 style={{ fontSize: "2rem", padding: "16px" }}>Bazar N. Sanity</h1>
      <StoreGrid products={products} />
    </div>
  );
};

export default StorePage;
