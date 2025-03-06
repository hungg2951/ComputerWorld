import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import React from "react";


const NavbarAdmin = [
        {
          key: "1",
          icon: <UserOutlined/>,
          label: "DashBoard",
          path: "/admin",
        },
        {
          key: "2",
          icon: <VideoCameraOutlined />,
          label: "Danh sách tài khoản",
          path: "/admin/users",
        },
        {
          key: "3",
          icon: <UploadOutlined />,
          label: "nav 3",
        },
]
export default NavbarAdmin;
