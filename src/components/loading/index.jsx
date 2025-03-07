import { Spin } from "antd";
import { useSelector } from "react-redux";

const LoadingPage = () => {
  const isloading = useSelector((state) => state.loading.isLoading);
  
  if (!isloading) return null;
  return (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <Spin size="large" />
    </div>
  );
};

export default LoadingPage;
