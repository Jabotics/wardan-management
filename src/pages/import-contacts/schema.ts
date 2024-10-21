import { HeadCell } from '@/interfaces'
import { ISeller } from '@/interfaces'
import { Address, GSTNumber, ToolbarAction, ToPay } from './function'

export interface Data extends ISeller {}

export function createData(
  _id: string,
  name: string,
  address: string,
  gst_number: string,
  phone: string,
  payable_amount?: number
): Data {
  return { _id, name, address, gst_number, phone, payable_amount }
}

export const headCells: HeadCell<Data>[] = [
  {
    id: 'name',
    numeric: true,
    disablePadding: true,
    label: 'Name',
    type: 'string',
  },
  {
    id: 'payable_amount',
    numeric: true,
    disablePadding: false,
    label: 'To Pay',
    type: 'custom',
    body: ToPay,
  },
  {
    id: 'address',
    numeric: true,
    disablePadding: false,
    label: 'Address',
    type: 'custom',
    body: Address,
  },
  {
    id: 'gst_number',
    numeric: true,
    disablePadding: false,
    label: 'GST Number',
    type: 'custom',
    body: GSTNumber,
  },
  {
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'Phone',
    type: 'string',
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
