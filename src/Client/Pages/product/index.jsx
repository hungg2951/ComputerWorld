import {
  FaCheckCircle,
  FaStar,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import DescriptionProduct from "./description";

const ProductDetail = () => {
  const configurations = [
    {
      id: 1,
      cpu: "Core i7-11800H, 32GB, 512GB",
      gpu: "Nvidia Quadro T1200, 15.6 FHD+",
      price: "19.990.000đ",
    },
    {
      id: 2,
      cpu: "Core i7-11800H, 16GB, 1TB",
      gpu: "Nvidia Quadro A2000, 15.6 FHD+",
      price: "22.990.000đ",
    },
    {
      id: 3,
      cpu: "Core i7-10750H, 16GB, 512GB",
      gpu: "Nvidia Quadro T1000, 15.6 FHD+",
      price: "16.390.000đ",
    },
    {
      id: 4,
      cpu: "Core i7-10750H, 16GB, 512GB",
      gpu: "Nvidia Quadro T2000, 15.6 FHD+",
      price: "17.390.000đ",
    },
  ];
  const images = [
    "https://laptopworld.vn/media/product/20172_87249_pc_lenovo_aio_24irh9_f0hn0030vn_2.jpg",
    "https://laptopworld.vn/media/product/20172_87249_pc_lenovo_aio_24irh9_f0hn0030vn_1.jpg",
    "https://laptopworld.vn/media/product/20172_87249_pc_lenovo_aio_24irh9_f0hn0030vn_7.jpg",
    "https://laptopworld.vn/media/product/20172_87249_pc_lenovo_aio_24irh9_f0hn0030vn_5.jpg",
  ];
  const [selectedConfig, setSelectedConfig] = useState(2);
  return (
    <div className=" p-4 mt-28 max-w-[1220px] mx-auto">
      {/* Product Info */}
      <div className="bg-white p-6 shadow-lg rounded-md grid grid-cols-12 gap-6 max-sm:block">
        {/* Left: Images */}
        <div className="col-span-4">
          
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            className="rounded-lg shadow-md"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <img src={src} alt="Laptop" className="w-full rounded-lg" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right: Details */}
        <div className="col-span-5">
          <h1 className="text-xl font-bold text-gray-800">
            [Like New] Dell Precision 15 5560 (Core i7-11800H, 16GB, 1TB, Nvidia
            Quadro A2000, 15.6'' FHD+)
          </h1>
          <p className="text-red-600 text-2xl font-bold">22.990.000₫</p>
          <p className="line-through text-gray-500">25.990.000₫</p>
          <p>
            <span className="font-bold">Bảo hành:</span> 12 tháng LaptopAZ
          </p>
          <p>
            <span className="font-bold">Tình trạng:</span> Còn hàng
          </p>
          {/*  */}
          <div className="p-4">
            <a href="#" className="text-blue-600 hover:underline text-sm">
              Xem chi tiết cấu hình
            </a>

            <h2 className="font-bold mt-2">CẤU HÌNH:</h2>

            <div className="grid md:grid-cols-2 gap-3 mt-3 max-sm:grid-cols-2">
              {configurations.map((config) => (
                <div
                  key={config.id}
                  className={`border rounded-lg p-3 flex items-start gap-2 cursor-pointer ${
                    selectedConfig === config.id ? "border-blue-500" : ""
                  }`}
                  onClick={() => setSelectedConfig(config.id)}
                >
                  <div className="flex-shrink-0">
                    {selectedConfig === config.id ? (
                      <FaCheckCircle className="text-green-500 text-lg" />
                    ) : (
                      <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <p className="text-[13px] text-gray-700">
                      {config.cpu},{config.gpu}
                    </p>
                    {/* <p className="text-sm text-gray-700"></p> */}
                    <p className="text-red-600 font-medium text-sm">
                      {config.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Gifts */}
          <div className="bg-green-100 p-4 mt-4 rounded-md">
            <h2 className="text-green-600 font-bold flex items-center">
              <FaCheckCircle className="mr-2" /> QUÀ TẶNG/KHUYẾN MẠI
            </h2>
            <ul className="mt-2 text-sm text-gray-700">
              <li className="flex items-center">
                <FaCheckCircle className="text-green-600 mr-2" /> Tặng Windows
                11 bản quyền
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-600 mr-2" /> Miễn phí cân
                màu màn hình
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-600 mr-2" /> Balo thời
                trang
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-600 mr-2" /> Chuột không
                dây cao cấp
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-600 mr-2" /> Gói cài đặt
                phần mềm trọn đời
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex gap-4">
            <button className="bg-red-600 text-white px-6 py-2 rounded-md font-bold shadow-md hover:bg-red-700">
              Mua ngay
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-bold shadow-md hover:bg-blue-700">
              Trả góp qua thẻ tín dụng
            </button>
          </div>
        </div>
        {/* Contact & Assurance */}
        <div className="mt-6 col-span-3">
          {/* Assurance Box */}
          <div className="col-span-4 bg-white p-4 shadow-md rounded-md">
            <h3 className="font-bold text-red-600">
              YÊN TÂM MUA SẮM TẠI LAPTOP AZ
            </h3>
            <ul className="mt-2 text-sm text-gray-700">
              <li className="flex items-center">
                <FaStar className="text-yellow-500 mr-2" /> Chất lượng sản phẩm
                là hàng đầu
              </li>
              <li className="flex items-center">
                <FaStar className="text-yellow-500 mr-2" /> Dùng thử 15 ngày lỗi
                1 đổi 1
              </li>
              <li className="flex items-center">
                <FaStar className="text-yellow-500 mr-2" /> Hỗ trợ kỹ thuật sau
                bán hàng
              </li>
              <li className="flex items-center">
                <FaStar className="text-yellow-500 mr-2" /> Trả góp ưu đãi lãi
                suất thấp
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-4 bg-white p-4 shadow-md rounded-md">
            <h3 className="font-bold text-gray-800">Liên hệ</h3>
            <p className="flex items-center mt-2">
              <FaPhoneAlt className="text-blue-600 mr-2" /> 01230456789
            </p>
            <p className="flex items-center mt-2">
              <FaEnvelope className="text-blue-600 mr-2" />{" "}
               contact@computerworld.com
            </p>
          </div>

          {/* Social Share */}
          <div className=" bg-white p-4 shadow-md rounded-md w-full text-sm">
            <button className=" bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 mr-2">
              <AiFillLike className=" inline" /> Thích 43K
            </button>
            <button className=" bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700">
               Chia sẻ
            </button>
          </div>
        </div>
      </div>
      {/* Description */}
      <DescriptionProduct/>
    </div>
  );
};

export default ProductDetail;
