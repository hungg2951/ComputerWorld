import React, { forwardRef, useImperativeHandle } from "react";
import { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadAPI } from "../../../api/upload";
const UploadPage = forwardRef(({ maxFiles }, ref) => {
  const [fileList, setFileList] = useState([]);

  const handleUpload = async () => {
    if (fileList.length === 0) {
      //   message.error("Vui lòng chọn một ảnh!");
      return;
    }
    if (fileList.length > maxFiles) {
        // message.error("Vui lòng chọn 1 ảnh đại diện sản phẩm");
        return;
      }
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });
    try {
      const { data } = await uploadAPI.uploadImage(formData);
      setFileList([]);
      return data.urls;
      //   message.success("Tải ảnh lên thành công!");
    } catch (error) {
      message.error("Tải ảnh thất bại!");
    }
  };
  useImperativeHandle(ref, () => ({
    handleUpload,
  }));
  return (
    <>
      <Upload
        multiple
        listType="picture"
        fileList={fileList}
        beforeUpload={(file) => {
          if (fileList.length >= maxFiles) {
            message.error(`Chỉ được upload tối đa ${maxFiles} ảnh!`);
            return false;
          }
          setFileList((prev) => [
            ...prev,
            { ...file, originFileObj: file }, // Giữ nguyên file
          ]);
          return false;
        }}
        onRemove={(file) => {
          setFileList(fileList.filter((item) => item.uid !== file.uid));
        }}
      >
        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
      </Upload>
    </>
  );
});

export default UploadPage;
