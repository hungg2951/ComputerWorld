import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchProductDetail } from "./../../../redux/slice/productDetailSlice";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [dataSource, setDataSource] = useState();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchProductDetail({ query }))
      .unwrap()
      .then((res) => {
        setDataSource(res.productDetails);
      });
  }, [query]);
  return (
    <div className="w-[1220px] mx-auto my-14">
      <div className="container mx-auto p-4">
        <h2 className="text-center text-3xl my-10 font-medium">
          Có{" "}
          <span className="text-blue-700 font-bold">{dataSource && dataSource.length}</span>{" "}
          sản phẩm phù hợp với từ khóa:{" "}
          <span className="text-blue-700 font-bold">{query}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {dataSource && dataSource.length > 0 ? (
            dataSource.map((product) => (
              <div key={product._id} className="border p-4 rounded shadow cursor-pointer group" onClick={()=>navigate(`/product/${product.slug}`)}>
                <img
                  src={product.product_id.image}
                  alt={product.name}
                  className="w-full h-40 object-cover mb-2"
                />
                <h2
                  className="text-center mt-2 text-[15px] text-[#333] overflow-hidden group-hover:text-blue-600"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  <span>[{product.status}] </span>
                  <span>{product.product_id.name} </span>
                  <span>{product.year} </span>
                  <span>{product.name}</span>
                </h2>
                <p className="text-red-500 font-bold text-center py-4 text-xl">
                  {product.price.toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Không tìm thấy sản phẩm nào!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
