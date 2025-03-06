import React, { useState } from "react";
import { Form, Input, Radio, Checkbox } from "antd";
const InformationCustomer = () => {
    const [form,setForm] = useState(true)
    const onForm = () => {
        setForm(!form)
    }
  return (
    <>
      <div className="p-4 md:p-8 min-h-screen mt-20 max-w-[1220px] mx-auto max-sm:w-full max-sm:p-0">
        <div className="max-w-full mx-auto bg-white p-6 rounded-lg flex justify-between gap-5 max-sm:flex-wrap">
          <div className="w-2/3 shadow-md rounded-lg max-sm:w-full">
            <div className=" md:p-8 flex justify-center">
              <div className="w-full bg-white">
                <h2 className="text-lg font-semibold mb-4">Thông tin người đặt hàng</h2>
                <Form layout="vertical">
                  <Form.Item
                    name="fullname"
                    rules={[
                      { required: true, message: "Vui lòng nhập họ và tên" },
                    ]}
                  >
                    <Input placeholder="Họ và tên" size="large" />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                      },
                    ]}
                  >
                    <Input placeholder="Số điện thoại" size="large" />
                  </Form.Item>
                  <Form.Item name="email">
                    <Input placeholder="Email (Không bắt buộc)" size="large" />
                  </Form.Item>

                  <h2 className="text-lg font-semibold mt-6 mb-4">
                    Hình thức nhận hàng
                  </h2>
                  <Form.Item name="delivery" initialValue="home">
                    <Radio.Group>
                      <Radio value="home" onClick={()=>onForm()}>Giao hàng tận nơi</Radio>
                      <Radio value="store" onClick={()=>onForm()} className="ml-6">
                        Nhận tại cửa hàng
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name="address" className={form ? "block" : "hidden"}>
                    <Input
                      placeholder="Tỉnh/Thành Phố, Quận/Huyện, Phường Xã"
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item name="note">
                    <Input.TextArea
                      placeholder="Ghi chú (Ví dụ: Hãy gọi tôi khi chuẩn bị hàng xong)"
                      rows={3}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Checkbox>Nhờ người khác nhận hàng</Checkbox>
                  </Form.Item>
                  <Form.Item>
                    <Checkbox>Yêu cầu hỗ trợ kỹ thuật</Checkbox>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
          <div className="w-1/3 shadow-md rounded-lg max-sm:w-full">
            <div className="mt-6 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Thông tin đơn hàng</h3>
              <div className="flex justify-between pb-2 text-sm border-b border-gray-200">
                <span>Tổng tiền</span>
                <span>120000000 đ</span>
              </div>
              <div className="flex justify-between mt-2 text-sm pb-2 border-b border-gray-20">
                <span>Tổng khuyến mãi</span>
                <span className="text-red-500">5690000 đ</span>
              </div>
              <div className="flex justify-between mt-2 text-lg font-semibold">
                <span>Cần thanh toán</span>
                <span className="text-red-600">45.99999 đ</span>
              </div>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold">
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InformationCustomer;
