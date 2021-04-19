export function formatPrice(price: number): string {
  return Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(price);
}
