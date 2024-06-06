import { HeadCell, ICategory } from "@/interfaces";
import { IsCategoryPublish } from "./function";

export function createCategoryData(
  id: number,
  name: string,
  is_active: boolean,
): ICategory {
  return { id, name, is_active }
}

export const categoryHeadCells: HeadCell<ICategory>[] = [
  // { id: 'name', numeric: false, disablePadding: true, label: 'Product' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name', type: 'string' },
  { id: 'is_active', numeric: false, disablePadding: false, label: 'Publish', type: 'custom', body: IsCategoryPublish },
  // { id: 'total_stock', numeric: true, disablePadding: false, label: 'Total Stock' },
]