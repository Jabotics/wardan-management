import { CreateAt, IsPublish, Price, ProductName, Stock } from "./function"
import { HeadCell } from "@/interface"

export interface Data {
  id: number
  name: string
  category: string
  create_at: string
  total_stock: number
  image: string
  stock: number
  price: string
  publish: boolean
}

export function createData(
  id: number,
  name: string,
  category: string,
  create_at: string,
  total_stock: number,
  image: string,
  stock: number,
  price: string,
  publish: boolean
): Data {
  return { id, name, category, create_at, total_stock, image, stock, price, publish }
}

export const headCells: HeadCell<Data>[] = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Product', type: 'custom', body: ProductName },
  { id: 'create_at', numeric: true, disablePadding: false, label: 'Create at', type: 'custom', body: CreateAt },
  // { id: 'total_stock', numeric: true, disablePadding: false, label: 'Total Stock' },
  { id: 'stock', numeric: true, disablePadding: false, label: 'Stock', type: 'custom', body: Stock },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price', type: 'custom', body: Price },
  { id: 'publish', numeric: false, disablePadding: false, label: 'Publish', type: 'custom', body: IsPublish },
]
