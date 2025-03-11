import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import { useDispatch } from "react-redux";
import { createBrand } from "../../../redux/slice/brandSlice";
import { FileAddOutlined } from "@ant-design/icons";
const Create = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
 
  const onFinish = (values) => {
    // return console.log(values);
    dispatch(createBrand(values))
      .unwrap()
      .then(() => {
        message.success("Thêm hãng thành công!");
        form.resetFields();
        onSubmit();
      })
      .catch((e) => {
        message.warning(e.message)
      });
  };
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="flex w-full gap-2"
      >
        <Form.Item
          className="w-1/2"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên hãng!" }]}
        >
          <Input placeholder="Nhập tên hãng..." />
        </Form.Item>
       
        <Form.Item>
          <Button type="primary" htmlType="submit">
          <FileAddOutlined /> Tạo mới
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Create;
