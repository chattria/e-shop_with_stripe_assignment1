import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { Admin } from "./pages/Admin";
import { AdminLayout } from "./pages/AdminLayout";
import { AdminOrders } from "./pages/AdminOrders";
import { AdminProducts } from "./pages/AdminProducts";
import { AdminCustomers } from "./pages/AdminCustomers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Admin />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
      {
        path: "products",
        element: <AdminProducts />,
      },
      {
        path: "customers",
        element: <AdminCustomers />,
      },
    ],
  },
]);
