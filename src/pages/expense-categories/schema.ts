import { HeadCell, IExpenseCategory } from "@/interfaces";
import { ToolbarAction } from "./function";

export interface Data extends IExpenseCategory {}

export function createData(
  _id: string,
  name: string,
  is_active?: boolean
): Data {
  return {
    _id,
    name,
    is_active,
  }
}

export const headCells: HeadCell<Data>[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Product',
    type: 'string'
  },
  {
    id: '_id',
    numeric: false,
    disablePadding: true,
    label: '',
    type: 'custom',
    body: ToolbarAction
  },
]