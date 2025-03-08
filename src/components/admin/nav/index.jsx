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
        {
          key: "4",
          icon: <TabletTwoTone />,
          label: "Hãng",
          path: "/admin/brand",
        },
        {
          key: "5",
          icon: <TabletTwoTone />,
          label: "Dòng laptop",
          path: "/admin/laptop-seris",
        },
        {
          key: "6",
          icon: <TabletTwoTone />,
          label: "Sản phẩm",
          path: "/admin/products",
        },
      
]
export default NavbarAdmin;
