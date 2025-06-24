export interface ProductColor {
  name: string;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  colors: ProductColor[];
}