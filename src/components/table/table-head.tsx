import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'

import { visuallyHidden } from '@mui/utils'
import { EnhancedTableHeadProps } from '@/interfaces'

import { FaRegSquareCheck, FaSquareCheck } from 'react-icons/fa6'
import { FaMinusSquare } from 'react-icons/fa'

export function EnhancedTableHead<T extends { [key: string]: string | number }>(
  props: EnhancedTableHeadProps<T>
) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
  } = props
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox' sx={{ borderBottom: 'none' }}>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all items' }}
            icon={<FaRegSquareCheck />}
            checkedIcon={<FaSquareCheck />}
            indeterminateIcon={<FaMinusSquare />}
          />
        </TableCell>
        {headCells.map((headCell) => {

          return (
            <TableCell
              key={headCell.id as string}
              align={'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ borderBottom: 'none' }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <span
                  className='text-sm text-gray-500'
                  style={{ fontFamily: "'RobotoL', sans-serif" }}
                >
                  {headCell.label}
                </span>
                {orderBy === headCell.id ? (
                  <Box component='span' sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          )
        })}
        <TableCell sx={{ borderBottom: 'none' }}></TableCell>
      </TableRow>
    </TableHead>
  )
}
