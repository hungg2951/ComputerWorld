import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import { useDispatch } from "react-redux";
import { createBrand } from "../../../redux/slice/brandSlice";
import { getAllData } from "../../../redux/slice/laptopTypeSlice";
import { FileAddOutlined } from "@ant-design/icons";
const Create = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [dataLaptopType, setDataLaptopType] = useState();
  useEffect(() => {
    dispatch(getAllData())
      .unwrap()
      .then((res) => {
        setDataLaptopType(res);
      })
      .catch((e) => {
        {
          console.log(e);
        }
      });
  }, []);
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
        console.log(e);
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
        <Form.Item
          name="laptop_type_id"
          className="w-1/4"
          rules={[{ required: true, message: "Vui lòng chọn kiểu laptop!" }]}
        >
          {dataLaptopType && dataLaptopType.length !== 0 ? (
            <Select placeholder="Chọn kiểu laptop" className="w-full">
              {dataLaptopType.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          ) : null}
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
