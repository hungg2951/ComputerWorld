import React from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { createLaptopType } from "../../../redux/slice/laptopTypeSlice";
const Create = ({onSubmit}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(createLaptopType(values))
      .unwrap()
      .then(() => {
        message.success("Thêm danh mục thành công!");
        form.resetFields();
        onSubmit()
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onFinish} className="flex w-full gap-2">
        <Form.Item
        className="w-1/2"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
        >
          <Input placeholder="Nhập tên danh mục..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm danh mục
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Create;
