import axios from "axios";
import { IProduct } from "../../../ecommerce-api/src/models/IProduct";
import { ICreateProduct, IUpdateProduct } from "../module/ITable";
import { API_URL, handleRequest } from "./baseService";

export const fetchList = async (): Promise<IProduct[]> => {
  return await handleRequest<IProduct[]>(axios.get(`${API_URL}/products`));
};

export const fetchProduct = async (id: string): Promise<IProduct> => {
  return await handleRequest<IProduct>(axios.get(`${API_URL}/products/${id}`));
};

export const createProduct = async (
  payload: ICreateProduct
): Promise<IProduct> => {
  return await handleRequest<IProduct>(
    axios.post(`${API_URL}/products`, payload)
  );
};

export const updateProduct = async (
  id: string,
  payload: IUpdateProduct
): Promise<IProduct> => {
  return await handleRequest<IProduct>(
    axios.patch(`${API_URL}/products/${id}`, payload)
  );
};

export const deleteProduct = async (id: string): Promise<void> => {
  return await handleRequest<void>(axios.delete(`${API_URL}/products/${id}`));
};
