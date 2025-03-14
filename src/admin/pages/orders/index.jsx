import { useState } from "react";
import { Table, Input, Select, DatePicker, Button, Space } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const OrdersPage = () => {
  const [searchOrderId, setSearchOrderId] = useState("");
  const [filterPayment, setFilterPayment] = useState(null);
  const [filterDelivery, setFilterDelivery] = useState(null);
  const [searchDate, setSearchDate] = useState(null);
  const orders = [
    {
      key: "1",
      orderId: "12345",
      paymentMethod: "cash",
      deliveryMethod: "store_pickup",
      totalAmount: "500,000 VND",
      orderDate: "2025-03-14T06:32:50.657+00:00",
      status: "Đang xử lý",
    },
    {
      key: "2",
      orderId: "67890",
      paymentMethod: "momo",
      deliveryMethod: "home_delivery",
      totalAmount: "1,200,000 VND",
      orderDate: "2025-03-11T08:15:30.123+00:00",
      status: "Đã giao hàng",
    },
  ];

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

  const filteredOrders = orders.filter((order) => {
    return (
      (searchOrderId ? order.orderId.includes(searchOrderId) : true) &&
      (filterPayment ? order.paymentMethod === filterPayment : true) &&
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
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      filters: [
        { text: "Tiền mặt", value: "cash" },
        { text: "MoMo", value: "momo" },
      ],
      onFilter: (value, record) => record.paymentMethod === value,
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
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
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
      <Table columns={columns} dataSource={filteredOrders} />
    </div>
  );
};

export default OrdersPage;
