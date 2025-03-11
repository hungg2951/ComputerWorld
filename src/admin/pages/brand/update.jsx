import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateBrand } from "../../../redux/slice/brandSlice";
const Update = ({ open, close, detailData, onChangeEdit }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    if (detailData) {
      form.setFieldsValue(detailData);
    }
  }, [detailData]);
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (detailData) {
          dispatch(updateBrand({ ...values, id: detailData._id }))
            .unwrap()
            .then(() => {
              form.resetFields();
              toast.success("Chỉnh sửa thành công !");
              onChangeEdit();
              close();
            })
            .catch((e) => {
              console.log(e);
              toast.success("Chỉnh sửa thất bại!");
            });
        }
      })
      .catch((info) => {
        console.log("Lỗi nhập dữ liệu:", info);
      });
  };
  return (
    <div>
      <Modal
        title="Nhập dữ liệu"
        open={open}
        onCancel={close}
        footer={[
          <Button key="cancel" onClick={close}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Cập nhật
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên hãng"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Update;
