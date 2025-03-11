import { Button, Form, Modal } from "antd";
import React, { useEffect, useState } from "react";
import FormProductDetails from "../../../../components/admin/products/formProductDetails";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { updateProductDetail } from "../../../../redux/slice/productDetailSlice";
import { toast } from "react-toastify";

const Update = ({ onClose, visible, data, onChangeData }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  // set default value
  useEffect(() => {
    if (data) {
      // Loại bỏ các trường không cần thiết
      const {
        images,
        product_id,
        createdAt,
        updatedAt,
        __v,
        _id,
        ...filteredData
      } = data;

      if (filteredData.year) {
        filteredData.year = dayjs(filteredData.year, "YYYY"); // Chuyển đổi từ string "2025" thành dayjs object
      }
      // Cập nhật form với dữ liệu đã lọc
      const productDetailsArray = [filteredData];

      form.setFieldsValue({ product_details: productDetailsArray });
    }
  }, [data]);
  const handleSubmit = () => {
    setLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        // return console.log(values);
        if (!data) {
          setLoading(false);
          message.warning("Không lấy được thông tin sản phẩm");
          return;
        }
        if (!values || values.product_details.length === 0) {
          setLoading(false);
          message.warning("Không lấy được dữ liệu từ form");
          return;
        }
        if (values.product_details[0]) {
          values = { ...values.product_details[0], id: data._id };
          values.year = dayjs(values.year).format("YYYY");
          dispatch(updateProductDetail(values))
            .unwrap()
            .then(() => {
              toast.success("Đã lưu chỉnh sửa");
              onClose();
              onChangeData();
            })
            .catch((e) => {
              console.log(e);
            })
            .finally(() => setLoading(false));
        }
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
        title={`Chỉnh sửa "${data ? data.name : ""}"`}
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
            Lưu chỉnh sửa
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ product_details: [{}] }}
        >
          <FormProductDetails onClose={"hidden"}/>
        </Form>
      </Modal>
    </div>
  );
};

export default Update;
