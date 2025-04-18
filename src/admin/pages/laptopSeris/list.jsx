import React, { useEffect, useRef, useState } from "react";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useDispatch } from "react-redux";
import Update from "./update";
import { laptopSerisGetAll } from "../../../redux/slice/laptopSerisSlice";

const List = ({ change }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [dataSource, setdataSource] = useState();
  const [modelEdit, setModelEdit] = useState(false);
  const [changeEdit, setchangeEdit] = useState(false);
  const [detailData, setDetailData] = useState();
  const searchInput = useRef(null);
  const dispatch = useDispatch();
  const onChangeEdit = ()=>{
    setchangeEdit(!changeEdit)
  }
  const closeModel = () => {
    setModelEdit(false);
  };
  const openModel = () => {
    setModelEdit(true);
  };
  useEffect(() => {
    dispatch(laptopSerisGetAll())
      .unwrap()
      .then((res) => {
        setdataSource(res);
      })
      .catch((e) => {
        {
          console.log(e);
        }
      });
  }, [change,changeEdit]);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "STT",
      key: "_id",
      render:(item,record,index)=><div>{index+1}</div>
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Brand",
      dataIndex: "brand_id",
      key: "brand_id",
      ...getColumnSearchProps("name"),
      render:(item)=><div>{item?item.name:""}</div>,
      // sorter: (a, b) => a.name - b.name
    },
    {
      title: "Hành động",
      key: "name",
      render: (item, record, index) => (
        <Button onClick={() => openModel()}>
          <EditOutlined className="cursor-pointer" />Chỉnh sửa
        </Button>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          onClick: () => {
            setDetailData(record);
          },
        })}
      />
      <Update onChangeEdit = {onChangeEdit} open={modelEdit} close={closeModel} detailData={detailData} />
    </>
  );
};

export default List;
