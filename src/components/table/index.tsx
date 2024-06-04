import * as React from 'react'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'

import FormControlLabel from '@mui/material/FormControlLabel'
import Stack from '@mui/material/Stack'
import { Button } from '../custom/button'

import { EnhancedTableHead } from './table-head'
import { EnhancedTableToolbar } from './table-toolbar'
import { getComparator, stableSort } from './table-utils'
import { AntSwitch } from './style'
import { EnhancedTableProps, Order } from '@/interface'

import AddIcon from '@mui/icons-material/Add';

export default function EnhancedTable<
  T extends { [key: string]: string | number },
>({ data, headCells, title, dense: defaultDense }: EnhancedTableProps<T>) {
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof T>(headCells[0].id)
  const [selected, setSelected] = React.useState<readonly number[]>([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n, index) => index)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, index: number) => {
    const selectedIndex = selected.indexOf(index)
    let newSelected: readonly number[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked)
  }

  const isSelected = (index: number) => selected.indexOf(index) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

  const visibleRows = React.useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, data]
  )

  console.log(headCells)
  return (
    <>
      <div className='mb-8 flex items-center justify-between'>
        <div className='text-2xl font-medium'>{title}</div>
        <Button variant={'outline'}><AddIcon /> New {title}</Button>
      </div>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer className='mt-5'>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby='tableTitle'
              size={defaultDense ? 'small' : dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
                headCells={headCells}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(index)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, index)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                      key={index}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          color='primary'
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      {headCells.map((cell) => (
                        <TableCell
                          key={cell.id as string}
                          align={cell.numeric ? 'right' : 'left'}
                          padding={cell.disablePadding ? 'none' : 'normal'}
                        >
                          {row[cell.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  )
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={headCells.length + 1} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div
            className={`flex items-center ${defaultDense ? 'justify-end' : 'justify-between'} px-8`}
          >
            {!defaultDense && (
              <FormControlLabel
                control={
                  <Stack direction='row' alignItems='center' mr={1}>
                    <AntSwitch
                      checked={dense}
                      inputProps={{ 'aria-label': 'ant design' }}
                      onChange={handleChangeDense}
                    />
                  </Stack>
                }
                label='Dense'
              />
            )}
            <TablePagination
              rowsPerPageOptions={[10, 25]}
              component='div'
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </Paper>
      </Box>
    </>
  )
}
