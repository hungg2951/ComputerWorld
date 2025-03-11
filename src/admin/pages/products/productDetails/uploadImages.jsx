import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Button, message } from "antd";
import UploadPage from "../../../../components/admin/uploads/upload";
import { useDispatch } from "react-redux";
import { updateProductDetail } from "../../../../redux/slice/productDetailSlice";
const UploadImages = ({ onClose, visible, data ,changeData}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const uploadRef = useRef(null);
  const dispatch = useDispatch();
  const onCloseModal = () => {
    if (uploadRef.current) {
      uploadRef.current.clearFiles(); // gọi hàm clear file trong uploadPage
    }
    onClose();
  };
  const onFinish = async () => {
    setLoading(true);
    let imageUrl = [];
    if (uploadRef.current) {
      imageUrl = await uploadRef.current.handleUpload();
      if (!imageUrl || imageUrl.length === 0) {
        message.warning("Vui lòng chọn ít nhất 1 ảnh");
        setLoading(false);
        return;
      }
      dispatch(updateProductDetail({ images: imageUrl, id: data._id }))
        .unwrap()
        .then(() => {
          message.success("Chỉnh sửa ảnh thành công");
          onCloseModal();
          changeData()
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => setLoading(false));
    }
  };
  return (
    <>
      <Modal
        title="Chỉnh sửa hình ảnh"
        open={visible}
        onCancel={onCloseModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item>
            <UploadPage
              ref={uploadRef}
              defaultImages={[...(data ? data.images : [])]}
              maxFiles={10}
            />
          </Form.Item>
          <Form.Item className="flex justify-end gap-5">
            <Button onClick={onClose}>Thoát</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UploadImages;
