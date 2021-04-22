export function formatPrice(price: number): string {
  return Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(price);
}
