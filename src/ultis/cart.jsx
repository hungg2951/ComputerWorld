import { toast } from "react-toastify";

export const addToCart = (data) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const existingProductIndex = cart.findIndex((item) => item._id === data._id);

  if (existingProductIndex !== -1) {
    // Nếu có, tăng số lượng
    cart[existingProductIndex].quantity += 1;
  } else {
    // Nếu chưa, thêm sản phẩm mới vào giỏ hàng
    cart.push({ ...data, quantity: 1 });
  }

  // Lưu lại vào localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
};
