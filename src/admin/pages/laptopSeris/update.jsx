import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAllBrands } from "../../../redux/slice/brandSlice";
import { updateLaptopSeris } from "../../../redux/slice/laptopSerisSlice";
const Update = ({ open, close, detailData, onChangeEdit }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [dataLaptopType, setDataLaptopType] = useState();
  useEffect(() => {
    if (detailData) {
      form.setFieldsValue({ ...detailData,brand_id: detailData.brand_id._id });
    }
  }, [detailData]);
  useEffect(() => {
    dispatch(getAllBrands())
      .unwrap()
      .then((res) => {
        setDataLaptopType(res);
      })
      .catch((e) => {
        {
          console.log(e);
        }
      });
  }, []);
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (detailData) {
          dispatch(updateLaptopSeris({ ...values, id: detailData._id }))
            .unwrap()
            .then(() => {
              form.resetFields();
              toast.success("Đã lưu chỉnh sửa !");
              onChangeEdit();
              close();
            })
            .catch((e) => {
              console.log(e);
              toast.warning(e.message);
            });
        }
      })
      .catch((info) => {
        console.log("Lỗi nhập dữ liệu:", info);
      });
  };
  return (
    <div>
      <Modal
        title="Nhập dữ liệu"
        open={open}
        onCancel={close}
        footer={[
          <Button key="cancel" onClick={close}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Cập nhật
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Dòng laptop"
            name="name"
            rules={[{ required: true, message: "Không được để trống!" }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>
          <Form.Item
            name="brand_id"
            rules={[{ required: true, message: "Vui lòng chọn hãng!" }]}
          >
            {dataLaptopType && dataLaptopType.length !== 0 ? (
              <Select
                placeholder="Chọn hãng"
                className="w-full"
              >
                {dataLaptopType.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            ) : null}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Update;
