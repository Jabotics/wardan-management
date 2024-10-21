import { HeadCell, IPayment } from "@/interfaces";
import { Amount, Seller, CreatedAt, Remarks, ToolbarAction } from "./function";

export interface Data extends IPayment {}

export function createData(
  _id: string,
  seller: {
    _id: string,
    name: string
  },
  amount: number,
  remarks: string,
  createdAt: string,
): Data {
  return {
    _id,
    seller,
    amount,
    remarks,
    createdAt
  }
}

export const headCells: HeadCell<Data>[] = [
  {
    id: 'seller',
    numeric: false,
    disablePadding: true,
    label: 'Import From',
    type: 'custom',
    body: Seller
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