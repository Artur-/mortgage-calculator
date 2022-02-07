const pctFormatter = new Intl.NumberFormat("en", {
  style: "percent",
  minimumFractionDigits: 2,
});

const formatCurrency = (amount: number, decimals: number) => {
  const formatter = new Intl.NumberFormat("fi", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return formatter.format(amount);
};
const formatPct = (amount: number) => {
  return pctFormatter.format(amount / 100);
};

export { formatCurrency, formatPct };
