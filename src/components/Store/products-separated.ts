export type CurrencyType = 'wumpa' | 'gem' | 'golden';

export interface ProductColor {
  name: string;
  image: string;
  price?: number;
  currency?: CurrencyType;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  currency: CurrencyType;
  colors: ProductColor[];
  category: 'mask' | 'collectible';
}

// Máscaras para la Isla Wumpa - precios progresivos
export const wumpaMasks: Product[] = [
  // Aku Aku - Variantes
  {
    id: 1,
    name: "Máscara Aku Aku",
    price: 1,
    currency: "gem",
    category: "mask",
    colors: [
      { name: "Básica", image: "/images/mask/aku-aku-basic.png" },
    ],
  },
  {
    id: 2,
    name: "Máscara Aku Aku",
    price: 2,
    currency: "gem",
    category: "mask",
    colors: [
      { name: "Azul", image: "/images/mask/aku-aku-blue.png" },
    ],
  },
  {
    id: 3,
    name: "Máscara Aku Aku",
    price: 3,
    currency: "gem",
    category: "mask",
    colors: [
      { name: "Verde", image: "/images/mask/aku-aku-green.png" },
    ],
  },
  {
    id: 4,
    name: "Máscara Aku Aku",
    price: 4,
    currency: "gem",
    category: "mask",
    colors: [
      { name: "Púrpura", image: "/images/mask/aku-aku-purple.png" },
    ],
  },
  // Uka Uka - Variantes
  {
    id: 5,
    name: "Máscara Uka Uka",
    price: 5,
    currency: "gem",
    category: "mask",
    colors: [
      { name: "Básica", image: "/images/mask/uka-uka-basic.png" },
    ],
  },
  {
    id: 6,
    name: "Máscara Uka Uka",
    price: 6,
    currency: "gem",
    category: "mask",
    colors: [
      { name: "Azul", image: "/images/mask/uka-uka-blue.png" },
    ],
  },
  {
    id: 7,
    name: "Máscara Uka Uka",
    price: 7,
    currency: "gem",
    category: "mask",
    colors: [
      { name: "Verde", image: "/images/mask/uka-uka-green.png" },
    ],
  },
  {
    id: 8,
    name: "Máscara Uka Uka",
    price: 8,
    currency: "gem",
    category: "mask",
    colors: [
      { name: "Púrpura", image: "/images/mask/uka-uka-purple.png" },
    ],
  },
  // Apo Apo - Variantes
  {
    id: 9,
    name: "Máscara Apo Apo",
    price: 9,
    currency: "gem",
    category: "mask",
    colors: [
      { name: "Básica", image: "/images/mask/apo-apo-basic.png" },
    ],
  },
  {
    id: 10,
    name: "Máscara Apo Apo",
    price: 10,
    currency: "gem",
    category: "mask",
    colors: [
      { name: "Azul", image: "/images/mask/apo-apo-blue.png" },
    ],
  },
  {
    id: 11,
    name: "Máscara Apo Apo",
    price: 11,
    currency: "gem",
    category: "mask",
    colors: [
      { name: "Verde", image: "/images/mask/apo-apo-green.png" },
    ],
  },
  {
    id: 12,
    name: "Máscara Apo Apo",
    price: 12,
    currency: "gem",
    category: "mask",
    colors: [
      { name: "Púrpura", image: "/images/mask/apo-apo-purple.png" },
    ],
  },
];

// Coleccionables para la Isla de Tesoros
export const treasureCollectibles: Product[] = [
  {
    id: 5,
    name: "Bomba",
    price: 80,
    currency: "wumpa",
    category: "collectible",
    colors: [
      { name: "Clásica", image: "/images/bomb.png" },
    ],
  },
  {
    id: 6,
    name: "Poción Verde",
    price: 90,
    currency: "wumpa",
    category: "collectible",
    colors: [
      { name: "Verde", image: "/images/green-beaker.png" },
    ],
  },
  {
    id: 7,
    name: "Poción Roja",
    price: 90,
    currency: "wumpa",
    category: "collectible",
    colors: [
      { name: "Roja", image: "/images/red-beaker.png" },
    ],
  },
  {
    id: 8,
    name: "TNT",
    price: 100,
    currency: "wumpa",
    category: "collectible",
    colors: [
      { name: "Clásico", image: "/images/tnt.png" },
    ],
  },
  {
    id: 9,
    name: "Nitro",
    price: 110,
    currency: "wumpa",
    category: "collectible",
    colors: [
      { name: "Clásico", image: "/images/nitro.png" },
    ],
  },
  {
    id: 10,
    name: "Escudo",
    price: 110,
    currency: "wumpa",
    category: "collectible",
    colors: [
      { name: "Azul", image: "/images/blue-power-shield.png" },
    ],
  },
  {
    id: 11,
    name: "Misil",
    price: 110,
    currency: "wumpa",
    category: "collectible",
    colors: [
      { name: "Clásico", image: "/images/misil.png" },
    ],
  },
  {
    id: 12,
    name: "Reloj",
    price: 120,
    currency: "wumpa",
    category: "collectible",
    colors: [
      { name: "Clásico", image: "/images/clock.png" },
    ],
  },
  {
    id: 13,
    name: "Invisibilidad",
    price: 130,
    currency: "wumpa",
    category: "collectible",
    colors: [
      { name: "Clásica", image: "/images/invisibility.png" },
    ],
  },
  {
    id: 14,
    name: "Super Motor",
    price: 140,
    currency: "wumpa",
    category: "collectible",
    colors: [
      { name: "Clásico", image: "/images/super-engine.png" },
    ],
  },
  {
    id: 15,
    name: "Orbe de Teletransporte",
    price: 150,
    currency: "wumpa",
    category: "collectible",
    colors: [
      { name: "Clásico", image: "/images/warp-orb.png" },
    ],
  },
];

// Máscara Velo por defecto (no se vende, se incluye automáticamente)
export const defaultMask: Product = {
  id: 4,
  name: "Máscara Velo",
  price: 0,
  currency: "gem",
  category: "mask",
  colors: [
    { name: "Básica", image: "/images/mask-velo.png" },
  ],
};

// Combinación de todos los productos para compatibilidad
export const products: Product[] = [...wumpaMasks, ...treasureCollectibles];
