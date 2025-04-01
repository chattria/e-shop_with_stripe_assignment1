import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa6";
import { ICreateCustomer } from "../module/ITable";
import { AddButton } from "../components/AddButton";
import { useCustomerTable } from "../hooks/useCustomerTable";

export const AdminCreateCustomer = () => {
  const [customer, setCustomer] = useState<ICreateCustomer>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    street_address: "",
    postal_code: "",
    city: "",
    country: "",
  });
  const navigate = useNavigate();
  const { error, isLoading, createCustomerHandler } = useCustomerTable();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await createCustomerHandler(customer);
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
          value={customer.firstname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastname"
          placeholder="Lastname"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={customer.lastname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={customer.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          placeholder="Password"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={customer.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={customer.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="street_address"
          placeholder="Address"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={customer.street_address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="postal_code"
          placeholder="Postal Code"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={customer.postal_code}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={customer.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={customer.country}
          onChange={handleChange}
        />

        <AddButton />

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
