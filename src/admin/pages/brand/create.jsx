import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { createBrand } from "../../../redux/slice/brandSlice";
import { FileAddOutlined } from "@ant-design/icons";
import UploadPage from "../../../components/admin/uploads/upload";

const Create = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const uploadRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true)
    let imageUrl = [];
    if (uploadRef.current) {
      imageUrl = await uploadRef.current.handleUpload();
    }
    if (!imageUrl || imageUrl.length === 0) {
      message.error(`Vui lòng chọn ảnh!`);
      setLoading(false);
      return;
    }
    dispatch(createBrand({...values,logo:imageUrl[0]}))
      .unwrap()
      .then(() => {
        message.success("Thêm hãng thành công!");
        form.resetFields();
        onSubmit();
      })
      .catch((e) => {
        message.warning(e.message);
      })
      .finally(()=>setLoading(false))
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

        <Form.Item>
          <UploadPage ref={uploadRef} maxFiles={1} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            <FileAddOutlined /> Tạo mới
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Create;
