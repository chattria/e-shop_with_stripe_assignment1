import { useState } from "react";
import { IOrder } from "../../../ecommerce-api/src/models/IOrder";
import {
  deleteOrder,
  fetchList,
  fetchOrder,
} from "../services/orderTableService";

export const useOrderTable = () => {
  const [list, setList] = useState<IOrder[]>([]);
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

  const fetchOrderByIdHandler = async (id: string) => {
    setIsLoading(true);

    try {
      return await fetchOrder(id);
    } catch (error) {
      setError("Error fetching order");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE
  const deleteOrderHandler = async (id: string) => {
    setIsLoading(true);

    try {
      await deleteOrder(id);
      setList((prevList) => prevList.filter((o) => o.id !== Number(id)));
    } catch (error) {
      setError("Error deleting order");
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
    fetchOrderByIdHandler,
    deleteOrderHandler,
  };
};
