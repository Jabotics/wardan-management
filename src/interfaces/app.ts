/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'
// import { IPurchase } from './data/purchase'
// import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

export type Order = 'asc' | 'desc'

export interface HeadCell<T> {
  disablePadding: boolean
  id: keyof T
  label: string
  numeric: boolean
  type: 'string' | 'custom'
  body?: ({ data }: { data: T }) => React.JSX.Element
}

export interface EnhancedTableProps<T extends { [key: string]: any }> {
  data: T[]
  headCells: HeadCell<T>[]
  title: string
  dense?: boolean
  rowHeight?: number
  ExpandedBody?: ({ data }: { data: T }) => React.JSX.Element
  config?: {
    ModifyComponent: ({
      data,
      setClose,
    }: {
      data?: T
      setClose: React.Dispatch<React.SetStateAction<boolean>>
    }) => JSX.Element
    toModify: any
  }
  dataFilters?: TableDataFilters
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

export interface EnhancedTableBodyProps<T> {
  row: T
  handleClick: (event: React.MouseEvent<unknown>, index: number) => void
  handleExpandClick: (index: number) => void
  headCells: Array<{ id: keyof T; body?: React.FC<{ data: T }> }>
  ExpandedBody?: React.FC<{ data: T }>
  rowHeight?: number
  ModifyComponent?:
    | (({
        data,
        setClose,
      }: {
        data?: T | undefined
        setClose: React.Dispatch<React.SetStateAction<boolean>>
      }) => JSX.Element)
    | undefined
  isItemSelected?: boolean
  isExpanded?: boolean
  labelId: string
  open: boolean
  handleActionClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleActionClose: () => void
  setOpenDialog?: React.Dispatch<React.SetStateAction<boolean>>
  anchorActionEl: HTMLElement | null
  toModify: any
}

export interface EnhancedTableToolbarProps {
  numSelected: number
  setDelete: React.Dispatch<React.SetStateAction<boolean>>
  dataFilters?: TableDataFilters
}

export interface TablePaginationConfig {
  sortBy?: string
  sortOrder?: 'desc' | 'asc'
  limit?: number
  offset?: number
}

export interface TableDataFilters {
  searchBy?: {
    placeholderText: string
    actions: [string, React.Dispatch<React.SetStateAction<string>>]
  }
  filters?: {
    label: string
    type: 'array' | 'object'
    options: { [x: string | number]: string }[]
    value: string[]
  }[]
  handleFilterChange?: (label: string, value: string[]) => void
}
