const formatter = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "EUR"
});

export const formatCurrency = (amount: number) => {
  return formatter.format(amount);
};
