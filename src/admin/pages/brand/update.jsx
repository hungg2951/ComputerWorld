import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateBrand } from "../../../redux/slice/brandSlice";
import UploadPage from "../../../components/admin/uploads/upload";
const Update = ({ open, close, detailData, onChangeEdit }) => {
  const [form] = Form.useForm();
  const uploadRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (detailData) {
      form.setFieldsValue(detailData);
    }
  }, [detailData]);
  const handleOk = () => {
    setLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        if (detailData) {
          let imageUrl = [];
          if (uploadRef.current) {
            imageUrl = await uploadRef.current.handleUpload();
            if (!imageUrl || imageUrl.length === 0) {
              setLoading(true);
              message.error("Vui lòng chọn 1 ảnh");
              returnn;
            }
            dispatch(
              updateBrand({ ...values, id: detailData._id, logo: imageUrl[0] })
            )
              .unwrap()
              .then(() => {
                form.resetFields();
                toast.success("Chỉnh sửa thành công !");
                onChangeEdit();
                close();
              })
              .catch((e) => {
                console.log(e);
                toast.warning(e.message);
              })
              .finally(() => setLoading(false));
          }
        }
      })
      .catch((info) => {
        setLoading(false);
        console.log("Lỗi nhập dữ liệu:", info);
      });
  };
  return (
    <div>
      <Modal
        title="Nhập dữ liệu"
        open={open}
        onCancel={close}
        footer={[
          <Button key="cancel" onClick={close}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} loading={loading}>
            Cập nhật
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên hãng"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>

          <Form.Item>
            <UploadPage
              ref={uploadRef}
              maxFiles={1}
              defaultImages={detailData ? [detailData.logo] : []}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Update;
