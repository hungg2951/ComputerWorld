import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaGift } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const price = 13990000;
  const originalPrice = 16490000;
  const discount = originalPrice - price;
  const navigation = useNavigate();
  const Payment = () => {
    navigation('/payment');
  }
  return (
    <>
      <div className="p-4 md:p-8 min-h-screen mt-20 max-w-[1220px] mx-auto max-sm:w-full max-sm:p-0">
        <div className="max-w-full mx-auto bg-white p-6 rounded-lg flex justify-between gap-5 max-sm:flex-wrap">
          <div className="w-2/3 shadow-md rounded-lg p-5 max-sm:w-full">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <input type="checkbox" className="mr-2" /> Chọn tất cả (1)
            </h2>
            <div className="flex flex-col md:flex-row items-start gap-4 mt-4 border-b pb-4">
              <img
                src="https://cdn2.fptshop.com.vn/unsafe/128x0/filters:quality(100)/2024_5_13_638512084168393633_X1504ZA-NJ517W.jpg"
                alt="Laptop"
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold">
                  Laptop Asus Vivobook 15 X1504ZA-NJ517W i5-1235U
                </h3>
                <p className="text-gray-500 text-sm">Màu: Bạc</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-red-600 font-semibold text-lg">
                    {price.toLocaleString()} đ
                  </span>
                  <span className="text-gray-400 line-through">
                    {originalPrice.toLocaleString()} đ
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 border px-3 py-1 rounded-lg">
                <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                >
                  -
                </button>
                <span className="px-2">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button className="text-red-500 pt-1">
                <FiTrash2 size={20} />
              </button>
            </div>
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
              />
              <button className="px-2 border text-sm border-blue-600 rounded hover:bg-blue-600 hover:text-white text-blue-600">Áp dụng</button>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Thông tin đơn hàng</h3>
              <div className="flex justify-between pb-2 text-sm border-b border-gray-200">
                <span>Tổng tiền</span>
                <span>{originalPrice.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between mt-2 text-sm pb-2 border-b border-gray-20">
                <span>Tổng khuyến mãi</span>
                <span className="text-red-500">
                  {discount.toLocaleString()} đ
                </span>
              </div>
              <div className="flex justify-between mt-2 text-lg font-semibold">
                <span>Cần thanh toán</span>
                <span className="text-red-600">{price.toLocaleString()} đ</span>
              </div>
              <button onClick={()=>Payment()} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold">
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
