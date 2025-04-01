import axios from "axios";
import { IOrder } from "../../../ecommerce-api/src/models/IOrder";
import { API_URL, handleRequest } from "./baseService";

export const fetchList = async (): Promise<IOrder[]> => {
  return await handleRequest<IOrder[]>(axios.get(`${API_URL}/orders`));
};

export const fetchOrder = async (id: string): Promise<IOrder> => {
  return await handleRequest<IOrder>(axios.get(`${API_URL}/orders/${id}`));
};

export const deleteOrder = async (id: string): Promise<void> => {
  return await handleRequest<void>(axios.delete(`${API_URL}/orders/${id}`));
};
