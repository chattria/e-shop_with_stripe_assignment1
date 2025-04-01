import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useProductTable } from "../hooks/useProductTable";
import { FaArrowLeft } from "react-icons/fa6";
import { ICreateProduct } from "../module/ITable";
import { AddButton } from "../components/AddButton";

export const AdminCreateProduct = () => {
  const [product, setProduct] = useState<ICreateProduct>({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    category: "",
    image: "",
  });
  const navigate = useNavigate();
  const { isLoading, error, createProductHandler } = useProductTable();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await createProductHandler(product);
    navigate("/admin/products");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-4xl mb-10">Create New Product</h2>

      <form
        className="flex flex-col gap-y-4 p-6 rounded-2xl shadow-md max-w-4xl mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={product.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={product.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={product.stock}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          cols={30}
          rows={10}
          className="p-3 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={product.description}
          onChange={handleChange}
        />
        <select
          name="category"
          className="p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={product.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="Analog">Analog</option>
          <option value="Digital">Digital</option>
        </select>
        <input
          type="text"
          name="image"
          placeholder="Add Image URL"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={product.image}
          onChange={handleChange}
        />

        <AddButton />

        <Link
          to="/admin/products"
          className="text-sm text-blue-500 hover:underline self-start mt-2 flex items-center gap-2 font-semibold"
        >
          <FaArrowLeft />
          back
        </Link>
      </form>
    </div>
  );
};
