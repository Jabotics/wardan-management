/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { EnhancedTableProps, Order } from '@/interfaces'

import AddIcon from '@mui/icons-material/Add'
import { FaCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { MdCheckCircleOutline } from 'react-icons/md'
import { MdCheckCircle } from 'react-icons/md'
import DeleteModal from '../shared/delete-modal'

import { Dialog, DialogTrigger } from '../ui/dialog'
import IconButton from '@mui/material/IconButton'
import { LuChevronDown, LuChevronUp } from 'react-icons/lu'

export default function EnhancedTable<T extends { [key: string]: any }>({
  data,
  headCells,
  title,
  dense: defaultDense,
  rowHeight,
  ExpandedBody,
  config,
  dataFilters,
}: EnhancedTableProps<T>) {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof T>(headCells[0].id)
  const [selected, setSelected] = React.useState<readonly number[]>([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const [expandedRows, setExpandedRows] = React.useState<number[]>([])

  const [toDelete, setToDelete] = React.useState<boolean>(false)

  const { ModifyComponent, ExportComponent } = config || {}
  const [openDialog, setOpenDialog] = React.useState<boolean>(false)

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((_n, index) => index)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (_event: React.MouseEvent<unknown>, index: number) => {
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

  const handleChangePage = (_event: unknown, newPage: number) => {
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

  const handleExpandClick = (index: number) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(index)
        ? prevExpandedRows.filter((row) => row !== index)
        : [...prevExpandedRows, index]
    );
  };

  return (
    <>
      <DeleteModal
        open={toDelete}
        handleClose={() => {
          setToDelete(false)
        }}
        handleDelete={() => {}}
        numSelected={selected.length}
      />
      <div className='mb-8 flex items-center justify-between'>
        <div className='text-xl font-medium tracking-tighter'>{title}</div>
        {ModifyComponent ? (
          <Dialog open={openDialog}>
            <DialogTrigger asChild>
              <Button
                variant={'new_secondary'}
                onClick={() => setOpenDialog(true)}
                className='text-xs'
              >
                <AddIcon /> {`${t('New')}`} {title}
              </Button>
            </DialogTrigger>
            <ModifyComponent setClose={setOpenDialog} />
          </Dialog>
        ) : null}
      </div>
      <div className='-mt-5 mb-8 flex h-8 items-start gap-3 text-xs font-medium tracking-tight text-gray-700'>
        <div className='flex items-center gap-3'>
          <span
            onClick={() => {
              navigate('/')
            }}
            className='cursor-pointer hover:underline'
          >
            Dashboard
          </span>
          <FaCircle size={4} className='text-gray-500' />
        </div>
        <div className='text-gray-400'>{title}</div>
      </div>

      <Box sx={{ width: '100%', borderRadius: 4 }}>
        <Paper sx={{ width: '100%', mb: 2, borderRadius: 4 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            setDelete={setToDelete}
            dataFilters={dataFilters}
            export={ExportComponent}
          />
          <TableContainer
            className='mt-5'
            sx={{ height: '500px', overflowY: 'auto' }}
          >
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
                  const isExpanded = expandedRows.includes(index)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <React.Fragment key={index}>
                      <TableRow
                        hover
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer', height: rowHeight }}
                      >
                        <TableCell padding='checkbox'>
                          <Checkbox
                            color='primary'
                            onClick={(event) => handleClick(event, index)}
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                            icon={<MdCheckCircleOutline size={15} />}
                            checkedIcon={<MdCheckCircle size={15} />}
                          />
                        </TableCell>
                        {headCells.map((cell) => {
                          if (cell?.body) {
                            return (
                              <TableCell
                                key={cell.id as string}
                                align={'center'}
                                padding={'none'}
                                sx={{
                                  color: '#000',
                                  // fontWeight: 600,
                                  fontFamily: "'Roboto', sans-serif",
                                  letterSpacing: '1px',
                                }}
                              >
                                <cell.body data={row as T} />
                              </TableCell>
                            )
                          } else {
                            return (
                              <TableCell
                                key={cell.id as string}
                                align={'center'}
                                padding={'none'}
                                sx={{
                                  color: '#000',
                                  // fontWeight: 600,
                                  fontFamily: "'Roboto', sans-serif",
                                  letterSpacing: '1px',
                                }}
                              >
                                {row[cell.id]}
                              </TableCell>
                            )
                          }
                        })}
                        <TableCell
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            height: 'inherit',
                          }}
                        >
                          {ExpandedBody && (
                            <IconButton
                              aria-label='expand row'
                              size='small'
                              onClick={() => handleExpandClick(index)}
                            >
                              {isExpanded ? (
                                <LuChevronUp className='text-gray-400' />
                              ) : (
                                <LuChevronDown className='text-gray-400' />
                              )}
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                      {isExpanded && ExpandedBody && (
                        <TableRow>
                          <TableCell colSpan={headCells.length + 2}>
                            <ExpandedBody data={row} />
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
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
