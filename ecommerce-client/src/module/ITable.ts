import { ReactNode } from "react";
import { IProduct } from "../../../ecommerce-api/src/models/IProduct";
import { ICustomer } from "../../../ecommerce-api/src/models/ICustomer";

export type TableColumn<T> = {
  label: string;
  accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
};

export type TableAction<T> = {
  label?: ReactNode;
  getLabel?: (row: T) => ReactNode;
  onClick: (row: T) => void;
  className?: string;
};

// Admin Product
export type ICreateProduct = Pick<
  IProduct,
  "name" | "description" | "price" | "stock" | "category" | "image"
>;

export type IUpdateProduct = Pick<
  IProduct,
  "name" | "description" | "price" | "stock" | "category" | "image"
>;
// Admin Product END

export interface ITableProps<T extends { id: number | string }> {
  columns: TableColumn<T>[];
  data: T[];
  actions?: TableAction<T>[];
}

// Admin Customer
export type ICreateCustomer = Pick<
  ICustomer,
  | "firstname"
  | "lastname"
  | "email"
  | "password"
  | "phone"
  | "street_address"
  | "postal_code"
  | "city"
  | "country"
>;

export type IUpdateCustomer = Pick<
  ICustomer,
  | "firstname"
  | "lastname"
  | "email"
  | "password"
  | "phone"
  | "street_address"
  | "postal_code"
  | "city"
  | "country"
>;
// Admin Customer END
