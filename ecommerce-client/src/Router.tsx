import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { Admin } from "./pages/Admin";
import { AdminLayout } from "./pages/AdminLayout";
import { AdminOrders } from "./pages/AdminOrders";
import { AdminProducts } from "./pages/AdminProducts";
import { AdminCustomers } from "./pages/AdminCustomers";
import { AdminUpdateProduct } from "./pages/AdminUpdateProduct";
import { AdminCreateProduct } from "./pages/AdminCreateProduct";
import { AdminUpdateCustomer } from "./pages/AdminUpdateCustomer";
import { AdminCreateCustomer } from "./pages/AdminCreateCustomer";
import { Cart } from "./pages/Cart";
import { Confirmation } from "./pages/Confirmation";
import { Payment } from "./pages/Payment";
import { CustomerForm } from "./pages/CustomerForm";
import { AdminOrderDetail } from "./pages/AdminOrderDetail";

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
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/customerform",
        element: <CustomerForm />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/confirmation",
        element: <Confirmation />,
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
      {
        path: "update-product/:id",
        element: <AdminUpdateProduct />,
      },
      {
        path: "create-product",
        element: <AdminCreateProduct />,
      },
      {
        path: "update-customer/:id",
        element: <AdminUpdateCustomer />,
      },
      {
        path: "create-customer",
        element: <AdminCreateCustomer />,
      },
      {
        path: "orders/:id",
        element: <AdminOrderDetail />,
      },
    ],
  },
]);
