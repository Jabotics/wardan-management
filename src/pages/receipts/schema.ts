import { HeadCell, IReceipt } from "@/interfaces";
import { Amount, Buyer, CreatedAt, Remarks, ToolbarAction } from "./function";

export interface Data extends IReceipt {}

export function createData(
  _id: string,
  buyer: {
    _id: string,
    name: string
  },
  amount: number,
  remarks: string,
  createdAt: string,
): Data {
  return {
    _id,
    buyer,
    amount,
    remarks,
    createdAt
  }
}

export const headCells: HeadCell<Data>[] = [
  {
    id: 'buyer',
    numeric: false,
    disablePadding: true,
    label: 'Export To',
    type: 'custom',
    body: Buyer
  },
  {
    id: 'remarks',
    numeric: false,
    disablePadding: true,
    label: 'Remarks',
    type: 'custom',
    body: Remarks
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
    id: 'createdAt',
    numeric: false,
    disablePadding: true,
    label: 'Created On',
    type: 'custom',
    body: CreatedAt
  },
  {
    id: '_id',
    numeric: false,
    disablePadding: true,
    label: '',
    type: 'custom',
    body: ToolbarAction
  }
]