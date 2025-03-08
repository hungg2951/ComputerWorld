import React, { useEffect, useState } from "react";
import { Modal, Form, Button, message } from "antd";
import FormProductDetails from "../../../components/admin/products/formProductDetails";
import { PlusOutlined } from "@ant-design/icons";
import { createProductDetail } from "../../../redux/slice/productDetailSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ModelCreateProductDetails = ({ visible, onClose, dataProduct }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // loading
  const dispatch = useDispatch();
  useEffect(() => {
    if (!visible) {
      form.resetFields();
      setLoading(false)
    }
  }, [visible, form]);
  const handleSubmit = () => {
    setLoading(true);
    form
      .validateFields()
      .then((values) => {
        if (!dataProduct) {
          return message.warning("Không lấy được thông tin sản phẩm");
        }
        if (!values || values.product_details.length === 0) {
            return message.warning("Không lấy được dữ liệu từ form");
        }
        values.product_details.map((item) => {
            dispatch(
              createProductDetail({ ...item, product_id: dataProduct._id })
            )
              .unwrap()
              .then(() => {
                toast.success("Thêm cấu hình sản phẩm thành công");
                form.resetFields(); //reset form sau khi thành công
                onClose();
              })
              .catch((e) => {
                console.log(e);
                message.warning("Lỗi khi thêm cấu hình!");
              })
              .finally(() => setLoading(false));
          });
      })
      .catch((error) => {
        console.log("Validation Failed:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <Modal
        width={1000}
        className="w-full"
        title={`Thêm cấu hình cho "${dataProduct ? dataProduct.name : ""}"`}
        open={visible}
        onCancel={onClose}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Hủy
          </Button>,
          <Button
            loading={loading}
            key="submit"
            type="primary"
            onClick={handleSubmit}
          >
            <PlusOutlined />
            Tạo cấu hình mới
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ product_details: [{}] }}
        >
          <FormProductDetails />
        </Form>
      </Modal>
    </div>
  );
};

export default ModelCreateProductDetails;
