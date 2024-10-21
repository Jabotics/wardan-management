import { HeadCell } from '@/interfaces'
import { IBuyer } from '@/interfaces/data/traders'
import { Address, ToReceive, GSTNumber, ToolbarAction } from './function'

export interface Data extends IBuyer {}

export function createData(
  _id: string,
  name: string,
  address: string,
  gst_number: string,
  phone: string,
  outstanding_amount?: number
): Data {
  return { _id, name, address, gst_number, phone, outstanding_amount }
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
    id: 'outstanding_amount',
    numeric: true,
    disablePadding: false,
    label: 'To Receive',
    type: 'custom',
    body: ToReceive,
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
