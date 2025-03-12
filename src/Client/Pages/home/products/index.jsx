import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaAngleDoubleRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllProductDetail } from "../../../../redux/slice/productDetailSlice";
import { formatCurrency } from "../../../../ultis/formatnumber";

const Products = () => {
  const [dataProductDetails, setDataProductDetails] = useState([]);
  console.log("🚀 ~ dataProductDetails:", dataProductDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductDetail())
      .unwrap()
      .then((res) => {
        setDataProductDetails(res.productDetail);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <div className="container mx-auto mt-10">
        {/* Title + Price Filter */}
        <div className="relative flex flex-col md:flex-row items-center max-sm:items-start bg-gray-100 max-sm:bg-white mb-5">
          {/* Title chéo góc */}
          <div className="bg-[#3c80ba] text-white font-bold py-2 text-base md:text-lg relative inline-block">
            <div className="absolute top-0 right-0 w-6 md:w-7 h-full bg-white transform skew-x-[-30deg] origin-bottom-right"></div>
            <h2 className="font-bold text-base md:text-lg px-6 md:px-2 md:pr-6">
              LAPTOP GAMING
            </h2>
          </div>
          <button className="md:hidden max-sm:block flex items-center gap-2 bg-blue-500 text-white px-4 py-2 text-sm font-semibold rounded hover:bg-blue-600 transition">
            Xem tất cả <FaAngleDoubleRight />
          </button>
          {/* Price Filters */}
          <div className="text-xs max-sm:hidden md:text-sm  text-gray-700 pl-4 md:pl-7 flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start mt-2 md:mt-0">
            <span className="font-semibold">Mức giá:</span>
            <span className="text-blue-600 cursor-pointer hover:underline">
              5 TRIỆU - 10 TRIỆU
            </span>{" "}
            |
            <span className="text-blue-600 cursor-pointer hover:underline">
              10 TRIỆU - 20 TRIỆU
            </span>{" "}
            |
            <span className="text-blue-600 cursor-pointer hover:underline">
              20 TRIỆU - 30 TRIỆU
            </span>{" "}
            |
            <span className="text-blue-600 cursor-pointer hover:underline">
              30 TRIỆU - 40 TRIỆU
            </span>{" "}
            |
            <span className="text-blue-600 cursor-pointer hover:underline">
              40 TRIỆU - 50 TRIỆU
            </span>{" "}
            |
            <span className="text-blue-600 cursor-pointer hover:underline">
              TRÊN 50 TRIỆU
            </span>
          </div>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={15}
          pagination={false}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 25 },
          }}
          className="w-full"
        >
          {dataProductDetails &&
            dataProductDetails.map((product) => (
              <SwiperSlide key={product.id}>
                <NavLink to={`/product/`}>
                  <div className="relative border p-4 rounded-lg shadow-md bg-white h-80">
                    {product.discount && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs md:text-sm font-semibold rounded-full">
                        {product.discount}
                      </span>
                    )}
                    <img
                      src={product.product_id.image}
                      className="w-full h-40 md:h-48 lg:h-52 object-cover rounded-md"
                    />
                    <h3
                      className="text-center mt-2 text-[13px] text-[#333] overflow-hidden"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      <span className="capitalize">{`[${product.status}]`} </span>
                      <span>{product.product_id.name} </span>
                      <span>{product.year} </span>
                      <span>{product.name}</span>
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-center text-red-600 font-medium text-base md:text-lg">
                        {formatCurrency(product.price)}
                      </p>
                      {product.oldPrice && (
                        <p className="text-center text-gray-500 line-through text-sm md:text-base">
                          {product.oldPrice}
                        </p>
                      )}
                    </div>
                  </div>
                </NavLink>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export default Products;
