import { useState } from "react";
import { useNavigate } from "react-router";

export const CustomerForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    street_address: "",
    postal_code: "",
    city: "",
    country: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const allFieldsFilled = Object.values(formData).every(
      (val) => val.trim() !== ""
    );
    if (!allFieldsFilled) {
      setError("Please fill in all fields.");
      return;
    }

    // Save to localStorage
    localStorage.setItem("customer", JSON.stringify(formData));
    navigate("/payment");
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded-2xl shadow-md ">
      <h1 className="text-2xl font-bold mb-6">Customer Information</h1>

      {error && (
        <div className="mb-4 p-2 text-red-600 bg-red-100 border border-red-300 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            className="w-1/2 border p-2 rounded"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            className="w-1/2 border p-2 rounded"
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="street_address"
          placeholder="Street Address"
          value={formData.street_address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-4">
          <input
            type="text"
            name="postal_code"
            placeholder="Postal Code"
            value={formData.postal_code}
            onChange={handleChange}
            className="w-1/3 border p-2 rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-1/3 border p-2 rounded"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-1/3 border p-2 rounded"
          />
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="w-16 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Pay
          </button>
        </div>
      </form>
    </div>
  );
};
