export const productDetailAttributes = [
  {
    name: "name",
    placeholder: `Tên rút gọn "i7 14650HX RAM 16GB SSD 1TB RTX 4060 16" 2.5K 165Hz"`,
    rules: [{ required: true, message: "Không được để trống" }],
  },
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
    name: "scanFrequency",
    placeholder: `Tần số quét (165Hz)`,
    rules: [{ required: true, message: "Không được để trống" }],
  },
  {
    name: "price",
    placeholder: "Giá sản phẩm",
    rules: [
      { pattern: /^[0-9]+$/, message: "Sai định dạng vui lòng nhập số!" },
    ],
  },
  {
    name: "gpu",
    placeholder: `Card đồ họa (RTX 4060, Intel Iris Xe, v.v.)`,
  },
  {
    name: "battery",
    placeholder: `Dung lượng pin (56Wh, 99Wh)`,
  },
  {
    name: "weight",
    placeholder: `Cân nặng (1.5kg, 2.3kg, v.v.)`,
  },
  {
    name: "os",
    placeholder: `Hệ điều hành (Window 11)`,
  },
  {
    name: "connectionPort",
    placeholder: `Cổng kết nối (Type-C 1 Jack 3.5 mm 1 Thunderbolt 1 khe cắm thẻ nhớ SD  )`,
  },
  {
    name: "warranty",
    placeholder: `Bảo hành (tháng)`,
    rules: [
      { pattern: /^[0-9]+$/, message: "Sai định dạng vui lòng nhập số!" },
    ],
  },
  {
    name: "stock",
    placeholder: `Số lượng trong kho`,
    rules: [
      { pattern: /^[0-9]+$/, message: "Sai định dạng vui lòng nhập số!" },
    ],
  },
];
