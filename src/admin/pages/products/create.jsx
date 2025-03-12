import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Form, Input, Select, Button, message } from "antd";
import UploadPage from "../../../components/admin/uploads/upload";
import { useDispatch } from "react-redux";
import { laptopSerisGetAll } from "../../../redux/slice/laptopSerisSlice";
import { createProduct } from "../../../redux/slice/productSlice";
import { toast } from "react-toastify";
import { createProductDetail } from "../../../redux/slice/productDetailSlice";
import FormProductDetails from "../../../components/admin/products/formProductDetails";
import { getAllData } from "../../../redux/slice/laptopTypeSlice";
import { getAllBrands } from "../../../redux/slice/brandSlice";
import dayjs from "dayjs";

const { Option } = Select;
const CreateProductPage = () => {
  const [form] = Form.useForm();
  const uploadRef = useRef(null);
  const [loading, setLoading] = useState(false); // loading
  const maxFiles = 1; /// validate số ảnh tối đa được upload
  const dispatch = useDispatch();
  const [dataLaptopSeris, setDataLaptopSeris] = useState([]);
  const [dataBrand, setDataBrands] = useState([]);
  const [dataLaptopTypes, setDataLaptopTypes] = useState([]);
  useEffect(() => {
    dispatch(laptopSerisGetAll()) // lấy danh sách của bảng laptop seris
      .unwrap()
      .then((res) => {
        setDataLaptopSeris(res);
      })
      .catch((e) => {
        console.log(e);
      });

    dispatch(getAllBrands()) // lấy danh sách của bảng brand
      .unwrap()
      .then((res) => {
        setDataBrands(res);
      })
      .catch((e) => {
        console.log(e);
      });

    dispatch(getAllData()) // lấy danh sách của bảng laptop types
      .unwrap()
      .then((res) => {
        setDataLaptopTypes(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const onFinish = async (values) => {
    setLoading(true);
    let imageUrl = [];
    if (uploadRef.current) {
      imageUrl = await uploadRef.current.handleUpload();
    }
    if (!imageUrl || imageUrl.length === 0) {
      message.error(`Vui lòng chọn ${maxFiles} ảnh!`);
      setLoading(false);
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
        if (!res || !res.product._id) {
          return message.warning("Thêm sản phẩm lỗi");
        }
        if (!values || values.product_details.length === 0) {
          return message.warning("Không lấy được dữ liệu từ form");
        }
        values.product_details.map((item) => {
          item.year = dayjs(item.year).format("YYYY");
          dispatch(
            createProductDetail({ ...item, product_id: res.product._id })
          )
            .unwrap()
            .then(() => {
              toast.success("Thêm sản phẩm thành công");
              form.resetFields(); //reset form sau khi thành công
            })
            .catch((e) => {
              message.error(e.message);
              console.log(e);
            })
            .finally(() => setLoading(false));
        });
      })
      .catch((e) => {
        setLoading(false);
        message.error(e.message);
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
            label="Tên rút gọn sản phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          {/* Select chọn hãng */}
          <Form.Item
            label="Thương hiệu"
            name="brand_id"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thương hiệu sản phẩm!",
              },
            ]}
          >
            <Select placeholder="Chọn thương hiệu">
              {Array.isArray(dataBrand) && dataBrand.length !== 0
                ? dataBrand.map((item) => (
                    <Option key={item._id} value={item._id}>
                      {item.name}
                    </Option>
                  ))
                : null}
            </Select>
          </Form.Item>

          {/* Select chọn laptop seris */}
          <Form.Item
            label="Dòng sản phẩm"
            name="series_id"
            rules={[
              { required: true, message: "Vui lòng chọn dòng sản phẩm!" },
            ]}
          >
            <Select placeholder="Chọn dòng sản phẩm">
              {Array.isArray(dataLaptopSeris) && dataLaptopSeris.length !== 0
                ? dataLaptopSeris.map((item) => (
                    <Option key={item._id} value={item._id}>
                      {item.name}
                    </Option>
                  ))
                : null}
            </Select>
          </Form.Item>

          {/* Select chọn laptop types */}
          <Form.Item
            label="Loại Laptop"
            name="type_id"
            rules={[{ required: true, message: "Vui lòng chọn loại laptop!" }]}
          >
            <Select placeholder="Chọn loại laptop">
              {Array.isArray(dataLaptopTypes) && dataLaptopTypes.length !== 0
                ? dataLaptopTypes.map((item) => (
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
          <FormProductDetails />
        </div>
        {/* Nút submit */}
      </Form>
    </div>
  );
};

export default CreateProductPage;
