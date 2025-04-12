import LayoutAdmin from "../layout";
import BrandPage from "../pages/brand";
import Dashboard from "../pages/dashboard";
import LaptopSerisPage from "../pages/laptopSeris";
import LaptopType from "../pages/laptopType";
import OrdersPage from "../pages/orders";
import OrderDetails from "../pages/orders/orderDetails";
import ProductAdminPage from "../pages/products";
import CreateProductPage from "../pages/products/create";
import ProductDetailsByProduct from "../pages/products/productDetails";
import CreateDescription from "../pages/products/productDetails/createDesc";
import ListUsers from "../pages/users";
import VoucherPage from "../pages/voucher";
import VoucherForm from "../pages/voucher/create";
import VoucherFormUpdate from "../pages/voucher/update";
import ProtectedRoute from "../ProtectedRoute";
import Setting from './../pages/setting/index';

const RoutePrivate = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <LayoutAdmin />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "admin",
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "users",
            element: <ListUsers />,
          },
          {
            path: "laptop-type",
            element: <LaptopType />,
          },
          {
            path: "brand",
            element: <BrandPage />,
          },
          {
            path: "laptop-seris",
            element: <LaptopSerisPage />,
          },
          {
            path: "products",
            element: <ProductAdminPage />,
          },
          {
            path: "product/create",
            element: <CreateProductPage />,
          },
          {
            path: "product/:slug",
            element: <ProductDetailsByProduct />,
          },
          {
            path: "product-detail/:slug",
            element: <CreateDescription />,
          },
          {
            path: "orders",
            element: <OrdersPage />,
          },
          {
            path: "vouchers",
            element: <VoucherPage />,
          },
          {
            path: "voucher/create",
            element: <VoucherForm />,
          },
          {
            path: "voucher/update",
            element: <VoucherFormUpdate />,
          },
          {
            path: "setting",
            element: <Setting />,
          },
          {
            path: "order-details",
            element: <OrderDetails />,
          },
        ],
      },
    ],
  },
];
export default RoutePrivate;