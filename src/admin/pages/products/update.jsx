import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Select, Button, Modal, message } from "antd";
import { useDispatch } from "react-redux";
import { laptopSerisGetAll } from "../../../redux/slice/laptopSerisSlice";
import UploadPage from "../../../components/admin/uploads/upload";
import { updateProduct } from "../../../redux/slice/productSlice";
import { toast } from "react-toastify";

const { Option } = Select;
const Update = ({ visible, onClose, dataProduct, OnChangeEditProduct }) => {
  const uploadRef = useRef(null);
  const [form] = Form.useForm();
  const [dataLaptopSeris, setDataLaptopSeris] = useState([]);
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

  // lấy danh sách của bảng laptop seris
  useEffect(() => {
    dispatch(laptopSerisGetAll())
      .unwrap()
      .then((res) => {
        setDataLaptopSeris(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  // set default value
  useEffect(() => {
    if (dataProduct) {
      form.setFieldsValue({
        ...dataProduct,
        laptop_series_id: dataProduct.laptop_series_id._id,
      });
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

          <Form.Item
            label="Dòng sản phẩm"
            name="laptop_series_id"
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
