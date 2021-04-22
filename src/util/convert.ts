import { Product, CartItem } from "../@Types";

export function covertToCart(product: Product): CartItem {
  return {
    id: product.id,
    category: product.category,
    name: product.name,
    quantity: 1,
    price: product.price,
    image: product.images[0].url,
  };
}
