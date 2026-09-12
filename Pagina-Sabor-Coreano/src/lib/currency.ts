const formatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
});

export function formatPrice(price: number) {
  return formatter.format(price);
}
