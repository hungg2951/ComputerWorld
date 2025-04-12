import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Switch,
  Button,
  message,
} from "antd";
import { useDispatch } from "react-redux";
import { createVoucher } from "../../../redux/slice/voucherSlice";

const { RangePicker } = DatePicker;

const VoucherForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    const { validRange, ...rest } = values;
    const payload = {
      ...rest,
      validFrom: validRange[0].toISOString(),
      validTo: validRange[1].toISOString(),
    };
    dispatch(createVoucher(payload))
      .unwrap()
      .then(() => {
        message.success("Tạo voucher thành công");
        form.resetFields();
      })
      .catch((error) => {
        message.error(error.message);
        setLoading(false)
      })
      .finally(() => setLoading(false));
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      initialValues={{
        discountType: "percent",
        isActive: true,
      }}
      width={300}
    >
      <Form.Item
        label="Mã Voucher"
        name="code"
        rules={[{ required: true, message: "Vui lòng nhập mã voucher" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Loại giảm giá"
        name="discountType"
        rules={[{ required: true }]}
      >
        <Select>
          <Select.Option value="percent">Phần trăm (%)</Select.Option>
          <Select.Option value="fixed">Số tiền cố định (VNĐ)</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Giá trị giảm"
        name="discountValue"
        rules={[{ required: true, message: "Vui lòng nhập giá trị giảm" }]}
      >
        <InputNumber
          min={1}
          addonAfter={<span>% hoặc VNĐ</span>}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Giảm tối đa (nếu là phần trăm)" name="maxDiscount">
        <InputNumber min={0} addonAfter="VNĐ" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Giá trị đơn hàng tối thiểu" name="minOrderValue">
        <InputNumber
          min={0}
          addonAfter="VNĐ"
          style={{ width: "100%" }}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₫"
          }
          parser={(value) => value.replace(/\₫|,/g, "")}
        />
      </Form.Item>

      <Form.Item
        label="Số lượng mã có thể sử dụng"
        name="quantity"
        rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
      >
        <InputNumber min={1} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Thời gian áp dụng"
        name="validRange"
        rules={[{ required: true, message: "Chọn khoảng thời gian" }]}
      >
        <RangePicker
          showTime
          style={{ width: "100%" }}
          format="DD-MM-YYYY HH:mm"
        />
      </Form.Item>

      <Form.Item label="Đang hoạt động" name="isActive" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Tạo Voucher
        </Button>
      </Form.Item>
    </Form>
  );
};

export default VoucherForm;
