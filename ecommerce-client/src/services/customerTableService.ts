import axios from "axios";
import { ICustomer } from "../../../ecommerce-api/src/models/ICustomer";
import { ICreateCustomer, IUpdateCustomer } from "../module/ITable";
import { API_URL, handleRequest } from "./baseService";

export const fetchList = async (): Promise<ICustomer[]> => {
  return await handleRequest<ICustomer[]>(axios.get(`${API_URL}/customers`));
};

export const fetchCustomer = async (id: string): Promise<ICustomer> => {
  return await handleRequest<ICustomer>(
    axios.get(`${API_URL}/customers/${id}`)
  );
};

export const createCustomer = async (
  payload: ICreateCustomer
): Promise<ICustomer> => {
  return await handleRequest<ICustomer>(
    axios.post(`${API_URL}/customers`, payload)
  );
};

export const updateCustomer = async (
  id: string,
  payload: IUpdateCustomer
): Promise<ICustomer> => {
  return await handleRequest<ICustomer>(
    axios.patch(`${API_URL}/customers/${id}`, payload)
  );
};

export const deleteCustomer = async (id: string): Promise<void> => {
  return await handleRequest<void>(axios.delete(`${API_URL}/customers/${id}`));
};
