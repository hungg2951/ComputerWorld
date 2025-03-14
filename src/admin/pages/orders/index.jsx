import { useEffect, useState } from "react";
import { Table, Input, Select, DatePicker, Button, Space } from "antd";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { getAllOrders, updateOrder } from "./../../../redux/slice/orderSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const OrdersPage = () => {
  const [searchOrderId, setSearchOrderId] = useState("");
  const [filterPayment, setFilterPayment] = useState(null);
  const [filterDelivery, setFilterDelivery] = useState(null);
  const [searchDate, setSearchDate] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersFilter, setOrdersFilter] = useState([]);
  const [active, setActive] = useState("pending");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders())
      .unwrap()
      .then((res) => {
        setOrders(res.order);
        setOrdersFilter(res.order.filter((item) => item.status === "pending"));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const refreshDataFilter = (value) => {
    dispatch(getAllOrders())
      .unwrap()
      .then((res) => {
        setOrders(res.order);
        setOrdersFilter(res.order.filter((item) => item.status === value));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleFilterOrders = (value) => {
    // lọc đơn hàng theo trạng thái
    setOrdersFilter(orders.filter((item) => item.status === value));
  };

  const updateStatus = (values) => {
    Swal.fire({
      title: `${values.label} ?`,
      text: `Bạn có chắc chắn muốn cập nhật trạng thái đơn hàng sang "${values.label}" ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, cập nhật!",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateOrder(values))
          .unwrap()
          .then(() => {
            refreshDataFilter(values.statusNow);
            Swal.fire({
              icon: "success",
              title: "Cập nhật trạng thái thành công",
              showConfirmButton: false,
              timer: 1200,
            });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  };

  const handleSearchOrderId = (value) => {
    setSearchOrderId(value);
  };

  const handleFilterPayment = (value) => {
    setFilterPayment(value);
  };

  const handleFilterDelivery = (value) => {
    setFilterDelivery(value);
  };

  const handleSearchDate = (date) => {
    setSearchDate(date ? dayjs(date).startOf("day") : null);
  };

  const filteredOrders = ordersFilter.filter((order) => {
    return (
      (searchOrderId ? order.orderId.includes(searchOrderId) : true) &&
      (filterPayment ? order.payment_method === filterPayment : true) &&
      (filterDelivery ? order.deliveryMethod === filterDelivery : true) &&
      (searchDate ? dayjs(order.orderDate).isSame(searchDate, "day") : true)
    );
  });

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "payment_method",
      key: "payment_method",
      filters: [
        { text: "Tiền mặt", value: "cash" },
        { text: "MoMo", value: "momo" },
      ],
      onFilter: (value, record) => record.payment_method === value,
      render: (value, record, index) => (
        <div>
          {value === "momo"
            ? "Thanh toán qua MOMO"
            : "Thanh toán khi nhận hàng"}
        </div>
      ),
    },
    {
      title: "Phương thức nhận hàng",
      dataIndex: "deliveryMethod",
      key: "deliveryMethod",
      filters: [
        { text: "Nhận tại cửa hàng", value: "store_pickup" },
        { text: "Giao tận nhà", value: "home_delivery" },
      ],
      onFilter: (value, record) => record.deliveryMethod === value,
      render: (value, record, index) => (
        <div>
          {value === "store_pickup" ? "Nhận tại cửa hàng" : "Giao hàng tận nhà"}
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_price",
      key: "total_price",
      render: (value, record, index) => (
        <div className="text-red-500">{value.toLocaleString()}</div>
      ),
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Cập nhật đơn hàng",
      dataIndex: "status",
      key: "status",
      render: (value, record, index) => (
        <div>
          <div>
            {value === "pending" ? (
              <Button
                onClick={() =>
                  updateStatus({
                    id: record._id,
                    status: "confirmed",
                    label: "Xác nhận đơn hàng",
                    statusNow: "pending",
                  })
                }
              >
                Xác nhận đơn hàng
              </Button>
            ) : value === "confirmed" ? (
              <Button
                onClick={() =>
                  updateStatus({
                    id: record._id,
                    status: "shipped",
                    label: "Chuyển hàng",
                    statusNow: "confirmed",
                  })
                }
              >
                Chuyển hàng
              </Button>
            ) : value === "shipped" ? (
              <Button
                onClick={() =>
                  updateStatus({
                    id: record._id,
                    status: "delivery",
                    label: "Giao hàng",
                    statusNow: "shipped",
                  })
                }
              >
                Đang giao hàng
              </Button>
            ) : value === "delivery" ? (
              <div className="flex gap-1">
                <Button
                  onClick={() =>
                    updateStatus({
                      id: record._id,
                      status: "success",
                      label: "Giao hàng thành công",
                      statusNow: "delivery",
                    })
                  }
                >
                  Giao thành công
                </Button>
                <Button
                  onClick={() =>
                    updateStatus({
                      id: record._id,
                      status: "returned",
                      label: "Hoàn đơn",
                      statusNow: "delivery",
                    })
                  }
                >
                  Hoàn đơn
                </Button>
              </div>
            ) : value === "success" ? (
              "Giao hàng thành công"
            ) : value === "cancel" ? (
              <Button
                onClick={() =>
                  updateStatus({
                    id: record._id,
                    status: "confirmed",
                    statusNow: "cancel",
                  })
                }
              >
                Xác nhận lại đơn hàng
              </Button>
            ) : (
              "Đơn hàng hoàn lại"
            )}
          </div>
        </div>
      ),
    },
    {
      title: "",
      key: "_id",
      render: (value, record, index) => (
        <Button
          onClick={() =>
            navigate("/admin/order-details", {
              state: { orderId: record.orderId },
            })
          }
        >
          Chi tiết
        </Button>
      ),
    },
  ];
  return (
    <div className="">
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm mã đơn hàng"
          onChange={(e) => handleSearchOrderId(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Phương thức thanh toán"
          onChange={handleFilterPayment}
          allowClear
          style={{ width: 200 }}
        >
          <Option value="cash">Tiền mặt</Option>
          <Option value="momo">MoMo</Option>
        </Select>
        <Select
          placeholder="Phương thức nhận hàng"
          onChange={handleFilterDelivery}
          allowClear
          style={{ width: 200 }}
        >
          <Option value="store_pickup">Nhận tại cửa hàng</Option>
          <Option value="home_delivery">Giao tận nhà</Option>
        </Select>
        <DatePicker
          format="YYYY-MM-DD"
          onChange={handleSearchDate}
          placeholder="Chọn ngày đặt hàng"
          allowClear
        />
      </Space>
      {/*  */}
      <Space style={{ marginBottom: 16 }}>
        <Button
          type={active === "pending" ? "primary" : "default"}
          onClick={() => {
            setActive("pending");
            handleFilterOrders("pending");
          }}
        >
          Đơn chưa xác nhận
        </Button>
        <Button
          type={active === "confirmed" ? "primary" : "default"}
          onClick={() => {
            setActive("confirmed");
            handleFilterOrders("confirmed");
          }}
        >
          Đơn đã xác nhận
        </Button>
        <Button
          type={active === "shipped" ? "primary" : "default"}
          onClick={() => {
            setActive("shipped");
            handleFilterOrders("shipped");
          }}
        >
          Đơn đã chuyển hàng
        </Button>
        <Button
          type={active === "delivery" ? "primary" : "default"}
          onClick={() => {
            setActive("delivery");
            handleFilterOrders("delivery");
          }}
        >
          Đơn đang giao hàng
        </Button>
        <Button
          type={active === "success" ? "primary" : "default"}
          onClick={() => {
            setActive("success");
            handleFilterOrders("success");
          }}
        >
          Đơn đã giao
        </Button>
        <Button
          danger
          type={active === "cancel" ? "primary" : "default"}
          onClick={() => {
            setActive("cancel");
            handleFilterOrders("cancel");
          }}
        >
          Đơn đã hủy
        </Button>
        <Button
          danger
          type={active === "returned" ? "primary" : "default"}
          onClick={() => {
            setActive("returned");
            handleFilterOrders("returned");
          }}
        >
          Đơn hoàn lại
        </Button>
      </Space>
      {/*  */}
      <Table columns={columns} dataSource={filteredOrders} />
    </div>
  );
};

export default OrdersPage;
