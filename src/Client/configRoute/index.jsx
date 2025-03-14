import HomePage from "../Pages/home";
import ProductDetail from "../Pages/product";
import Cart from "../Pages/cart";
import InformationCustomer from "../Pages/payment";
import LayoutClient from "../Layouts";
import TestRedux from "../Pages/test";
import Checkout from "../Pages/checkout";
import SearchOrders from "../Pages/searchOrders";

const RoutePublic = [
  {
    path: "/",
      element: <LayoutClient />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "product/:slug",
        element: <ProductDetail />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "payment",
        element: <InformationCustomer />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "orders",
        element: <SearchOrders />,
      },
    ],
    
  },
  {
    path: "test",
    element: <TestRedux />,
  },
];
export default RoutePublic;