import {
  BoxPlotFilled,
  PieChartFilled,
  ProfileFilled,
  ProjectFilled,
  SettingFilled,
  ShoppingFilled,
  SlidersFilled,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { BsTicketPerforatedFill } from "react-icons/bs";

const NavbarAdmin = [
  {
    key: "1",
    icon: <PieChartFilled />,
    label: "DashBoard",
    path: "/admin",
  },
  {
    key: "2",
    icon: <UserOutlined />,
    label: "Danh sách tài khoản",
    path: "/admin/users",
  },
  {
    key: "3",
    icon: <SlidersFilled />,
    label: "Kiểu Laptop",
    path: "/admin/laptop-type",
  },
  {
    key: "4",
    icon: <BoxPlotFilled />,
    label: "Hãng",
    path: "/admin/brand",
  },
  {
    key: "5",
    icon: <ProjectFilled />,
    label: "Dòng laptop",
    path: "/admin/laptop-seris",
  },
  {
    key: "6",
    icon: <ProfileFilled />,
    label: "Sản phẩm",
    path: "/admin/products",
  },
  {
    key: "7",
    icon: <ShoppingFilled />,
    label: "Đơn hàng",
    path: "/admin/orders",
  },
  {
    key: "8",
    icon: <BsTicketPerforatedFill />,
    label: "Mã giảm giá",
    path: "/admin/vouchers",
  },
  {
    key: "9",
    icon: <SettingFilled />,
    label: "Cài đặt",
    path: "/admin/setting",
  },
];
export default NavbarAdmin;
