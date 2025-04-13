import React, { useState } from "react";
import { Modal, Form, Input, Button, Checkbox } from "antd";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { authRegister } from "../../../redux/slice/authSlice";
import { toast } from "react-toastify";
const PopupSignup = ({ visible, onClose, onLogin }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = (values) => {
    setLoading(true)
    dispatch(authRegister(values))
      .unwrap()
      .then(() => {
        form.resetFields();
        onLogin(true);
        onClose();
        setMessage("");
        toast.success("Đăng ký thành công");
      })
      .catch((error) => {
        console.log("Lỗi trả về:", error);
        setMessage("Email này đã có người đăng ký !");
      })
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <Modal open={visible} onCancel={onClose} footer={null} closable={false}>
        <h2 className="text-center text-lg font-semibold mb-4">
          ĐĂNG KÝ TÀI KHOẢN
        </h2>

        <Form name="register" onFinish={onSubmit} form={form} layout="vertical">
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input placeholder="Họ và Tên" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu phải có đủ 6 ký tự" },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>
          <div className="text-red-700 mt-[-10px]">{message}</div>
          <Form.Item valuePropName="checked">
            <Checkbox>Đăng ký nhận tin khuyến mãi qua Email</Checkbox>
          </Form.Item>

          <Button
            loading={loading}
            htmlType="submit"
            type="primary"
            className="w-full bg-red-500"
            size="large"
          >
            TẠO TÀI KHOẢN
          </Button>
        </Form>

        <div className="my-4 flex items-center">
          <span className="flex-grow border-t border-gray-300"></span>
          <span className="mx-2 text-gray-500 text-sm">hoặc đăng ký bằng</span>
          <span className="flex-grow border-t border-gray-300"></span>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            icon={<GoogleOutlined />}
            className="w-1/2 bg-red-500 text-white"
          >
            Google
          </Button>
          <Button
            icon={<FacebookOutlined />}
            className="w-1/2 bg-blue-600 text-white"
          >
            Facebook
          </Button>
        </div>

        <div className="text-center mt-4 text-sm">
          Bạn đã có tài khoản?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => onLogin(true)}
          >
            Đăng nhập!
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default PopupSignup;
