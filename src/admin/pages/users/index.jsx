import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useDispatch } from "react-redux";
import { userGetAll, userUpdate } from "../../../redux/slice/userSlice";
import { toast } from "react-toastify";

const ListUsers = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const dispatch = useDispatch();
  const [users, setUsers] = useState();
  const searchInput = useRef(null);
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
  const { Option } = Select;

  const handleChange = (value, option) => {
    dispatch(userUpdate({ status: value, id: option.extra }))
      .unwrap()
      .then(() => {
        toast.success("Thành công");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    dispatch(userGetAll())
      .then((res) => {
        setUsers(res.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const columns = [
    {
      title: "STT",
      key: "name",
      render: (item, record, index) => <div>{index + 1}</div>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },

    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "20%",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "vai trò",
      dataIndex: "role",
      key: "role",
      ...getColumnSearchProps("role"),
      sorter: (a, b) => a.role.length - b.role.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (item, record, index) => {
        return (
          <div>
            <Select
              defaultValue={item}
              style={{ width: 150 }}
              onChange={(value, option) => handleChange(value, option)}
            >
              <Option value={true} extra={record._id}>
                Đang hoạt động
              </Option>
              <Option value={false} extra={record._id}>
                Vô hiệu hóa
              </Option>
            </Select>
          </div>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={users} />;
};

export default ListUsers;
