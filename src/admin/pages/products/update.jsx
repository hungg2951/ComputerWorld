import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Select, Button, Modal, message } from "antd";
import { useDispatch } from "react-redux";
import { laptopSerisGetAll } from "../../../redux/slice/laptopSerisSlice";
import UploadPage from "../../../components/admin/uploads/upload";
import { updateProduct } from "../../../redux/slice/productSlice";
import { toast } from "react-toastify";
import { getAllBrands } from "../../../redux/slice/brandSlice";
import { getAllData } from "../../../redux/slice/laptopTypeSlice";

const { Option } = Select;
const Update = ({ visible, onClose, dataProduct, OnChangeEditProduct }) => {
  const uploadRef = useRef(null);
  const [form] = Form.useForm();
  const [dataLaptopSeris, setDataLaptopSeris] = useState([]);
  const [dataBrand, setDataBrands] = useState([]);
  const [dataLaptopTypes, setDataLaptopTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    // setLoading(true);
    if (!dataProduct) return message.error("Không lấy được dữ liệu sản phẩm");
    if (!values) return message.error("Không lấy được dữ liệu từ form");
    values = { ...values, id: dataProduct._id };
    let imageUrl = [];
    if (uploadRef.current) {
      imageUrl = await uploadRef.current.handleUpload();
      if (!imageUrl || imageUrl.length === 0)
        return message.error("Vui lòng chọn 1 ảnh");
      dispatch(updateProduct({ ...values, image: imageUrl[0] }))
        .unwrap()
        .then(() => {
          toast.success("Đã chỉnh sửa sản phẩm");
          OnChangeEditProduct(); // hàm làm mới data products
          onClose(); // hàm đóng modal
        })
        .catch((e) => {
          toast.error(e);
        });
      //   .finally(() => setLoading(false));
      return;
    }
  };

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
  // set default value
  useEffect(() => {
    if (dataProduct) {
      if (
        dataProduct.type_id &&
        dataProduct.brand_id &&
        dataProduct.series_id
      ) {
        form.setFieldsValue({
          ...dataProduct,
          brand_id: dataProduct.brand_id._id,
          series_id: dataProduct.series_id._id,
          type_id: dataProduct.type_id._id,
        });
      }
    }
  }, [dataProduct]);

  return (
    <div>
      <Modal
        title={`Chỉnh sửa thông tin "${dataProduct ? dataProduct.name : ""}"`}
        open={visible}
        onCancel={onClose}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <UploadPage
            ref={uploadRef}
            maxFiles={1}
            defaultImages={dataProduct ? [dataProduct.image] : []}
          />
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input placeholder="Nhập tên..." />
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

          <Form.Item
            label="Dòng sản phẩm"
            name="series_id"
            rules={[
              { required: true, message: "Vui lòng chọn dòng sản phẩm!" },
            ]}
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
              Lưu chỉnh sửa
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Update;
