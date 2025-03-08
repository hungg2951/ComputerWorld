import React, { useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";

const ModelCreateProductDetails = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Dữ liệu sản phẩm:", values); // Xử lý dữ liệu ở đây
        form.resetFields();
        onClose(); // Đóng modal sau khi submit
      })
      .catch((error) => {
        console.log("Validation Failed:", error);
      });
  };

  return (
    <div>
      <Modal
      className="w-full"
        title="Thêm Sản Phẩm"
        open={visible}
        onCancel={onClose}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
          Lưu
        </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModelCreateProductDetails;
