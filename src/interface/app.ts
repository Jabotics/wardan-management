
export type Order = 'asc' | 'desc'

export interface HeadCell<T> {
  disablePadding: boolean
  id: keyof T
  label: string
  numeric: boolean
}

export interface EnhancedTableProps<T extends { [key: string]: string | number }> {
  data: T[]
  headCells: HeadCell<T>[]
  title: string
  dense?: boolean
}

export interface EnhancedTableHeadProps<T> {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: keyof T
  rowCount: number
  headCells: HeadCell<T>[]
}

export interface EnhancedTableToolbarProps {
  numSelected: number
}