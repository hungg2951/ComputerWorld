export const productDetailAttributes = [
  {
    name: "cpu",
    placeholder: "CPU (Intel Core i7, Ryzen 7, v.v.)",
    rules: [{ required: true, message: "Không được để trống" }],
  },
  {
    name: "ram",
    placeholder: "Dung lượng RAM (8GB, 16GB, 32GB)",
    rules: [{ required: true, message: "Không được để trống" }],
  },
  {
    name: "storage",
    placeholder: "Ổ cứng (SSD 512GB, HDD 1TB)",
    rules: [{ required: true, message: "Không được để trống" }],
  },
  {
    name: "display",
    placeholder: `Màn hình (15.6" FHD, 17.3" 4K`,
    rules: [{ required: true, message: "Không được để trống" }],
  },
  {
    name: "price",
    placeholder: "Giá sản phẩm",
    rules: [
      { required: true, message: "Không được để trống" },
      { pattern: /^[0-9]+$/, message: "Sai định dạng vui lòng nhập số!" },
    ],
  },
  {
    name: "gpu",
    placeholder: `Card đồ họa (RTX 4060, Intel Iris Xe, v.v.)`,
    rules: [{ message: "Không được để trống" }],
  },
  {
    name: "battery",
    placeholder: `Dung lượng pin (56Wh, 99Wh)`,
    rules: [{ message: "Không được để trống" }],
  },
  {
    name: "weight",
    placeholder: `Cân nặng (1.5kg, 2.3kg, v.v.)`,
    rules: [{ message: "Không được để trống" }],
  },
  {
    name: "os",
    placeholder: `Hệ điều hành (Window 11)`,
    rules: [{ message: "Không được để trống" }],
  },
  {
    name: "warranty",
    placeholder: `Bảo hành (tháng)`,
    rules: [
      { message: "Không được để trống" },
      { pattern: /^[0-9]+$/, message: "Sai định dạng vui lòng nhập số!" },
    ],
  },
  {
    name: "stock",
    placeholder: `Số lượng trong kho`,
    rules: [
      { message: "Không được để trống" },
      { pattern: /^[0-9]+$/, message: "Sai định dạng vui lòng nhập số!" },
    ],
  },
];
