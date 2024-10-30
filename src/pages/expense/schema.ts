import { HeadCell, IExpense } from "@/interfaces";
import { ToolbarAction, Category, Amount, Month } from "./function";

export interface Data extends IExpense {}

export function createData(
  _id: string,
  category: {
    _id: string
    name: string
  },
  remarks: string,
  month: string,
  year: number,
  amount: number
): Data {
  return {
    _id,
    category,
    remarks,
    month,
    year,
    amount,
  }
}

export const headCells: HeadCell<Data>[] = [
  {
    id: 'category',
    numeric: false,
    disablePadding: true,
    label: 'Category',
    type: 'custom',
    body: Category
  },
  {
    id: 'amount',
    numeric: false,
    disablePadding: true,
    label: 'Amount',
    type: 'custom',
    body: Amount
  },
  {
    id: 'month',
    numeric: false,
    disablePadding: true,
    label: 'Month',
    type: 'custom',
    body: Month

  },
  {
    id: 'remarks',
    numeric: false,
    disablePadding: true,
    label: 'Remarks',
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