import { Link } from "react-router";
import AdminTable from "../components/AdminTable";
import { IOrder } from "../../../ecommerce-api/src/models/IOrder";
import { useOrderTable } from "../hooks/useOrderTable";
import { useEffect } from "react";
import { TableAction, TableColumn } from "../module/ITable";
import { FaEye, FaTrashAlt } from "react-icons/fa";

export const AdminOrders = () => {
  const { list, error, isLoading, fetchListHandler, deleteOrderHandler } =
    useOrderTable();

  useEffect(() => {
    fetchListHandler();
  }, []);

  const columns: TableColumn<IOrder>[] = [
    { label: "Order ID", accessor: "id" },
    {
      label: "Customer",
      render: (order) =>
        `${order.customer_firstname} ${order.customer_lastname}`,
    },
    { label: "Email", accessor: "customer_email" },
    { label: "Phone", accessor: "customer_phone" },
    { label: "Total", accessor: "total_price" },
    { label: "Payment Status", accessor: "payment_status" },
    { label: "Order Status", accessor: "order_status" },
    { label: "Date", accessor: "created_at" },
  ];

  const actions: TableAction<IOrder & { id: number }>[] = [
    {
      getLabel: (order) => (
        <Link
          to={`/admin/orders/${order.id}`}
          className="flex items-center gap-1"
        >
          <FaEye size={16} />
          <span>View</span>
        </Link>
      ),
      onClick: () => {},
      className: "hover:text-blue-600 cursor-pointer",
    },
    {
      label: <FaTrashAlt size={16} />,
      onClick: (o) => {
        deleteOrderHandler(o.id.toString());
      },
      className: "hover:text-red-600 cursor-pointer",
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="flex justify-between items-end mb-10">
        <h1 className="text-4xl">Manage Order</h1>
      </div>

      <AdminTable
        data={list.filter((o): o is IOrder & { id: number } => o.id !== null)}
        columns={columns}
        actions={actions}
      />
    </>
  );
};
