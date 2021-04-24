interface ProductImage {
  url: string;
  alt?: string;
}

export interface Discount {
  value: number;
}

export type Stock = {
  id: string;
  quantity: number;
};

export interface Variants {
  isInStock?: boolean;
  lastPrice?: number;
  availableForSales?: boolean;
}

export type Product = {
  id: string;
  category: string;
  name: string;
  images: ProductImage[];
  price: number;
  variants: Variants;
};

export type CartItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  image: string;
};

export type Cart = {
  customerId?: string;
  email?: string;
  createdAt: string;
  currency: string;
  cartItens: CartItem[];
  // the sum of all the prices of all the item in the cart.
  // Duties, taxes, shipping and discounts exclued.
  carItensSubTotalPrice: number;
  //The sum of all the prices of all the item in the cart.
  //Duties, taxes and discounts inclued.
  totalItensOnCart: number;
  totalPrice: number;
  discounts?: Discount[];
};

export type CarouselItem = {
  id: number;
  image: string;
  text: string[];
};

export type CarouselData = {
  itens: CarouselItem[];
};

export type User = {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
};
