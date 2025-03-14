import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Card, Button } from "antd";
import { CopyOutlined } from "@ant-design/icons";
const Checkout = () => {
  const [searchParams] = useSearchParams();
  const allParams = Object.fromEntries([...searchParams]);
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(allParams.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 10000);
  };
  return (
    <div className="mt-32 mb-14">
      <div className="p-6 max-w-fit mx-auto">
        <Card title="Trạng thái đơn hàng" className="p-4 text-center">
          <p className="text-lg font-bold text-blue-500">
            Đơn hàng #<span className="cursor-pointer" onClick={()=>copyToClipboard()}>{allParams.orderId}</span> :{" "}
            {allParams.resultCode === "0" ? "Đã thanh toán" : "Chưa thanh toán"}
          </p>
          <p>Đơn hàng của bạn đang chờ được xác nhận!</p>
          <p className="text-gray-500">
            ( Hãy lưu lại mã đơn hàng để có thể theo dõi đơn hàng của bạn )
          </p>
          <Button icon={<CopyOutlined />} onClick={()=>copyToClipboard()} className="my-5">Coppy mã đơn hàng</Button>
          <p className="text-blue-500 mt-2">{copied ? "Đã sao chép!":""}</p>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
