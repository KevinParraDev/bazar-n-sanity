export type CurrencyType = 'wumpa' | 'gem' | 'golden';
export interface ProductColor {
  name: string;
  image: string;
  price?: number;             // solo si el color se vende aparte
  currency?: CurrencyType;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  currency: CurrencyType;     // 'wumpa' | 'gem'
  colors: ProductColor[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Mask Aku Aku",
    price: 1,
    currency: "gem",
    colors: [
      { name: "Aku Aku", image: "/images/mask-aku-aku.png" },
    ],
  },
  {
    id: 2,
    name: "Mask Uka Uka",
    price: 1,
    currency: "gem",
    colors: [
      { name: "Uka Uka", image: "/images/mask-uka-ula.png" },
    ],
  },
  {
    id: 3,
    name: "Mask Apo Apo",
    price: 1,
    currency: "gem",
    colors: [
      { name: "Apo Apo", image: "/images/mask-apo-apo.png" },
    ],
  },
  {
    id: 4,
    name: "Mask Velo",
    price: 1,
    currency: "gem",
    colors: [
      { name: "Velo", image: "/images/mask-velo.png" },
    ],
  },
  {
    id: 5,
    name: "Bomb",
    price: 80,
    currency: "wumpa",
    colors: [
      { name: "Bomba", image: "/images/bomb.png" },
    ],
  },
  {
    id: 6,
    name: "Green Beaker",
    price: 90,
    currency: "wumpa",
    colors: [
      { name: "Poción verde", image: "/images/green-beaker.png" },
    ],
  },
  {
    id: 7,
    name: "Red Beaker",
    price: 90,
    currency: "wumpa",
    colors: [
      { name: "Poción roja", image: "/images/red-beaker.png" },
    ],
  },
  {
    id: 8,
    name: "TNT",
    price: 100,
    currency: "wumpa",
    colors: [
      { name: "Clásico", image: "/images/tnt.png" },
    ],
  },
  {
    id: 9,
    name: "Nitro",
    price: 110,
    currency: "wumpa",
    colors: [
      { name: "Clásico", image: "/images/nitro.png" },
    ],
  },
  {
    id: 10,
    name: "Blue Power Shield",
    price: 110,
    currency: "wumpa",
    colors: [
      { name: "Clásico", image: "/images/blue-power-shield.png" },
    ],
  },
  {
    id: 11,
    name: "Missile",
    price: 110,
    currency: "wumpa",
    colors: [
      { name: "Clásico", image: "/images/misil.png" },
    ],
  },
  {
    id: 12,
    name: "Clock",
    price: 120,
    currency: "wumpa",
    colors: [
      { name: "Clásico", image: "/images/clock.png" },
    ],
  },
  {
    id: 13,
    name: "Invisibility",
    price: 130,
    currency: "wumpa",
    colors: [
      { name: "Clásico", image: "/images/invisibility.png" },
    ],
  },
  {
    id: 14,
    name: "Super Engine",
    price: 140,
    currency: "wumpa",
    colors: [
      { name: "Clásico", image: "/images/super-engine.png" },
    ],
  },
  {
    id: 15,
    name: "Warp Orb",
    price: 150,
    currency: "wumpa",
    colors: [
      { name: "Clásico", image: "/images/warp-orb.png" },
    ],
  },
];
