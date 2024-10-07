/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react"

export type Order = 'asc' | 'desc'

export interface HeadCell<T> {
  disablePadding: boolean
  id: keyof T
  label: string
  numeric: boolean
  type: 'string' | 'custom';
  body?: ({ data }: { data: T; }) => React.JSX.Element;
}

export interface EnhancedTableProps<T extends { [key: string]: any }> {
  data: T[]
  headCells: HeadCell<T>[]
  title: string
  dense?: boolean
  rowHeight?: number
  ExpandedBody?: ({ data }: { data: T; }) => React.JSX.Element;
  config?: {
    ModifyComponent: ({ data, setClose }: { data?: T; setClose: React.Dispatch<React.SetStateAction<boolean>> }) => JSX.Element;
  }
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
  setDelete: React.Dispatch<React.SetStateAction<boolean>>
}

export interface TablePaginationConfig {
  sortBy?: string
  sortOrder?: 'desc' | 'asc'
  limit?: number
  offset?: number
}