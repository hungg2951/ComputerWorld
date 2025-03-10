import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Table, Image, Input, DatePicker, Space, Button } from "antd";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useDispatch } from "react-redux";
import { getAllProduct } from "../../../redux/slice/productSlice";
import {
  EditOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import ModelCreateProductDetails from "./modelCreateProductDetails";
import Update from "./update";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
const { Search } = Input;
const { RangePicker } = DatePicker;
const ProductAdminPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [dataFilter, setDataFilter] = useState(dataSource);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [
    isModalCreateProductDetailVisible,
    setIsModalCreateProductDetailVisible,
  ] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [dataProduct, setDataProduct] = useState();
  const [onChangeUpdateProduct, setOnChangeUpdateProduct] = useState(false);
  const OnChangeEditProduct = ()=>{
    setOnChangeUpdateProduct(!onChangeUpdateProduct)
  }
  const navigation = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProduct())
      .unwrap()
      .then((res) => {
        if (res) {
          setDataSource(
            res.products.map((item) => ({
              ...item,
              date: dayjs(item.createdAt).format("YYYY-MM-DD"),
            }))
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [onChangeUpdateProduct]);
  useEffect(() => {
    setDataFilter(dataSource);
  }, [dataSource]);
  // Xử lý tìm kiếm theo tên sản phẩm
  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
    filterData(value, dateRange);
  };

  // Xử lý lọc theo khoảng ngày
  const handleDateFilter = (dates) => {
    setDateRange(dates);
    filterData(searchText, dates);
  };

  // Hàm lọc dữ liệu
  const filterData = (searchValue, dateValues) => {
    let filteredData = dataSource;

    // Lọc theo tên sản phẩm
    if (searchValue) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );
    }

    // Lọc theo ngày tháng
    if (dateValues?.length === 2) {
      const [start, end] = dateValues;
      filteredData = filteredData.filter((item) => {
        const itemDate = dayjs(item.date).startOf("day");
        return (
          dayjs(itemDate).isSameOrAfter(start.format("YYYY-MM-DD")) &&
          dayjs(itemDate).isSameOrBefore(end.format("YYYY-MM-DD"))
        );
      });
    }

    setDataFilter(filteredData);
  };
  // Cột trong bảng
  const columns = [
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh Sản Phẩm",
      dataIndex: "image",
      key: "image",
      render: (text) => <Image src={text} width={80} />,
    },
    {
      title: "Hãng Sản Xuất",
      dataIndex: "laptop_series_id",
      key: "laptop_series_id",
      render: (item, record, index) => <div>{item?.name}</div>,
    },
    {
      title: "Ngày Nhập Kho",
      dataIndex: "date",
      key: "date",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "",
      render: (item, record, index) => (
        <div className="flex justify-end">
          <Button
            onClick={() => {
              setDataProduct(record);
              setIsModalCreateProductDetailVisible(true);
            }}
          >
            <PlusCircleOutlined /> Thêm cấu hình
          </Button>
        </div>
      ),
    },
    {
      title: "",
      render: (item, record, index) => (
        <div className="flex justify-end">
          <Button>
            <QuestionCircleOutlined /> Chi tiết
          </Button>
        </div>
      ),
    },
    {
      title: "",
      render: (item, record, index) => (
        <div className="">
          <Button
            onClick={() => {
              setDataProduct(record);
              setModalUpdate(true);
            }}
          >
            <EditOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div>
        {/* Thanh tìm kiếm & bộ lọc ngày */}
        <Space style={{ marginBottom: 16 }}>
          <Search
            placeholder="Tìm kiếm sản phẩm..."
            allowClear
            onSearch={handleSearch}
            style={{ width: 200 }}
          />
          <RangePicker onChange={handleDateFilter} />
          <Button
            onClick={() => navigation("/admin/products/create")}
            type="primary"
          >
            <PlusCircleOutlined />
            Thêm sản phẩm mới
          </Button>
        </Space>
        {/* modal create product details */}
        <ModelCreateProductDetails
          visible={isModalCreateProductDetailVisible}
          onClose={() => setIsModalCreateProductDetailVisible(false)}
          dataProduct={dataProduct}
        />
        {/* modal update product */}
        <Update
          visible={modalUpdate}
          onClose={() => setModalUpdate(false)}
          dataProduct={dataProduct}
          OnChangeEditProduct={OnChangeEditProduct}
        />
        {/* Bảng hiển thị sản phẩm */}
        <Table dataSource={dataFilter} columns={columns}  pagination={{ pageSize: 5}}/>
      </div>
    </div>
  );
};

export default ProductAdminPage;
