import { FormEvent, useEffect, useState } from "react";
import { ICustomer } from "../../../ecommerce-api/src/models/ICustomer";
import { Link, useNavigate, useParams } from "react-router";
import { useCustomerTable } from "../hooks/useCustomerTable";
import { FaArrowLeft } from "react-icons/fa6";
import { UpdateButton } from "../components/UpdateButton";

export const AdminUpdateCustomer = () => {
  const [customer, setCustomer] = useState<ICustomer | null>(null);
  const navigate = useNavigate();
  const params = useParams();
  const { error, isLoading, fetchCustomerByIdHandler, updateCustomerHandler } =
    useCustomerTable();

  useEffect(() => {
    if (!params.id) return;
    fetchCustomerByIdHandler(params.id).then((data) => setCustomer(data));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!customer?.id) return;
    await updateCustomerHandler(customer.id.toString(), {
      firstname: customer?.firstname,
      lastname: customer?.lastname,
      email: customer?.email,
      password: customer?.password,
      phone: customer?.phone,
      street_address: customer?.street_address,
      postal_code: customer?.postal_code,
      city: customer?.city,
      country: customer?.country,
    });
    navigate("/admin/customers");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-4xl mb-10">Create New Customer</h2>

      <form
        className="flex flex-col gap-y-4 p-6 rounded-2xl shadow-md max-w-4xl mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="firstname"
          placeholder="Firstname"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={customer?.firstname ?? ""}
          onChange={(e) =>
            setCustomer(
              (prev) => prev && { ...prev, firstname: e.target.value }
            )
          }
        />
        <input
          type="text"
          name="lastname"
          placeholder="Lastname"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={customer?.lastname ?? ""}
          onChange={(e) =>
            setCustomer((prev) => prev && { ...prev, lastname: e.target.value })
          }
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={customer?.email ?? ""}
          onChange={(e) =>
            setCustomer((prev) => prev && { ...prev, email: e.target.value })
          }
        />
        <input
          type="text"
          name="password"
          placeholder="Password"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={customer?.password ?? ""}
          onChange={(e) =>
            setCustomer((prev) => prev && { ...prev, password: e.target.value })
          }
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={customer?.phone ?? ""}
          onChange={(e) =>
            setCustomer((prev) => prev && { ...prev, phone: e.target.value })
          }
        />
        <input
          type="text"
          name="street_address"
          placeholder="Address"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={customer?.street_address ?? ""}
          onChange={(e) =>
            setCustomer(
              (prev) => prev && { ...prev, street_address: e.target.value }
            )
          }
        />
        <input
          type="text"
          name="postal_code"
          placeholder="Postal Code"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={customer?.postal_code ?? ""}
          onChange={(e) =>
            setCustomer(
              (prev) => prev && { ...prev, postal_code: e.target.value }
            )
          }
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={customer?.city ?? ""}
          onChange={(e) =>
            setCustomer((prev) => prev && { ...prev, city: e.target.value })
          }
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={customer?.country ?? ""}
          onChange={(e) =>
            setCustomer((prev) => prev && { ...prev, country: e.target.value })
          }
        />

        <UpdateButton />

        <Link
          to="/admin/customers"
          className="text-sm text-blue-500 hover:underline self-start mt-2 flex items-center gap-2 font-semibold"
        >
          <FaArrowLeft />
          back
        </Link>
      </form>
    </div>
  );
};
