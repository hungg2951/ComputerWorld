import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { authLogin } from "../../../redux/slice/authSlice";
import { toast } from "react-toastify";
const PopupSignin = ({ visible, onClose, onRegister }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, []);

  const onFinish = (values) => {
    setLoading(true);
    dispatch(authLogin(values))
      .unwrap()
      .then(() => {
        form.resetFields();
        onClose();
        setMessage("");
        toast.success("Đăng nhập thành công");
      })
      .catch((error) => {
        setMessage(error.message);
        console.log("Lỗi trả về:", error.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <Modal
        title={
          <span className="text-lg font-semibold">
            ĐĂNG NHẬP HOẶC TẠO TÀI KHOẢN
          </span>
        }
        open={visible}
        onCancel={onClose}
        footer={null}
        centered
      >
        <Form
          name="login"
          onFinish={onFinish}
          className="space-y-4"
          form={form}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Email" className="p-3 rounded-lg" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Mật khẩu" className="p-3 rounded-lg" />
          </Form.Item>
          <div className="text-red-700">{message}</div>
          <div className="flex justify-end text-gray-500 text-sm italic">
            <a href="#" className="hover:underline">
              Quên mật khẩu?
            </a>
          </div>
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="bg-red-600 w-full py-2 text-white font-semibold"
            >
              ĐĂNG NHẬP
            </Button>
          </Form.Item>
        </Form>

        <div className="flex items-center my-4 text-gray-400 text-sm">
          <div className="flex-1 border-t" />
          <span className="px-2">hoặc đăng nhập bằng</span>
          <div className="flex-1 border-t" />
        </div>

        <div className="flex gap-4">
          <Button className="flex-1 bg-red-500 text-white py-2 flex items-center justify-center gap-2 rounded-lg">
            <GoogleOutlined /> Google
          </Button>
          <Button className="flex-1 bg-blue-600 text-white py-2 flex items-center justify-center gap-2 rounded-lg">
            <FacebookOutlined /> Facebook
          </Button>
        </div>

        <div className="text-center mt-4 text-sm">
          Bạn chưa có tài khoản?{" "}
          <a
            className="text-blue-500 font-semibold"
            onClick={() => onRegister(true)}
          >
            Đăng ký ngay!
          </a>
        </div>
      </Modal>
    </div>
  );
};

export default PopupSignin;
