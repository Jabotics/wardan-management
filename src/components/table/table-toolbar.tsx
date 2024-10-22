/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Toolbar from '@mui/material/Toolbar'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import { FaAngleDown } from 'react-icons/fa6'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import { Button } from '../custom/button'

import { PiExportBold } from 'react-icons/pi'
import { StyledMenu } from './style'
import { EnhancedTableToolbarProps } from '@/interfaces'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'

import { LuSearch } from 'react-icons/lu'
import InputBase from '@mui/material/InputBase'
import { MdDelete } from 'react-icons/md'
import { transformString } from '@/lib/utils'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuPropsX = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, setDelete, dataFilters, export: Export } = props
  const { searchBy, filters, handleFilterChange } = dataFilters || {}

  const [search, setSearch] = searchBy?.actions || []

  const [columnsAnchorEl, setColumnsAnchorEl] =
    React.useState<null | HTMLElement>(null)
  const columnsOpen = Boolean(columnsAnchorEl)
  const handleColumnsClickColumns = (event: React.MouseEvent<HTMLElement>) => {
    setColumnsAnchorEl(event.currentTarget)
  }
  const handleColumnsClose = () => {
    setColumnsAnchorEl(null)
  }

  const [filtersAnchorEl, setFiltersAnchorEl] =
    React.useState<null | HTMLElement>(null)
  const filtersOpen = Boolean(filtersAnchorEl)
  const handleFiltersClickColumns = (event: React.MouseEvent<HTMLElement>) => {
    setColumnsAnchorEl(event.currentTarget)
  }
  const handleFiltersClose = () => {
    setColumnsAnchorEl(null)
  }

  const [exportAnchorEl, setExportAnchorEl] =
    React.useState<null | HTMLElement>(null)
  const exportOpen = Boolean(exportAnchorEl)
  const handleExportClickColumns = (event: React.MouseEvent<HTMLElement>) => {
    setColumnsAnchorEl(event.currentTarget)
  }
  const handleExportClose = () => {
    setColumnsAnchorEl(null)
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        pt: { xs: 1, sm: 2 },
        flex: { justifyContent: 'space-between' },
      }}
    >
      <div className='flex items-center gap-4'>
        {searchBy ? (
          <Paper
            component='form'
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 300,
              height: 55,
              borderRadius: 5,
              boxShadow: 'none',
              border: '1px solid #33333325',
              '&:hover': {
                borderColor: 'gray',
              },
              '&:focus-within': {
                boxShadow: 'inset 0 0 0 2px black',
              },
            }}
          >
            <IconButton type='button' sx={{ py: '10px' }} aria-label='search'>
              <LuSearch className='text-gray-500' size={16} />
            </IconButton>
            <InputBase
              sx={{
                flex: 1,
                fontSize: '0.75rem',
                '& .MuiInputBase-input::placeholder': {
                  fontSize: '0.9rem',
                  color: 'gray',
                },
              }}
              placeholder={searchBy.placeholderText}
              inputProps={{ 'aria-label': 'search fields' }}
              value={search}
              onChange={(e) => {
                if (setSearch) {
                  setSearch(e.target.value)
                }
              }}
            />
          </Paper>
        ) : null}

        {filters && filters.length > 0
          ? filters.map((item, index) => {
              return (
                <FormControl
                  sx={{
                    width: 200,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#33333325' },
                      '&:hover fieldset': { borderColor: 'gray' },
                      '&.Mui-focused fieldset': { borderColor: 'black' },
                    },
                    '&:hover .MuiInputLabel-root': {
                      color: 'initial',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '15px',
                      color: '#33333375',
                      '&.Mui-focused': {
                        color: 'black',
                        fontWeight: 600,
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      fontSize: '15px',
                      color: '#33333375',
                    },
                  }}
                  key={index}
                >
                  <InputLabel
                    sx={{ backgroundColor: 'white', paddingInline: 0.5 }}
                  >
                    {item.label}
                  </InputLabel>
                  <Select
                    labelId={`filter-${index}`}
                    id={`filter-${index}`}
                    multiple
                    value={item?.value ?? []}
                    onChange={(event) => {
                      const {
                        target: { value },
                      } = event

                      // console.log(Object.values(item.options[Number(value)]))
                      // console.log(typeof value === 'string')
                      const selectedValues =
                        typeof value === 'string' ? value.split(',') : value

                      if (handleFilterChange) {
                        handleFilterChange(item.label, selectedValues)
                      }
                    }}
                    input={<OutlinedInput label='Tag' />}
                    renderValue={(selected) => {
                      // if (item.type === 'array') {
                      return selected
                        .map((i) => {
                          return transformString(i)
                        })
                        .join(', ')
                      // } else {}
                    }}
                    MenuProps={MenuPropsX}
                    IconComponent={FaAngleDown}
                    sx={{ borderRadius: 5 }}
                  >
                    {item?.options.map((option, index) => {
                      return (
                        <MenuItem key={index} value={Object.keys(option)[0]}>
                          <Checkbox
                            checked={
                              item.value.indexOf(Object.keys(option)[0]) > -1
                            }
                          />
                          <ListItemText
                            primary={transformString(Object.values(option)[0])}
                          />
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              )
            })
          : null}
      </div>

      <div className='mr-4 flex items-end gap-2'>
        {Export && <Export />}
        {/* {numSelected > 0 && (
          <div
            className='mr-3 flex h-fit cursor-pointer items-center gap-1 p-1 text-[13px] font-bold text-rose-700'
            onClick={() => {
              setDelete(true)
            }}
          >
            <span>
              <MdDelete size={16} />
            </span>
            <span>Delete ({numSelected})</span>
          </div>
        )} */}

        <span className='hidden'>
          <Button
            id='demo-customized-button'
            aria-controls={exportOpen ? 'demo-customized-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={exportOpen ? 'true' : undefined}
            variant='ghost'
            // disableElevation
            onClick={handleExportClickColumns}
            // endIcon={<KeyboardArrowDownIcon />}

            className='flex h-fit items-center p-1 text-[13px] font-bold'
          >
            <PiExportBold size={18} className='mr-2' />
            Export
          </Button>
          <StyledMenu
            id='export'
            MenuListProps={{
              'aria-labelledby': 'export',
            }}
            anchorEl={exportAnchorEl}
            open={exportOpen}
            onClose={handleExportClose}
          >
            <MenuItem onClick={handleExportClose} disableRipple>
              {/* <EditIcon /> */}
              Edit
            </MenuItem>
          </StyledMenu>
        </span>
      </div>
    </Toolbar>
  )
}
