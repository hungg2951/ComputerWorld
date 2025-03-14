import { Button, Card, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getOrderId } from "../../../redux/slice/orderSlice";

const SearchOrders = () => {
  const [orderId, setOrderId] = useState("");
  const [dataSource, setDataSource] = useState();
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const handleSearchOrder = () => {
    setLoading(true);
    if (!orderId) {
      setLoading(false);
      setMessage("Vui lòng nhập mã đơn hàng!");
      setShowTable(false);
      return;
    }
    setMessage("");
    setShowTable(true);
    dispatch(getOrderId(orderId))
      .unwrap()
      .then((res) => {
        setDataSource(res);
      })
      .catch((e) => {
        setDataSource([]);
        console.log(e);
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="my-28 w-[1200px] mx-auto flex gap-5">
      <div className="p-6 w-1/3 mx-auto">
        <Card title="Tra cứu đơn hàng" className="p-4">
          <Input
            placeholder="Nhập mã đơn hàng"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="mb-2"
          />
          <p className="text-red-600 py-2">{message}</p>
          <Button
            loading={loading}
            type="primary"
            onClick={handleSearchOrder}
            className="w-full"
          >
            Tra cứu
          </Button>
        </Card>
      </div>

      {/*  */}
      {showTable ? (
        <div className="w-2/3 shadow-md rounded-lg p-5 max-sm:w-full mx-auto">
          {dataSource && dataSource.length !== 0 ? (
            <div>
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
              <div className="my-2">
                Trạng thái đơn hàng: 
                {dataSource ? (
                  dataSource.order.status === "pending" ? (
                    <span className="text-yellow-500"> Chờ xác nhận</span>
                  ) : dataSource.order.status === "delivery" ? (
                    <span className="text-blue-600"> Đang giao</span>
                  ) : dataSource.order.status === "success" ? (
                    <span className="text-green-700"> Đã Giao</span>
                  ) : (
                    <span className="text-red-600"> Đã Hủy</span>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-start text-red-600 text-sm">
              Mã đơn hàng không hợp lệ, vui lòng kiểm tra lại mã đơn hàng !
            </div>
          )}
        </div>
      ) : (
        <div className="w-2/3"></div>
      )}
    </div>
  );
};

export default SearchOrders;
