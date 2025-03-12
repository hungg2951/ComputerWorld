import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductBySlug } from "../../../../redux/slice/productSlice";
import { getProductDetailByProduct } from "../../../../redux/slice/productDetailSlice";
import { Button, Table, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";
import ModalProductDetail from "../../../../components/modalProductDetail";
import UploadImages from "./uploadImages";
import Update from "./update";
const ProductDetailsByProduct = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState();
  const [productDetails, setProductDetails] = useState();
  const [productDetail, setProductDetail] = useState();
  const [onModalProductdetail, setOnModalProductdetail] = useState(false);
  const [onModalUploadImages, setOnModalUploadImages] = useState(false);
  const [onModalUpDate, setOnModalUpDate] = useState(false);
  const [onChangeData, setonChangeData] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const changeData = () => {
    setonChangeData(!onChangeData);
  };
  useEffect(() => {
    if (!onModalUploadImages && !onModalProductdetail && !onModalUpDate) {
      setProductDetail(null);
    }
  }, [onModalUploadImages, onModalProductdetail, onModalUpDate]);

  useEffect(() => {
    if (slug) {
      dispatch(getProductBySlug(slug))
        .unwrap()
        .then((res) => {
          setProduct(res.product);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [slug]);
  useEffect(() => {
    if (product) {
      dispatch(getProductDetailByProduct(product._id))
        .unwrap()
        .then((res) => {
          setProductDetails(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [product, onChangeData]);
  const columns = [
    {
      title: "STT",
      key: "_id",
      render: (item, record, index) => <div key={index}>{index + 1}</div>,
    },
    {
      title: "Tên sản phẩm",
      key: "name",
      render: (item, record, index) => (
        <div key={index}>
          <span className="capitalize">{`[${record.status ? record.status : ""}]`} </span>
          <span>{product.name ? product.name : ""}</span>
          <span> {record.year ? record.year : " "} </span>
          <span>{item.name ? item.name : ""}</span>
        </div>
      ),
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
      align: "center",
      filters: [
        { text: "Còn hàng", value: "inStock" },
        { text: "Hết hàng", value: "outOfStock" },
      ],
      onFilter: (value, record) => {
        if (value === "inStock") return record.stock > 0;
        if (value === "outOfStock") return record.stock === 0;
        return true;
      },
      render: (stock) =>
        stock > 0 ? (
          <Tag color="green">{stock}</Tag>
        ) : (
          <Tag color="red">Hết hàng</Tag>
        ),
    },
    {
      title: "Hành động",
      key: "_id",
      render: (item, record, index) => (
        <div className="flex gap-2" key={index}>
          <div>
            <Button
              onClick={() => {
                setProductDetail(record);
                setOnModalUploadImages(true);
              }}
            >
              Ảnh
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                setProductDetail(record);
                setOnModalProductdetail(true);
              }}
            >
              Chi tiết
            </Button>
          </div>
          <div>
            <Button
              onClick={() => navigation(`/admin/product-detail/${record.slug}`)}
            >
              Mô tả
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                setProductDetail(record);
                setOnModalUpDate(true);
              }}
            >
              <EditOutlined />
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={productDetails}
        pagination={{ pageSize: 10 }}
      />
      {/* Chi tiết thông số */}
      <ModalProductDetail
        onClose={() => setOnModalProductdetail(false)}
        visible={onModalProductdetail}
        data={productDetail}
      />
      {/* upload ảnh */}
      <UploadImages
        onClose={() => {
          setOnModalUploadImages(false);
          setOnModalProductdetail(null);
        }}
        visible={onModalUploadImages}
        data={productDetail}
        changeData={changeData}
      />
      {/* Update thông số */}
      <Update
        onClose={() => setOnModalUpDate(false)}
        visible={onModalUpDate}
        data={productDetail}
        onChangeData={changeData}
      />
    </>
  );
};

export default ProductDetailsByProduct;
