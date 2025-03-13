import React, { useEffect, useState } from "react";
import { Form, Input, Radio, Checkbox, Select, message } from "antd";
import ChooseAddress from "./chooseAddress";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const { Option } = Select;

const InformationCustomer = () => {
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;
  const checkoutCart = location.state?.cart || [];
  const [form] = Form.useForm();
  const [toggle, setToggle] = useState(true);
  const [address, setAddress] = useState();
  const [dataCheckout, setDataCheckout] = useState();
  const [messageAddress, setmessageAddress] = useState("");
  const navigate = useNavigate();

  //lọc lại dữ liệu
  useEffect(() => {
    const dataFilter = checkoutCart.map(
      ({ _id, product_id, quantity, price }) => ({
        product_id: product_id._id,
        product_detail_id: _id,
        quantity,
        price,
        total: price * quantity,
      })
    );
    setDataCheckout(dataFilter)
  }, [checkoutCart]);
  
  console.log(dataCheckout);

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (toggle) {
          if (address === undefined || values.address === undefined)
            return setmessageAddress("Vui lòng chọn địa chỉ !");
          if (values.payment_method !== "momo") {
            Swal.fire({
              icon: "warning",
              title: "Vui lòng chọn đúng phương thức thanh toán!",
              confirmButtonText: "OK",
            });
            return;
          }
        }
        values.address = values.address + "," + address;
        if (!toggle) {
          delete values.address;
        }
        if (values.payment_method === "momo") {
          // thanh toán qua momo
          console.log("🚀thanh toán qua momo:", values);
          toast.success("Đã thanh toán Đặt hàng qua momo");
          return;
        }
        if (values.payment_method === "cash") {
          // thanh toán khi nhận hàng
          toast.success("Chưa thanh toán");
          console.log("🚀 thanh toán sau:", values);
          return;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (location.state === null) return navigate("/cart");
  }, [location]);

  return (
    <>
      <div className="p-4 md:p-8 min-h-screen mt-20 max-w-[1220px] mx-auto max-sm:w-full max-sm:p-0">
        <div className="max-w-full mx-auto bg-white p-6 rounded-lg flex justify-between gap-5 max-sm:flex-wrap">
          <div className="w-2/3 shadow-md rounded-lg max-sm:w-full">
            <div className=" md:p-8 flex justify-center">
              <div className="w-full bg-white">
                <h2 className="text-lg font-semibold mb-4">
                  Thông tin người đặt hàng
                </h2>
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={{ deliveryMethod: "home_delivery" }}
                >
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
                  <Form.Item name="deliveryMethod" initialValue="home">
                    <Radio.Group defaultValue={"home_delivery"}>
                      <Radio
                        value="home_delivery"
                        onClick={() => setToggle(true)}
                      >
                        Giao hàng tận nơi
                      </Radio>
                      <Radio
                        value="store_pickup"
                        onClick={() => {
                          setmessageAddress("");
                          setToggle(false);
                        }}
                        className="ml-6"
                      >
                        Nhận tại cửa hàng
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                  <div className={toggle ? "block" : "hidden"}>
                    <ChooseAddress setAddress={setAddress} />
                    <Form.Item name="address">
                      <Input
                        className="mt-3"
                        placeholder="Địa chỉ cụ thể: số nhà, thôn"
                        // size="large"
                      />
                    </Form.Item>
                    <p className="text-sm text-red-600 mt-[-15px] mb-3">
                      {messageAddress}
                    </p>
                  </div>
                  <Form.Item
                    name="payment_method"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn phương thức thanh toán",
                      },
                    ]}
                  >
                    <Select placeholder="Phương thức thanh toán">
                      <Option value="momo">Thanh toán qua momo</Option>
                      <Option value="cash" disabled={toggle}>
                        Thanh toán khi nhận hàng (chỉ áp dụng nhận hàng tại cửa
                        hàng)
                      </Option>
                    </Select>
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
                <span>{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mt-2 text-sm pb-2 border-b border-gray-20">
                <span>Tổng khuyến mãi</span>
                <span className="text-red-500">0 đ</span>
              </div>
              <div className="flex justify-between mt-2 text-lg font-semibold">
                <span>Cần thanh toán</span>
                <span className="text-red-600">
                  {totalPrice.toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => onSubmit()}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
              >
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
