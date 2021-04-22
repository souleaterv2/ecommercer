import { Product } from "../../@Types";
import { ProductCard } from "./ProductCard";

interface ProductsProps {
  content: Product[];
}

export const Products = ({ content }: ProductsProps) => {
 
  return (
    <>
      {content.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </>
  );
};
