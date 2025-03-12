import React, { useEffect, useState } from "react";
import { Button, Form, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // CSS của Quill
import { useDispatch } from "react-redux";
import {
  getOneProductDetail,
  updateProductDetail,
} from "../../../../redux/slice/productDetailSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const CreateDescription = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  console.log("🚀 ~ CreateDescription ~ Data:", data);
  const { slug } = useParams();
  useEffect(() => {
    if (slug) {
      dispatch(getOneProductDetail(slug))
        .unwrap()
        .then((res) => {
          setData(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [slug]);
  useEffect(()=>{
    if(data){
        form.setFieldsValue(data);
    }
  },[data])
  const onFinish = async (values) => {
    if (!slug) return null;
    dispatch(updateProductDetail({ ...values, id: data._id }))
      .unwrap()
      .then(() => {
        toast.success("Cập nhật mô tả thành công");
      })
      .catch(() => {
        toast.error("Cập nhật mô tả thất bại");
      });
  };
  return (
    <div>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Mô tả sản phẩm"
          name="description"
          rules={[{ required: true, message: "Vui lòng viết mô tả!" }]}
        >
          <ReactQuill theme="snow" placeholder="Nhập mô tả sản phẩm..." />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu bài viết
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateDescription;
