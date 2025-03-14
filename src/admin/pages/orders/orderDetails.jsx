import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getOrderId } from "../../../redux/slice/orderSlice";

const OrderDetails = () => {
  const [dataSource, setDataSource] = useState();
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (location.state.orderId) {
      dispatch(getOrderId(location.state.orderId))
        .unwrap()
        .then((res) => {
          setDataSource(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [location]);
  if (!dataSource || dataSource.length === 0) return null;
  return (
    <div>
      {dataSource && dataSource.length !== 0 ? (
        <div className="flex gap-5">
          <div className="w-1/4">
            <h1>Thông tin người đặt</h1>
            <p className="my-2 text-blue-600">
              {dataSource.order.informationClient.fullname}
            </p>
            <p className="my-2">
              Số điện thoại: <span className="font-medium">{dataSource.order.informationClient.phone}</span>
            </p>
            <p  className="my-2">
              Hình thức giao hàng:{" "}
              <span className="font-medium">{dataSource.order.deliveryMethod === "store_pickup"
                ? "Nhận tại cửa hàng"
                : "Giao tận nhà"}</span>
            </p>
            <p className="my-2">
              Phương thức thanh toán:{" "}
              <span className="font-medium">{dataSource.order.payment_method === "cash"
                ? "Thanh toán khi nhận hàng"
                : "Thanh toán qua momo"}</span>
            </p>
            {dataSource.order.informationClient.address && (
              <div>Địa chỉ: <span className="font-medium">{dataSource.order.informationClient.address}</span> </div>
            )}
            <div className="my-2">
              Trạng thái đơn hàng:
              {dataSource ? (
                dataSource.order.status === "pending" ? (
                  <span className="text-yellow-500"> Chờ xác nhận</span>
                ) : dataSource.order.status === "delivery" ? (
                  <span className="text-blue-600"> Đang giao</span>
                ) : dataSource.order.status === "success" ? (
                  <span className="text-green-700"> Đã Giao</span>
                ) : dataSource.order.status === "delivery" ? (
                  <span className="text-blue-600"> Đang giao</span>
                ) : dataSource.order.status === "returned" ? (
                  <span className="text-red-600"> Hoàn đơn</span>
                ) : dataSource.order.status === "shipped" ? (
                  <span className="text-blue-600">
                    Đang bàn giao cho đơn vị vận chuyển
                  </span>
                ) : (
                  <span className="text-red-600">Hủy đơn</span>
                )
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="w-3/4">
            {dataSource.orderDetail.map((item, index) => (
              <div
                key={index + 1}
                className="flex flex-col md:flex-row items-start gap-4 mt-4 border-b pb-4"
              >
                <img
                  src={item ? item.product_id.image : ""}
                  alt="Laptop"
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">
                    <span className="capitalize">
                      {`[${item.product_detail_id.status}]`}{" "}
                    </span>
                    <span>{item.product_id.name} </span>
                    <span>{item.product_detail_id.year} </span>
                    <span>{item.product_detail_id.name}</span>
                  </h3>
                  <p className="text-gray-500 text-sm">Màu: Bạc</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-red-600 font-semibold text-lg">
                      {item.product_detail_id.price.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 border px-3 py-1 rounded-lg">
                  <span className="px-2">Số lượng: {item.quantity}</span>
                </div>
              </div>
            ))}
            <div className="mt-4">
              Tổng tiền:{" "}
              <span className="text-red-600 font-bold text-xl">
                {dataSource
                  ? dataSource.order.total_price.toLocaleString()
                  : ""}
              </span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default OrderDetails;
