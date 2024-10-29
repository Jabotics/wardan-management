import { HeadCell, IOtherStock } from "@/interfaces";
import { Material, Quantity, SaveOrCancel } from "./function";

export interface Data extends IOtherStock {}

export function createData(
  _id: string,
  category: 'RAW_MATERIAL' | 'PACKAGING_PRODUCT' | 'OTHER',
  material: {
    _id: string,
    name: string
  },
  qty: number,
  unit: string
): Data {
  return {
    _id,
    category,
    material,
    qty,
    unit
  }
}

export const headCells: HeadCell<Data>[] = [
  {
    id: 'material',
    numeric: false,
    disablePadding: true,
    label: 'Product',
    type: 'custom',
    body: Material
  },
  {
    id: 'qty',
    numeric: false,
    disablePadding: true,
    label: 'Quantity',
    type: 'custom',
    body: Quantity
  },
  {
    id: '_id',
    numeric: false,
    disablePadding: true,
    label: '',
    type: 'custom',
    body: SaveOrCancel
  },
]