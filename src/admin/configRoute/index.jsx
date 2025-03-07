import LayoutAdmin from "../layout";
import Dashboard from "../pages/dashboard";
import LaptopType from "../pages/laptopType";
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
        ],
      },
    ],
  },
];
export default RoutePrivate;