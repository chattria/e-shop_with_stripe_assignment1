import { useState } from "react";
import { IProduct } from "../../../ecommerce-api/src/models/IProduct";
import {
  createProduct,
  deleteProduct,
  fetchList,
  fetchProduct,
  updateProduct,
} from "../services/productTableService";
import { ICreateProduct, IUpdateProduct } from "../module/ITable";

export const useProductTable = () => {
  const [list, setList] = useState<IProduct[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchListHandler = async () => {
    setIsLoading(true);

    try {
      const data = await fetchList();
      setList(data);
    } catch (error) {
      setError("Error fetching product list");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductByIdHandler = async (id: string) => {
    setIsLoading(true);

    try {
      return await fetchProduct(id);
    } catch (error) {
      setError("Error fetching product");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // CREATE
  const createProductHandler = async (payload: ICreateProduct) => {
    setIsLoading(true);

    try {
      return await createProduct(payload);
    } catch (error) {
      setError("Error creating product");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // UPDATE
  const updateListHandler = async (id: string, payload: IUpdateProduct) => {
    setIsLoading(true);

    try {
      return await updateProduct(id, payload);
    } catch (error) {
      setError("Error update product");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE
  const deleteProductHandler = async (id: string) => {
    setIsLoading(true);

    try {
      await deleteProduct(id);
      setList((prevList) => prevList.filter((p) => p.id !== Number(id)));
    } catch (error) {
      setError("Error deleting pun");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    list,
    error,
    isLoading,
    fetchListHandler,
    fetchProductByIdHandler,
    createProductHandler,
    updateListHandler,
    deleteProductHandler,
  };
};
