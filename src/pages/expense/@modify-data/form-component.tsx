import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { formSchema } from './form-schema'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  useAppDispatch,
  // useAppDispatch,
  useAppSelector,
} from '@/store/hooks'
import { RootState } from '@/store'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { isErrorWithMessage } from '@/lib/utils'
import { toast } from 'sonner'
import {
  addExpenseCategory,
  useAddExpenseCategoryMutation,
  useAddExpenseMutation,
  useGetExpenseCategoryQuery,
} from '@/store/actions/slices/expenseSlice'
import { FaPlus } from 'react-icons/fa'
import { Textarea } from '@/components/ui/textarea'

const FormComponent = ({
  isSubmitting,
  setOpen,
  setIsSubmitting,
}: {
  toEdit: boolean
  isSubmitting: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const dispatch = useAppDispatch()

  const [newCategory, setNewCategory] = useState<string>('')
  const [isLoadingCategory, setIsLoadingCategory] = useState<boolean>(false)
  const [clickMonthYear, setClickMonthYear] = useState<boolean>(false)
  const selectRef = useRef<HTMLDivElement | null>(null)
  const calendarRef = useRef<HTMLDivElement | null>(null)

  useGetExpenseCategoryQuery(
    {
      search: newCategory,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  )
  const { expenseCategories } = useAppSelector(
    (state: RootState) => state.expense
  )

  const [AddCategory] = useAddExpenseCategoryMutation()
  const [Add] = useAddExpenseMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      category: '',
      month: '',
      remarks: '',
      year: 0,
    },
  })

  const handleMonthYearChange = (newValue: Dayjs | null) => {
    if (newValue) {
      const newMonth = newValue.format('MMMM')
      const newYear = newValue.year()

      form.setValue('month', `${newMonth.slice(0,3)}`)
      form.setValue('year', newYear)
    }
  }

  async function handleAddExpenseCategory() {
    setIsLoadingCategory(true)
    try {
      const res = await AddCategory({
        name: newCategory,
      }).unwrap()

      dispatch(
        addExpenseCategory({
          _id: res.data._id,
          name: newCategory,
          is_active: true,
        })
      )
      toast(res.message)
      setNewCategory('')
    } catch (error) {
      if (isErrorWithMessage(error)) {
        toast(error.data.message)
      } else {
        toast('An unexpected error occurred')
      }
    } finally {
      setIsLoadingCategory(false)
    }
  }

  async function handleModifyProducts(formData: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    const payload: {
      category: string
      remarks: string
      month: string
      amount: number
      year: number
    } = {
      category: formData.category,
      remarks: formData.remarks || '',
      month: formData.month,
      amount: formData.amount,
      year: formData.year,
    }

    try {
      const res = await Add(payload).unwrap()

      toast(res.message)
      setOpen(false)
    } catch (error) {
      if (isErrorWithMessage(error)) {
        toast(error.data.message)
      } else {
        toast('An unexpected error occurred')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      calendarRef.current &&
      event.target instanceof Node &&
      !selectRef.current.contains(event.target) &&
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
    <Fragment>
      <Form {...form}>
        <form
          action=''
          onSubmit={form.handleSubmit(handleModifyProducts)}
          className='h-full w-full'
        >
          <div className='flex min-h-[40vh] w-full flex-col gap-4'>
            <FormField
              control={form.control}
              name={`category`}
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                      }}
                    >
                      <SelectTrigger className='h-10 w-full border-amber-950/25'>
                        <SelectValue placeholder='Select a Category' />
                      </SelectTrigger>
                      <SelectContent>
                        <div className='mb-2 flex items-center border pl-0 pr-2'>
                          <Input
                            placeholder='Search Categories'
                            className='border-none outline-none'
                            value={newCategory}
                            onChange={(e) => {
                              setNewCategory(e.target.value)
                            }}
                            onKeyDown={(event) => {
                              if (
                                ['ArrowUp', 'ArrowDown', 'Enter'].includes(
                                  event.key
                                )
                              ) {
                                event.preventDefault()
                              }
                            }}
                            style={{
                              outline: 'none',
                              boxShadow: 'none',
                            }}
                          />
                          {expenseCategories.length === 0 && (
                            <span
                              className='cursor-pointer rounded-md bg-stone-700 p-1 text-white shadow-md'
                              onClick={handleAddExpenseCategory}
                            >
                              <FaPlus />
                            </span>
                          )}
                        </div>

                        <div className='max-h-[25vh] w-full overflow-y-auto overflow-x-hidden'>
                          {expenseCategories.map((item) => (
                            <SelectItem
                              value={item._id || ''}
                              key={item._id}
                              className='flex items-center justify-between'
                            >
                              {item.name}
                            </SelectItem>
                          ))}
                        </div>

                        {expenseCategories.length === 0 && (
                          <span className='-mt-7 h-fit pl-2 text-xs text-stone-500 underline'>
                            Add the Category
                          </span>
                        )}

                        {isLoadingCategory && (
                          <div className='flex h-7 w-full items-center justify-center'>
                            <div className='h-5 w-5 animate-spin rounded-full border-4 border-stone-500 border-t-transparent'></div>
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className='flex w-full items-end gap-2'>
              <FormField
                control={form.control}
                name={`month`}
                render={() => (
                  <FormItem className='w-full' ref={selectRef}>
                    <FormLabel>Pick Month</FormLabel>
                    <FormControl>
                      <Select open={clickMonthYear}>
                        <SelectTrigger
                          className='h-10 w-full border-amber-950/25'
                          onClick={() => setClickMonthYear(true)}
                        >
                          <SelectValue
                            placeholder={`${form.watch('month') !== '' ? form.watch('month') : 'Pick a Month'}`}
                          />
                        </SelectTrigger>
                        <SelectContent ref={calendarRef}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                              value={dayjs(new Date())}
                              views={['month', 'year']}
                              openTo='month'
                              onChange={handleMonthYearChange}
                            />
                          </LocalizationProvider>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem className='flex w-1/3 flex-col items-start gap-1 space-y-1'>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Amount'
                        {...field}
                        maxLength={15}
                        onChange={(e) => {
                          const value = e.target.value.toUpperCase()

                          if (/^[0-9]*$/.test(value)) {
                            field.onChange(Number(value))
                          }
                        }}
                        className='h-10'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='remarks'
              render={({ field }) => (
                <FormItem className='flex max-h-40 min-h-32 w-full flex-col items-start gap-1 space-y-1'>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter remarks'
                      {...field}
                      className='h-10 max-h-32'
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            className='mt-5 h-10 w-full rounded-xl bg-black text-gray-200 hover:bg-black/75'
            type='submit'
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Form>
    </Fragment>
  )
}

export default FormComponent
