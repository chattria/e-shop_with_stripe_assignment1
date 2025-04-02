import axios from "axios";
import { useState, useEffect } from "react";
import { IProduct } from "../../../ecommerce-api/src/models/IProduct";
import { useCart } from "../hooks/useCart";

export const Products = () => {
  const [productList, setProductList] = useState<IProduct[]>([]);
  const { handleAddToCart, cart } = useCart();

  useEffect(() => {
    axios.get<IProduct[]>("http://localhost:3000/products").then((response) => {
      setProductList(response.data);
    });
  }, []);
  return (
    <>
      <h1 className="my-20 text-5xl ">Wall Clock</h1>
      <div className="flex flex-wrap gap-10 justify-center">
        {productList.map((product) => {
          return (
            <div
              className="size-120 overflow-hidden font-semibold"
              key={product.id}
            >
              <img
                className="object-cover h-7/9 w-full"
                src={product.image}
                alt={product.name}
              />

              <div className="flex justify-between">
                <h3 className="w-1/2 truncate"> {product.name} </h3>
                <p>{product.price} sek</p>
              </div>
              <p className="w-full truncate ">{product.description}</p>
              <button
                className="mt-2 p-2 hover:bg-gray-300 bg-gray-100 rounded-lg transition font-semibold cursor-pointer"
                onClick={() => handleAddToCart(product, 1)}
              >
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
