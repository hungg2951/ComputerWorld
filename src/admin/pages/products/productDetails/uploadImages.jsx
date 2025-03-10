import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Button } from "antd";
import UploadPage from "../../../../components/admin/uploads/upload";
const UploadImages = ({ onClose, visible, data }) => {
  const [form] = Form.useForm();
  const uploadRef = useRef(null);
  console.log("🚀 ~ UploadImages ~ data:", data);
  const [handleChangeChooseImage, setHandleChangeChooseImage] = useState(false);
  const handleChange = () => {
    setHandleChangeChooseImage(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(() => {
        form.resetFields();
      })
      .catch((error) => console.log("Lỗi:", error));
  };
  return (
    <>
      <Modal
        title="Chỉnh sửa hình ảnh"
        open={visible}
        onOk={handleOk}
        onCancel={() => {
          if (uploadRef.current) {
            uploadRef.current.clearFiles(); // gọi hàm clear file trong uploadPage
          }
          onClose();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical">
          <Form.Item>
            <UploadPage
              ref={uploadRef}
              defaultImages={[...(data ? data.images : [])]}
              handleChange={() => handleChange(true)}
              maxFiles={10}
            />
          </Form.Item>
          <Form.Item className="flex justify-end">
            {handleChangeChooseImage ? (
              <Button type="primary" htmlType="submit">
                Lưu thay đổi
              </Button>
            ) : (
              <Button onClick={onClose}>Thoát</Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UploadImages;
