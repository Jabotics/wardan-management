/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnhancedTableBodyProps } from '@/interfaces'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { MdCheckCircleOutline, MdCheckCircle } from 'react-icons/md'
import { LuChevronUp, LuChevronDown } from 'react-icons/lu'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { Fragment } from 'react/jsx-runtime'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { useAppDispatch } from '@/store/hooks'

const EnhancedTableBody = <T,>({
  row,
  open,
  handleClick,
  handleExpandClick,
  headCells,
  ExpandedBody,
  rowHeight,
  ModifyComponent,
  isItemSelected,
  isExpanded,
  labelId,
  handleActionClick,
  handleActionClose,
  setOpenDialog,
  anchorActionEl,
  toModify,
}: EnhancedTableBodyProps<T>) => {
  const dispatch = useAppDispatch();

  return (
    <Fragment>
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
            onClick={(event) => {
              const index = Number(labelId.split('-').pop())
              handleClick(event, index)
            }}
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
                {String(row[cell.id])}
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
              onClick={() => {
                const index = Number(labelId.split('-').pop())
                handleExpandClick(index)
              }}
            >
              {isExpanded ? (
                <LuChevronUp className='text-gray-400' />
              ) : (
                <LuChevronDown className='text-gray-400' />
              )}
            </IconButton>
          )}
          <div>
            <IconButton
              id='basic-button'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={(e) => {
                if (toModify) {
                  dispatch(toModify(row as any))
                }
                handleActionClick(e)
              }}
            >
              <BsThreeDotsVertical size={20} className='text-gray-400' />
            </IconButton>
            <Menu
              id='basic-menu'
              anchorEl={anchorActionEl}
              open={open}
              onClose={() => {
                if (toModify) {
                  dispatch(toModify(undefined))
                }
                handleActionClose()
              }}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              sx={{
                '& .MuiPaper-root': {
                  borderRadius: 3,
                  boxShadow: 'none',
                  border: '1px solid #E5E5E5',
                  zIndex: -1,
                },
              }}
            >
              {ModifyComponent && setOpenDialog ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <MenuItem
                      // onClick={handleActionClose}
                      className='flex items-center gap-2'
                    >
                      <span>
                        <RemoveRedEyeIcon className='mr-1' fontSize='small' />
                      </span>
                      View
                    </MenuItem>
                  </DialogTrigger>

                  <ModifyComponent setClose={setOpenDialog} />
                </Dialog>
              ) : null}

              <MenuItem
                onClick={handleActionClose}
                className='flex items-center gap-2'
                sx={{ color: 'red' }} // Apply lighter font weight
              >
                <span>
                  <RiDeleteBin6Fill />
                </span>
                Delete
              </MenuItem>
            </Menu>
          </div>
        </TableCell>
      </TableRow>
      {ExpandedBody && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={isExpanded} timeout='auto' unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <ExpandedBody data={row as T} />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  )
}

export default EnhancedTableBody
