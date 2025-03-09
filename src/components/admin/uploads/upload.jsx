import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadAPI } from "../../../api/upload";
const UploadPage = forwardRef(({ maxFiles, defaultImages = [] , handleChange}, ref) => {
  const [fileList, setFileList] = useState([]);
  // Khi nhận ảnh mặc định từ props, cập nhật fileList
  useEffect(() => {
    if (defaultImages.length > 0) {
      const formattedImages = defaultImages.map((url, index) => ({
        uid: `-default-${index}`, // Tạo UID duy nhất
        name: `image-${index}.png`,
        status: "done",
        url, // Gán URL ảnh cũ
      }));
      setFileList(formattedImages);
    }
  }, [defaultImages]);
  // Lọc ảnh mới cần upload (có originFileObj)
  const newImages = fileList.filter((file) => file.originFileObj);

  // Ảnh cũ giữ nguyên URL
  const oldImages = fileList
    .filter((file) => !file.originFileObj)
    .map((file) => file.url);
  const handleUpload = async () => {
    if (fileList.length === 0) {
      //   message.error("Vui lòng chọn một ảnh!");
      return;
    }
    if (fileList.length > maxFiles) {
      // message.error("Vui lòng chọn 1 ảnh đại diện sản phẩm");
      console.log("Chọn số ảnh phù hợp");

      return;
    }
    const formData = new FormData();
    newImages.forEach((file) => {
      formData.append("images", file.originFileObj);
    });
    try {
      const { data } = await uploadAPI.uploadImage(formData);
      setFileList([]);
      return  [...oldImages, ...data.urls];
      //   message.success("Tải ảnh lên thành công!");
    } catch (error) {
      message.error("Tải ảnh thất bại!");
    }
  };

  /// xử lý để component cha có thể gọi hàm
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
            { ...file, uid: `${file.uid}-${Date.now()}`, originFileObj: file }, // Giữ nguyên file
          ]);
          return false;
        }}
        onRemove={(file) => {
          setFileList(fileList.filter((item) => item.uid !== file.uid));
        }}
        onChange={handleChange}
      >
        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
      </Upload>
    </>
  );
});

export default UploadPage;
