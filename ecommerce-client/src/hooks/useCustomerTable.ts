import { useState } from "react";
import { ICustomer } from "../../../ecommerce-api/src/models/ICustomer";
import {
  createCustomer,
  deleteCustomer,
  fetchList,
  fetchCustomer,
  updateCustomer,
} from "../services/customerTableService";
import { ICreateCustomer, IUpdateCustomer } from "../module/ITable";

export const useCustomerTable = () => {
  const [list, setList] = useState<ICustomer[]>([]);
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

  const fetchCustomerByIdHandler = async (id: string) => {
    setIsLoading(true);

    try {
      return await fetchCustomer(id);
    } catch (error) {
      setError("Error fetching customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // CREATE
  const createCustomerHandler = async (payload: ICreateCustomer) => {
    setIsLoading(true);

    try {
      return await createCustomer(payload);
    } catch (error) {
      setError("Error creating customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // UPDATE
  const updateCustomerHandler = async (
    id: string,
    payload: IUpdateCustomer
  ) => {
    setIsLoading(true);

    try {
      return await updateCustomer(id, payload);
    } catch (error) {
      setError("Error update product");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE
  const deleteCustomerHandler = async (id: string) => {
    setIsLoading(true);

    try {
      await deleteCustomer(id);
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
    fetchCustomerByIdHandler,
    createCustomerHandler,
    updateCustomerHandler,
    deleteCustomerHandler,
  };
};
