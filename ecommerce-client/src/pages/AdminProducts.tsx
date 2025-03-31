import { useProductTable } from "../hooks/useProductTable";
import { useEffect } from "react";
import { Link } from "react-router";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IProduct } from "../../../ecommerce-api/src/models/IProduct";
import AdminTable from "../components/AdminTable";
import { TableColumn, TableAction } from "../module/ITable";

export const AdminProducts = () => {
  const { list, error, isLoading, fetchListHandler, deleteProductHandler } =
    useProductTable();

  useEffect(() => {
    fetchListHandler();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const columns: TableColumn<IProduct>[] = [
    { label: "Title", accessor: "name" },
    { label: "Price", accessor: "price" },
    { label: "Stock", accessor: "stock" },
    { label: "Category", accessor: "category" },
    { label: "Date", accessor: "created_at" },
  ];

  const actions: TableAction<IProduct & { id: number }>[] = [
    {
      getLabel: (product) => (
        <Link to={`/admin/update-product/${product.id}`}>
          <FaEdit size={16} />
        </Link>
      ),
      onClick: () => {},
      className: "hover:text-blue-600 cursor-pointer",
    },
    {
      label: <FaTrashAlt size={16} />,
      onClick: (p) => {
        deleteProductHandler(p.id.toString());
      },
      className: "hover:text-red-600 cursor-pointer",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-end mb-10">
        <h1 className="text-4xl">Manage Products</h1>
        <Link className="cursor-pointer" to="/admin/create-product">
          Create New Product
        </Link>
      </div>

      <AdminTable
        data={list.filter((p): p is IProduct & { id: number } => p.id !== null)}
        columns={columns}
        actions={actions}
      />
    </>
  );
};
