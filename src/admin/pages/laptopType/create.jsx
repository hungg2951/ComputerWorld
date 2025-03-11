import React from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { createLaptopType } from "../../../redux/slice/laptopTypeSlice";
import { FileAddOutlined } from "@ant-design/icons";
const Create = ({onSubmit}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(createLaptopType(values))
      .unwrap()
      .then(() => {
        message.success("Thêm loại laptop thành công!");
        form.resetFields();
        onSubmit()
      })
      .catch((e) => {
        message.warning(e.message)
      });
  };
  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onFinish} className="flex w-full gap-2">
        <Form.Item
        className="w-1/2"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập loại laptop!" }]}
        >
          <Input placeholder="Nhập loại laptop..." />
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
