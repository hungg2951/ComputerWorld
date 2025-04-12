import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaGift } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getItemLocalStorage } from "../../../ultis/getItemLocalStore";
import Swal from "sweetalert2";
import { Button, message } from "antd";
import { checkToken, getUserIdFromToken } from "../../../ultis/isAuthenticated";
import { useDispatch } from "react-redux";
import { applyVoucher } from "../../../redux/slice/voucherSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const [discount, setDiscount] = useState(0);
  const navigation = useNavigate();
  const [dataCart, setDataCart] = useState([]);
  const [voucher, setVoucher] = useState("");
  const [messageVoucher, setMessageVoucher] = useState("");
  const dispatch = useDispatch()
  const addVoucher =()=>{
    if(!voucher || voucher.trim() === "") return toast.warning("Vui lòng nhập mã giảm giá")
    if (!checkToken()) {
      Swal.fire({
        title: "Thông báo",
        text: "Vui lòng đăng nhập để áp dụng mã giảm giá",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    dispatch(applyVoucher({code:voucher,userId:getUserIdFromToken(),orderTotal:getTotalPrice()})).unwrap()
    .then((res)=>{
      setDiscount(res.discount)
      setMessageVoucher("")
      toast.success(res.message)
    })
    .catch((e)=>{
      setDiscount(0)
      setMessageVoucher(e.message)
    })
  }

  const Payment = () => {
    navigation("/payment", {
      state: { cart: dataCart, totalPrice: getTotalPrice(), discount },
    });
  };
  let cart = getItemLocalStorage("cart");
  useEffect(() => {
    if (cart) {
      setDataCart(cart);
    }
  }, []);
  // Hàm cập nhật localStorage
  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setDataCart(updatedCart);
  };
  // Hàm tăng số lượng sản phẩm
  const increase = (id) => {
    const updatedCart = dataCart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateLocalStorage(updatedCart);
  };

  // Hàm giảm số lượng sản phẩm
  const decrease = (id) => {
    const updatedCart = dataCart
      .map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
      .filter((item) => item.quantity > 0); // Loại bỏ sản phẩm nếu quantity = 0

    updateLocalStorage(updatedCart);
  };
  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeItem = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Sản phẩm này sẽ bị xóa khỏi giỏ hàng!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa ngay!",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Đã xóa!",
          text: "Sản phẩm đã bị xóa khỏi giỏ hàng.",
          icon: "success",
          timer: 1100, // Tự tắt sau 1.5 giây
          showConfirmButton: false,
        });
        const updatedCart = cart.filter((item) => item._id !== id);
        updateLocalStorage(updatedCart);
      }
    });
  };
  // Hàm tính tổng tiền
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  if (!dataCart || dataCart.length === 0)
    return (
      <div className="min-h-80 flex justify-center items-center text-xl">
        <div>
          <h1 className="font-bold">Giỏ hàng của bạn đang rỗng</h1>
          <Button onClick={()=>navigation('/')} className="w-full">Tiếp tục mua sắm</Button>
        </div>
      </div>
    );
  return (
    <>
      <div className="p-4 md:p-8 min-h-screen mt-20 max-w-[1220px] mx-auto max-sm:w-full max-sm:p-0">
        <div className="max-w-full mx-auto bg-white p-6 rounded-lg flex justify-between gap-5 max-sm:flex-wrap">
          <div className="w-2/3 shadow-md rounded-lg p-5 max-sm:w-full">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <input type="checkbox" className="mr-2" /> Chọn tất cả (1)
            </h2>
            {dataCart &&
              dataCart.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-start gap-4 mt-4 border-b pb-4"
                >
                  <img
                    src={item.product_id ? item.product_id.image : ""}
                    alt="Laptop"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">
                      <span className="capitalize">
                        {`[${item && item.status}]`}{" "}
                      </span>
                      <span>{item && item.product_id.name} </span>
                      <span>{item && item.year} </span>
                      <span>{item && item.name}</span>
                    </h3>
                    <p className="text-gray-500 text-sm">Màu: Bạc</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-red-600 font-semibold text-lg">
                        {item.price.toLocaleString()}
                      </span>
                      <span className="text-gray-400 line-through">
                        
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border px-3 py-1 rounded-lg">
                    <button onClick={() => decrease(item._id)}>-</button>
                    <span className="px-2">{item.quantity}</span>
                    <button onClick={() => increase(item._id)}>+</button>
                  </div>
                  <button
                    className="text-red-500 pt-1"
                    onClickCapture={() => removeItem(item._id)}
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              ))}
          </div>
          <div className="w-1/3 shadow-md rounded-lg max-sm:w-full">
            <div className=" p-4 rounded-lg shadow-sm">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <FaGift className="text-red-500" /> Quà tặng
              </h3>
              <div className="mt-2 flex justify-between gap-2">
                <input
                  className="w-3/4 text-sm p-2 border border-blue-600 rounded focus:outline-none focus:ring-0"
                  type="text"
                  placeholder="Nhập voucher khuyến mãi"
                  onChange={(e)=> setVoucher(e.target.value)}
                />
                
                <button onClick={()=>addVoucher()} className="px-2 border text-sm border-blue-600 rounded hover:bg-blue-600 hover:text-white text-blue-600">
                  Áp dụng
                </button>
              </div>
            <p className="text-red-600 text-sm">{messageVoucher}</p>
            </div>
            <div className="mt-6 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Thông tin đơn hàng</h3>
              <div className="flex justify-between pb-2 text-sm border-b border-gray-200">
                <span>Tổng tiền</span>
                <span>{getTotalPrice().toLocaleString("vi")} đ</span>
              </div>
              <div className="flex justify-between mt-2 text-sm pb-2 border-b border-gray-20">
                <span>Mã giảm giá</span>
                <span className="text-red-500">
                  -{discount.toLocaleString()} đ
                </span>
              </div>
              <div className="flex justify-between mt-2 text-lg font-semibold">
                <span>Cần thanh toán</span>
                <span className="text-red-600">{(getTotalPrice()-discount).toLocaleString()} đ</span>
              </div>
              <button
                onClick={() => Payment()}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
              >
                Xác nhận đơn
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
