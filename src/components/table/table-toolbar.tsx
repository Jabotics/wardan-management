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

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'

import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { PiExportBold } from 'react-icons/pi'
import { StyledMenu } from './style'
import { EnhancedTableToolbarProps } from '@/interface'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'

import { LuSearch } from 'react-icons/lu'
import InputBase from '@mui/material/InputBase'
import { MdDelete } from 'react-icons/md'

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
  const { numSelected, setDelete } = props

  const [personName, setPersonName] = React.useState<string[]>([])

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

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
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
        >
          <InputLabel>Tag</InputLabel>
          <Select
            labelId='demo-multiple-checkbox-label'
            id='demo-multiple-checkbox'
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label='Tag' />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuPropsX}
            IconComponent={FaAngleDown}
            sx={{ borderRadius: 2 }}
          >
            {['Oliver Hansen'].map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
        >
          <InputLabel>Tag</InputLabel>
          <Select
            labelId='demo-multiple-checkbox-label'
            id='demo-multiple-checkbox'
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label='Tag' />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuPropsX}
            IconComponent={FaAngleDown}
            sx={{ borderRadius: 2 }}
          >
            {['Oliver Hansen'].map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Paper
          component='form'
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 200,
            height: 55,
            borderRadius: 2,
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
            sx={{ flex: 1 }}
            placeholder='Search...'
            inputProps={{ 'aria-label': 'search fields' }}
          />
        </Paper>
      </div>

      <div className='mr-4 flex items-end gap-2'>
        {numSelected > 0 && (
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
        )}

        <span>
          <Button
            id='demo-customized-button'
            aria-controls={columnsOpen ? 'demo-customized-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={columnsOpen ? 'true' : undefined}
            variant='ghost'
            // disableElevation
            onClick={handleColumnsClickColumns}
            // endIcon={<KeyboardArrowDownIcon />}

            className='flex h-fit items-center p-1 text-[13px] font-bold'
          >
            <RemoveRedEyeIcon className='mr-1' fontSize='small' />
            Columns
          </Button>
          <StyledMenu
            id='columns'
            MenuListProps={{
              'aria-labelledby': 'columns',
            }}
            anchorEl={columnsAnchorEl}
            open={columnsOpen}
            onClose={handleColumnsClose}
          >
            <MenuItem onClick={handleColumnsClose} disableRipple>
              {/* <EditIcon /> */}
              Edit
            </MenuItem>
          </StyledMenu>
        </span>

        <span>
          <Button
            id='demo-customized-button'
            aria-controls={filtersOpen ? 'demo-customized-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={filtersOpen ? 'true' : undefined}
            variant='ghost'
            // disableElevation
            onClick={handleFiltersClickColumns}
            // endIcon={<KeyboardArrowDownIcon />}

            className='flex h-fit items-center p-1 text-[13px] font-bold'
          >
            <FilterAltIcon fontSize='small' />
            Filters
          </Button>
          <StyledMenu
            id='filters'
            MenuListProps={{
              'aria-labelledby': 'filters',
            }}
            anchorEl={filtersAnchorEl}
            open={filtersOpen}
            onClose={handleFiltersClose}
          >
            <MenuItem onClick={handleFiltersClose} disableRipple>
              {/* <EditIcon /> */}
              Edit
            </MenuItem>
          </StyledMenu>
        </span>

        <span>
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
