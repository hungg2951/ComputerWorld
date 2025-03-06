export const FormatPriceVND = (price) => {
  return price.toLocaleString("vi", { style: "currency", currency: "VND" });
};
