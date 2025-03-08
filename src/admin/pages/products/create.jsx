import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Form, Input, Select, Button, Upload, message, Space } from "antd";
import UploadPage from "./upload";
import { useDispatch } from "react-redux";
import { laptopSerisGetAll } from "../../../redux/slice/laptopSerisSlice";
import { createProduct } from "../../../redux/slice/productSlice";
import { toast } from "react-toastify";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { productDetailAttributes } from "../../../ultis/dataTableProductDetails";
import { createProductDetail } from "../../../redux/slice/productDetailSlice";

const { Option } = Select;
const CreateProductPage = () => {
  const [form] = Form.useForm();
  const uploadRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const maxFiles = 1;
  const dispatch = useDispatch();
  const [dataLaptopSeris, setDataLaptopSeris] = useState([]);
  useEffect(() => {
    dispatch(laptopSerisGetAll()) // lấy danh sách của bảng laptop seris
      .unwrap()
      .then((res) => {
        setDataLaptopSeris(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const onFinish = async (values) => {
    let imageUrl = [];
    if (uploadRef.current) {
      imageUrl = await uploadRef.current.handleUpload();
    }
    if (!imageUrl || imageUrl.length === 0) {
      message.error(`Vui lòng chọn ${maxFiles} ảnh!`);
      return;
    }
    dispatch(
      createProduct({
        // tạo mới sản phẩm
        ...values,
        image: imageUrl[0],
      })
    )
      .unwrap()
      .then((res) => {
        if (res.product._id) {
          values.product_details.map((item) => {
            dispatch(
              createProductDetail({ ...item, product_id: res.product._id })
            )
              .unwrap()
              .then(() => {
                toast.success("Thêm sản phẩm thành công");
                form.resetFields(); //reset form sau khi thành công
              })
              .catch((e) => {
                console.log(e);
              });
          });
        }
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
        className="flex w-full gap-5"
        initialValues={{ product_details: [{}] }}
      >
        {/* Upload ảnh */}
        <div className="w-1/3">
          <Form.Item label="Hình ảnh sản phẩm">
            <UploadPage ref={uploadRef} maxFiles={maxFiles} />
          </Form.Item>

          {/* Input nhập tên sản phẩm */}
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          {/* Select chọn danh mục */}
          <Form.Item
            label="Danh mục"
            name="laptop_series_id"
            rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
          >
            <Select placeholder="Chọn danh mục">
              {dataLaptopSeris.length != 0
                ? dataLaptopSeris.map((item) => (
                    <Option key={item._id} value={item._id}>
                      {item.name}
                    </Option>
                  ))
                : null}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Tạo sản phẩm
            </Button>
          </Form.Item>
        </div>
        {/* form create product detail */}
        <div className="w-2/3">
          <Form.List name="product_details" className="">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    align="baseline"
                    className="border-b border-gray-500 mb-5 grid grid-cols-3"
                  >
                    {productDetailAttributes.length != 0
                      ? productDetailAttributes.map((item) => (
                          <div>
                            <Form.Item
                              {...restField}
                              name={[name, item.name]}
                              rules={item.rules}
                            >
                              <Input placeholder={item.placeholder} />
                            </Form.Item>
                          </div>
                        ))
                      : null}
                    <Form.Item {...restField} name={[name, "status"]}>
                      <Select placeholder="Trạng thái sản phẩm theo cấu hình">
                        <Option value="new">New</Option>
                        <Option value="likenew">Like new</Option>
                      </Select>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item className="block">
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Thêm cấu hình cho sản phẩm
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
        {/* Nút submit */}
      </Form>
    </div>
  );
};

export default CreateProductPage;
