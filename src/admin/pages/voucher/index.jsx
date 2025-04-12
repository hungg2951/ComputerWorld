import React, { useEffect, useState } from "react";
import { Table, Tag, Switch, Space, message, Button } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getAllVouchers,
  updateVoucher,
} from "./../../../redux/slice/voucherSlice";
import { EditOutlined } from "@ant-design/icons";
const VoucherPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshData, setrefreshData] = useState(false);
  const naviagte = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getAllVouchers())
      .unwrap()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [refreshData]);

  const columns = [
    {
      title: "Mã Voucher",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Loại",
      dataIndex: "discountType",
      key: "discountType",
      render: (type) => (type === "percent" ? "Phần trăm" : "Số tiền cố định"),
    },
    {
      title: "Giá trị",
      dataIndex: "discountValue",
      key: "discountValue",
      render: (val, record) =>
        record.discountType === "percent"
          ? `${val}%`
          : `${val.toLocaleString()}₫`,
    },
    {
      title: "Giảm tối đa",
      dataIndex: "maxDiscount",
      key: "maxDiscount",
      render: (val) => (val ? `${val.toLocaleString()}₫` : "—"),
    },
    {
      title: "Đơn hàng tối thiểu",
      dataIndex: "minOrderValue",
      key: "minOrderValue",
      render: (val) => (val ? `${val.toLocaleString()}₫` : "—"),
    },
    {
      title: "Số lượng còn",
      key: "quantity",
      render: (text, record) =>
        `${record.quantity - record.usedCount} / ${record.quantity}`,
    },
    {
      title: "Hiệu lực",
      key: "validTime",
      render: (_, record) =>
        `${dayjs(record.validFrom).format("DD/MM/YYYY")} - ${dayjs(record.validTo).format("DD/MM/YYYY")}`,
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Đang hoạt động" : "Vô hiệu hóa"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Switch
            checked={record.isActive}
            onChange={() => handleToggleStatus(record._id, !record.isActive)}
          />
          <Button
            onClick={() =>
              naviagte("/admin/voucher/update", {
                state: { voucherData: record },
              })
            }
          >
            <EditOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  const handleToggleStatus = async (id, newStatus) => {
    try {
      dispatch(updateVoucher({ id: id, isActive: newStatus }));
      message.success("Cập nhật trạng thái thành công");
      setrefreshData(!refreshData);
    } catch (error) {
      message.error("Lỗi cập nhật trạng thái");
    }
  };

  return (
    <div>
      <Button
        type="primary"
        className="mb-2"
        onClick={() => naviagte("/admin/voucher/create")}
      >
        Tạo voucher
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
};

export default VoucherPage;
