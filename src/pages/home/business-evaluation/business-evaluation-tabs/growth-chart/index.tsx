import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { useEffect, useRef, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import DataTable from './data-table'

const GrowthChart = () => {
  const calendarRef = useRef<HTMLDivElement | null>(null)
  const currentDate = dayjs()

  const [selectedDate, setSelectedDate] = useState<Dayjs>(currentDate)
  const [clickMonthYear, setClickMonthYear] = useState<boolean>(false)
  const [selectedMonth, setSelectedMonth] = useState<string>(
    currentDate.format('MMMM').substring(0,3)
  )
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.year())

  const [selectedTable, setSelectedTable] = useState<
    'Expense' | 'Sell' | 'Stock'
  >('Expense')

  const handleMonthYearChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setSelectedMonth(newValue.format('MMMM').substring(0, 3))
      setSelectedYear(newValue.year())
      setSelectedDate(newValue)
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      calendarRef.current &&
      event.target instanceof Node &&
      !calendarRef.current.contains(event.target)
    ) {
      setClickMonthYear(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <div className='flex h-6 w-full items-center justify-between rounded-md px-2'>
        <div className='flex items-center gap-2'>
          <div
            className='cursor-pointer rounded-md border-2 border-[#EE666675] px-3 py-1 text-sm'
            onClick={() => {
              setSelectedTable('Expense')
            }}
          >
            Expense
          </div>
          <div
            className='cursor-pointer rounded-md border-2 border-[#5C7BD975] px-3 py-1 text-sm'
            onClick={() => {
              setSelectedTable('Sell')
            }}
          >
            Sell
          </div>
          <div
            className='cursor-pointer rounded-md border-2 border-[#9FE08075] px-3 py-1 text-sm'
            onClick={() => {
              setSelectedTable('Stock')
            }}
          >
            Stock
          </div>
        </div>
        <Select open={clickMonthYear}>
          <SelectTrigger
            className='h-8 w-32 border-2 border-amber-950/5'
            onClick={() => setClickMonthYear(true)}
          >
            <SelectValue
              placeholder={`${selectedMonth} ${selectedYear}`}
              className='text-xs'
            />
          </SelectTrigger>
          <SelectContent ref={calendarRef}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={selectedDate}
                views={['month', 'year']}
                openTo='month'
                onChange={handleMonthYearChange}
              />
            </LocalizationProvider>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        title={selectedTable}
        month={selectedMonth}
        year={selectedYear}
      />
    </>
  )
}

export default GrowthChart
