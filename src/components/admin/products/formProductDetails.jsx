import { Button, Form, Input, Select, Space } from "antd";
import React from "react";
import { productDetailAttributes } from "../../../ultis/dataTableProductDetails";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const { Option } = Select;
const FormProductDetails = () => {
  return (
    <div>
      <Form.List name="product_details" className="">
        {(fields, { add, remove }, index) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                align="baseline"
                className="border-b border-gray-500 mb-5 grid grid-cols-3"
              >
                {productDetailAttributes.length != 0
                  ? productDetailAttributes.map((item) => (
                      <div>
                        <Form.Item
                          {...restField}
                          name={[name, item.name]}
                          rules={item.rules}
                        >
                          <Input placeholder={item.placeholder} />
                        </Form.Item>
                      </div>
                    ))
                  : null}
                <Form.Item {...restField} name={[name, "status"]}>
                  <Select placeholder="Trạng thái sản phẩm theo cấu hình">
                    <Option value="new">New</Option>
                    <Option value="likenew">Like new</Option>
                  </Select>
                </Form.Item>
                {fields.length > 1 && (
                  <Button
                    className="mb-2"
                    danger
                    icon={<MinusCircleOutlined />}
                    onClick={() => remove(name)}
                  >
                    Hủy bỏ
                  </Button>
                )}
              </Space>
            ))}
            <Form.Item className="block">
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Thêm cấu hình cho sản phẩm
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default FormProductDetails;
