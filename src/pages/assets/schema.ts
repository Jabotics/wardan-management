import { HeadCell, IAsset } from "@/interfaces";
import { ItemName, Amount, Invoice, ToolbarAction, Seller } from "./function";

export interface Data extends IAsset {}

export function createData(
  _id: string,
  amount: number,
  invoice_no: string,
  item_name: string,
  seller: {
    _id: string
    name: string
  }
): Data {
  return {
    _id,
    amount,
    invoice_no,
    item_name,
    seller,
  }
}

export const headCells: HeadCell<Data>[] = [
  {
    id: 'item_name',
    numeric: false,
    disablePadding: true,
    label: 'Item Name',
    type: 'custom',
    body: ItemName
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
    id: 'invoice_no',
    numeric: false,
    disablePadding: true,
    label: 'Invoice No',
    type: 'custom',
    body: Invoice
  },
  {
    id: 'seller',
    numeric: false,
    disablePadding: true,
    label: 'Import From',
    type: 'custom',
    body: Seller
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