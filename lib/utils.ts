export function truncateString(str: any, n = 40) {
  if (str.length > n) {
    return str.substring(0, n) + "...";
  } else {
    return str;
  }
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export function calculateSubtotal(cart: any) {
  let subtotal = 0;
  cart.map((item: any, i: number) => {
    subtotal = item.product.price * item.quantity;
  });
  return subtotal;
}
