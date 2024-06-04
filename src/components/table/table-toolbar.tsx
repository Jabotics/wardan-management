import React from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Toolbar from '@mui/material/Toolbar'

import { alpha } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import { BsChevronDown } from 'react-icons/bs'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import { Button } from '../custom/button'

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'

import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { CiExport } from 'react-icons/ci'
import { StyledMenu } from './style'
import { EnhancedTableToolbarProps } from '@/interface'

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
  const { numSelected } = props

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
        flex: { justifyContent: 'space-between' },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <div className='gap-15 flex items-center'>
        <FormControl sx={{ width: 200 }}>
          <InputLabel id='demo-multiple-checkbox-label'>Tag</InputLabel>
          <Select
            labelId='demo-multiple-checkbox-label'
            id='demo-multiple-checkbox'
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label='Tag' />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuPropsX}
            IconComponent={BsChevronDown}
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
        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel id='demo-multiple-checkbox-label'>Tag</InputLabel>
          <Select
            labelId='demo-multiple-checkbox-label'
            id='demo-multiple-checkbox'
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label='Tag' />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuPropsX}
            IconComponent={BsChevronDown}
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
        <TextField id='outlined-search' label='Search field' type='search' />
      </div>

      <div className='gpa-15 flex items-center'>
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
          >
            <RemoveRedEyeIcon className='mr-1' />
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
          >
            <FilterAltIcon />
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
          >
            <CiExport size={20} className='mr-2' />
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
