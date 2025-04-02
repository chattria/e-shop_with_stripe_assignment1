import { NavLink } from "react-router";
import { FaRegClock, FaCartShopping } from "react-icons/fa6";

export const Navbar = () => {
  return (
    <div className="flex justify-between h-full items-center">
      <div className="logo text-lg">
        <NavLink to={"/"}>
          <FaRegClock size={20} />
        </NavLink>
      </div>

      <div className="w-82 font-semibold flex justify-between">
        <NavLink to={"/"}>HOME</NavLink>
        <NavLink to={"/products"}>PRODUCTS</NavLink>
        <NavLink to={"/admin"}>ADMIN</NavLink>
      </div>

      <div className="cart text-lg">
        <NavLink to="/cart">
          <FaCartShopping size={20} />
        </NavLink>
      </div>
    </div>
  );
};
