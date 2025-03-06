import React from "react";
import { useRoutes } from "react-router-dom";
import NotFound from "../Client/Pages/notFound";
import RoutePublic from "../Client/configRoute";
import RoutePrivate from "../admin/configRoute";
const RootRoutes = () => {
  const routeConfig = [
    // public route
    ...RoutePublic,
    // protected route
    ...RoutePrivate,
    // 404 Not Found
    {
      path: "*",
      element: <NotFound />,
    },
  ];
  return useRoutes(routeConfig);
};

export default RootRoutes;
