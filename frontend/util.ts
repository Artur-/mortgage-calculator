import "@vaadin/vaadin-notification";

const pctFormatter = new Intl.NumberFormat("en", {
  style: "percent",
  minimumFractionDigits: 2
});

const formatCurrency = (amount: number, decimals: number) => {
  const formatter = new Intl.NumberFormat("fi", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  return formatter.format(amount);
};
const formatPct = (amount: number) => {
  return pctFormatter.format(amount / 100);
};
const showNotification = (text: string) => {
  const n = _showNotification(text);
  n.position = "middle";
};
const showErrorNotification = (text: string) => {
  const n = _showNotification(text);
  n.setAttribute("theme", "error");
  n.position = "middle";
  n.duration = -1;
};
const _showNotification = (text: string) => {
  const n: any = document.createElement("vaadin-notification");
  const tpl = document.createElement("template");
  const span = document.createElement("span");
  span.innerText = text;
  tpl.content.appendChild(span);
  n.appendChild(tpl);
  document.body.appendChild(n);
  n.opened = true;
  n.addEventListener("opened-changed", (e: any) => {
    if (!e.detail.opened) {
      document.body.removeChild(n);
    }
  });
  n._container.addEventListener("click", () => {
    n.opened = false;
  });
  return n;
};

export { formatCurrency, formatPct, showNotification, showErrorNotification };
