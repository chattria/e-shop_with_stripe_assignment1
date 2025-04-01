import { Link } from "react-router";
import AdminTable from "../components/AdminTable";
import { ICustomer } from "../../../ecommerce-api/src/models/ICustomer";
import { useCustomerTable } from "../hooks/useCustomerTable";
import { useEffect } from "react";
import { TableAction, TableColumn } from "../module/ITable";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export const AdminCustomers = () => {
  const { list, error, isLoading, fetchListHandler, deleteCustomerHandler } =
    useCustomerTable();

  useEffect(() => {
    fetchListHandler();
  }, []);

  const columns: TableColumn<ICustomer>[] = [
    {
      label: "Name",
      render: (customer) => `${customer.firstname} ${customer.lastname}`,
    },
    { label: "Email", accessor: "email" },
    { label: "Phone", accessor: "phone" },
    { label: "Address", accessor: "street_address" },
    { label: "Postal Code", accessor: "postal_code" },
    { label: "City", accessor: "city" },
    { label: "Country", accessor: "country" },
    { label: "Date", accessor: "created_at" },
  ];

  const actions: TableAction<ICustomer & { id: number }>[] = [
    {
      getLabel: (customer) => (
        <Link to={`/admin/update-customer/${customer.id}`}>
          <FaEdit size={16} />
        </Link>
      ),
      onClick: () => {},
      className: "hover:text-blue-600 cursor-pointer",
    },
    {
      label: <FaTrashAlt size={16} />,
      onClick: (c) => {
        deleteCustomerHandler(c.id.toString());
      },
      className: "hover:text-red-600 cursor-pointer",
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="flex justify-between items-end mb-10">
        <h1 className="text-4xl">Manage Customer</h1>
        <Link className="cursor-pointer" to="/admin/create-customer">
          Create New Customer
        </Link>
      </div>

      <AdminTable
        data={list.filter(
          (p): p is ICustomer & { id: number } => p.id !== null
        )}
        columns={columns}
        actions={actions}
      />
    </>
  );
};
