import axios from "axios";
import { useState, useEffect } from "react";
import { IProduct } from "../../../ecommerce-api/src/models/IProduct";

export const Products = () => {
  const [productList, setProductList] = useState<IProduct[]>([]);

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
              className="size-120 overflow-hidden hover:font-semibold cursor-pointer"
              key={product.id}
            >
              <img
                className="object-cover h-8/9 w-full"
                src={product.image}
                alt={product.name}
              />
              <div className="flex justify-between">
                <h3 className="w-1/2 truncate"> {product.name} </h3>
                <p>{product.price} sek</p>
              </div>
              <p className="w-full truncate ">{product.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};
