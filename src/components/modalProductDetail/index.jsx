import { Modal, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
const { Title, Link } = Typography;
const ModalProductDetail = ({ onClose, visible, data }) => {
  const [dataSourse, setDataSourse] = useState();
  const includeKeys = [
    "cpu",
    "gpu",
    "ram",
    "storage",
    "display",
    "connectionPort",
    "battery",
    "weight",
  ];
  const labelMap = {
    cpu: "Bộ xử lý",
    gpu: "Card đồ họa",
    ram: "Bộ nhớ RAM",
    storage: "Ổ cứng",
    display: "Màn hình",
    connectionPort: "Cổng kết nối",
    warranty: "Bảo hành",
  };
  useEffect(() => {
    if (data) {
      setDataSourse(
        Object.entries(data)
          .filter(([key]) => includeKeys.includes(key))
          .sort((a, b) => includeKeys.indexOf(a[0]) - includeKeys.indexOf(b[0]))
          .map(([key, value], index) => ({
            key: index,
            label: labelMap[key] || key.toUpperCase(),
            value:
              typeof value === "object"
                ? value.name || JSON.stringify(value)
                : value,
          }))
      );
    }
  }, [data]);
  const columns = [
    {
      title: " ",
      dataIndex: "label",
      key: "label",
      width: "30%",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: " ",
      dataIndex: "value",
      key: "value",
    },
  ];
  return (
    <div>
      <Modal
        title={<h2 className="text-2xl font-bold">Thông số kỹ thuật</h2>}
        open={visible}
        onCancel={onClose}
        footer={null}
        width={900}
        className="custom-modal"
      >
        <h3 className="text-blue-600 font-semibold text-lg mb-3">
          {data
            ? data.product_id.name +
              " " +
              (data.year ? data.year : "") +
              (data.name ? data.name : "")
            : ""}
        </h3>

        {/* Bảng thông số kỹ thuật */}
        <Table
          dataSource={dataSourse}
          columns={columns}
          pagination={false}
          bordered
        />
      </Modal>
    </div>
  );
};

export default ModalProductDetail;
