import { FormEvent, useEffect, useState } from "react";
import { IProduct } from "../../../ecommerce-api/src/models/IProduct";
import { Link, useNavigate, useParams } from "react-router";
import { useProductTable } from "../hooks/useProductTable";
import { FaArrowLeft } from "react-icons/fa6";
import { UpdateButton } from "../components/UpdateButton";

export const AdminUpdateProduct = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const navigate = useNavigate();
  const params = useParams();
  const { isLoading, error, fetchProductByIdHandler, updateListHandler } =
    useProductTable();

  useEffect(() => {
    if (!params.id) return;
    fetchProductByIdHandler(params.id).then((data) => setProduct(data));
  }, []);

  const handleChange = (e: FormEvent<HTMLTextAreaElement>) => {
    if (!product) return;
    setProduct({ ...product, content: e.currentTarget.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product?.id) return;
    await updateListHandler(product.id.toString(), {
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
      category: product.category,
      image: product.image,
    });
    navigate("/admin/products");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-4xl mb-10">Update Product</h2>

      <form
        className="flex flex-col gap-y-4 p-6 rounded-2xl shadow-md max-w-4xl mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="product-name"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={product?.name ?? ""}
          onChange={(e) =>
            setProduct((prev) => prev && { ...prev, name: e.target.value })
          }
        />
        <input
          type="number"
          name="price"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={product?.price ?? ""}
          onChange={(e) =>
            setProduct(
              (prev) => prev && { ...prev, price: Number(e.target.value) }
            )
          }
        />
        <input
          type="number"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={product?.stock ?? ""}
          onChange={(e) =>
            setProduct(
              (prev) => prev && { ...prev, stock: Number(e.target.value) }
            )
          }
        />
        <textarea
          name="description"
          cols={30}
          rows={10}
          className="p-3 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={product?.description ?? ""}
          onChange={(e) =>
            setProduct(
              (prev) => prev && { ...prev, description: e.target.value }
            )
          }
        />
        <select
          name="category"
          className="p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={product?.category ?? ""}
          onChange={(e) =>
            setProduct((prev) => prev && { ...prev, category: e.target.value })
          }
        >
          <option value="">Select Category</option>
          <option value="Analog">Analog</option>
          <option value="Digital">Digital</option>
        </select>
        <input
          type="text"
          name="image"
          placeholder="image"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={product?.image ?? ""}
          onChange={(e) =>
            setProduct((prev) => prev && { ...prev, image: e.target.value })
          }
        />

        <UpdateButton />

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
