import React, { useEffect, useState } from "react";
import { Form, Input, Radio, Checkbox, Select, Button } from "antd";
import ChooseAddress from "./chooseAddress";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserIdFromToken } from "./../../../ultis/isAuthenticated";
import { useDispatch } from "react-redux";
import {
  createOrder,
  createOrderByMomo,
} from "../../../redux/slice/orderSlice";
import { createOrderDetail } from "../../../redux/slice/orderDetailSlice";
import { updateVoucher, useVoucher } from "../../../redux/slice/voucherSlice";
import { sendmailOrder } from "./../../../redux/slice/sendmailSlice";
import { contentEmail, subject } from "../../../ultis/contentSendmailOrder";

const { Option } = Select;

const InformationCustomer = () => {
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;
  const code = location.state?.code || "";
  const discount = location.state?.discount || 0;
  const checkoutCart = location.state?.cart || [];
  const [form] = Form.useForm();
  const [toggle, setToggle] = useState(true);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState();
  const [dataCheckout, setDataCheckout] = useState();
  const [messageAddress, setmessageAddress] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    setDataCheckout(dataFilter);
  }, [checkoutCart]);

  const removeUndefinedFields = (obj) => {
    /// lọc các trường undefined và ""
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});
  };
  const removeFields = (obj, fieldsToRemove) =>
    Object.fromEntries(
      Object.entries(obj).filter(([key]) => !fieldsToRemove.includes(key))
    );

  const onSubmit = () => {
    setLoading(true);
    const user_id = getUserIdFromToken(); // Kiểm tra userId
    let checkVoucher = true;
    form
      .validateFields()
      .then(async (values) => {
        if (user_id && user_id !== undefined) {
          values = { ...values, user_id };
        }
        values = removeUndefinedFields(values);
        if (toggle) {
          if (address === undefined || values.address === undefined) {
            setLoading(false);
            setmessageAddress("Vui lòng chọn địa chỉ !");
            return;
          }
          if (values.payment_method !== "momo") {
            Swal.fire({
              icon: "warning",
              title: "Vui lòng chọn đúng phương thức thanh toán!",
              confirmButtonText: "OK",
            });
            setLoading(false);
            return;
          }
        }

        values.address = values.address + "," + address;
        const informationClient = removeFields(values, [
          "deliveryMethod",
          "payment_method",
          "user_id",
          "note",
        ]);
        if (!toggle) {
          delete informationClient.address;
        }
        if (code !== "") {
          await dispatch(useVoucher({ code, userId: user_id }))
            .unwrap()
            .then(() => {
              checkVoucher = true;
            })
            .catch((e) => {
              setLoading(false);
              checkVoucher = false;
              Swal.fire({
                icon: "warning",
                title: e.message,
                showConfirmButton: true,
              });
            });
        }
        if (!checkVoucher) return;
        if (values.payment_method === "momo") {
          // thanh toán qua momo
          dispatch(
            createOrderByMomo({
              ...values,
              informationClient,
              total_price: totalPrice - discount,
            })
          )
            .unwrap()
            .then((res) => {
              dataCheckout.map((item) => {
                dispatch(
                  createOrderDetail({ ...item, order_id: res.newOrder._id })
                )
                  .unwrap()
                  .then(() => {
                    if (values.email !== "" && values.email) {
                      // kiêm tra gửi email mã đơn hàng
                      dispatch(
                        sendmailOrder({
                          email: values.email,
                          subject: subject,
                          html: contentEmail(res.orderId),
                        })
                      );
                    }
                    setTimeout(() => {
                      window.location.href = res.paymentUrl;
                      localStorage.removeItem("cart");
                    }, 1500);
                  })
                  .catch((e) => {
                    console.log(e);
                  })
                  .finally(() => setLoading(false));
              });
            })
            .catch((e) => {
              console.log(e);
            });
          return;
        }
        if (values.payment_method === "cash") {
          // thanh toán khi nhận hàng
          var orderId = "ComputerWorld" + new Date().getTime();
          dispatch(
            createOrder({
              ...values,
              informationClient,
              total_price: totalPrice - discount,
              orderId,
            })
          )
            .unwrap()
            .then((res) => {
              dataCheckout.map((item) => {
                dispatch(
                  createOrderDetail({ ...item, order_id: res.order._id })
                )
                  .unwrap()
                  .then(() => {
                    if (values.email !== "" && values.email) {
                      // kiêm tra gửi email mã đơn hàng
                      dispatch(
                        sendmailOrder({
                          email: values.email,
                          subject: subject,
                          html: contentEmail(res.order.orderId),
                        })
                      )
                        .unwrap()
                        .catch((e) => console.log(e));
                    }
                    Swal.fire({
                      icon: "success",
                      title: "Đặt hàng thành công!",
                      showConfirmButton: false,
                      timer: 1200,
                    });
                    setTimeout(() => {
                      navigate(`/checkout?orderId=${res.order.orderId}`);
                      localStorage.removeItem("cart");
                    }, 1500);
                  })
                  .catch((e) => {
                    console.log(e);
                  })
                  .finally(() => setLoading(false));
              });
            })
            .catch((e) => {
              console.log(e);
            });

          return;
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
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
                <span>{totalPrice.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between mt-2 text-sm pb-2 border-b border-gray-20">
                <span>Tổng khuyến mãi</span>
                <span className="text-red-500">
                  {discount > 0 ? discount.toLocaleString() : 0}đ
                </span>
              </div>
              <div className="flex justify-between mt-2 text-lg font-semibold">
                <span>Cần thanh toán</span>
                <span className="text-red-600">
                  {(totalPrice - discount).toLocaleString()}
                </span>
              </div>
              <Button
                loading={loading}
                onClick={() => onSubmit()}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
              >
                Đặt hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InformationCustomer;
