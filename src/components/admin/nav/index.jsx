import {
  HomeFilled,
    TabletTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";


const NavbarAdmin = [
        {
          key: "1",
          icon: <HomeFilled/>,
          label: "DashBoard",
          path: "/admin",
        },
        {
          key: "2",
          icon: <UserOutlined/>,
          label: "Danh sách tài khoản",
          path: "/admin/users",
        },
        {
          key: "3",
          icon: <TabletTwoTone />,
          label: "Kiểu Laptop",
          path: "/admin/laptop-type",
        },
      
]
export default NavbarAdmin;
