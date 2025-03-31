import { ReactNode } from "react";
import { IProduct } from "../../../ecommerce-api/src/models/IProduct";

export type TableColumn<T> = {
  label: string;
  accessor: keyof T;
};

export type TableAction<T> = {
  label?: ReactNode;
  getLabel?: (row: T) => ReactNode;
  onClick: (row: T) => void;
  className?: string;
};

export type ICreateProduct = Pick<
  IProduct,
  "name description price stock category image"
>;

export type IUpdateProduct = Pick<
  IProduct,
  "name description price stock category image"
>;

export interface ITableProps<T extends { id: number | string }> {
  columns: TableColumn<T>[];
  data: T[];
  actions?: TableAction<T>[];
}
