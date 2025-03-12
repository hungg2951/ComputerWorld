import LayoutAdmin from "../layout";
import BrandPage from "../pages/brand";
import Dashboard from "../pages/dashboard";
import LaptopSerisPage from "../pages/laptopSeris";
import LaptopType from "../pages/laptopType";
import ProductAdminPage from "../pages/products";
import CreateProductPage from "../pages/products/create";
import ProductDetailsByProduct from "../pages/products/productDetails";
import CreateDescription from "../pages/products/productDetails/createDesc";
import ListUsers from "../pages/users";
import ProtectedRoute from "../ProtectedRoute";

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
        ],
      },
    ],
  },
];
export default RoutePrivate;