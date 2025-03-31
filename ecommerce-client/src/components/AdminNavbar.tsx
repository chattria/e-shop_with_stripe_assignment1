import { NavLink } from "react-router";
import { FaRegClock, FaCartShopping } from "react-icons/fa6";

export const AdminNavbar = () => {
  return (
    <div className="flex justify-between">
      <div className="logo text-lg">
        <NavLink to={"/admin"}>
          <FaRegClock />
        </NavLink>
      </div>

      <div className="w-120 font-semibold flex justify-between">
        <NavLink to={"/admin/orders"}>ORDERS</NavLink>
        <NavLink to={"/admin/products"}>PRODUCTS</NavLink>
        <NavLink to={"/admin/customers"}>CUSTOMERS</NavLink>
        <NavLink to={"/"}>E-SHOP</NavLink>
      </div>

      <div className="cart text-lg">
        <FaCartShopping />
      </div>
    </div>
  );
};
