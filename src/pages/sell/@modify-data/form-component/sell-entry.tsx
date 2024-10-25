import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { addSellSchema } from '../form-schema'
import { Fragment, useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ISell } from '@/interfaces'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'
import {
  setSellAddInfo,
  useUpdateSellMutation,
} from '@/store/actions/slices/exportSlice'
import { useGetAllExportersQuery } from '@/store/actions/slices/exportersSlice'
import SellItemForm from './sell-item'
import { Input } from '@/components/ui/input'

const SellEntry = ({
  setOpen,
  toEdit,
  data,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  toEdit: boolean
  data?: ISell
}) => {
  const dispatch = useAppDispatch()

  const [Edit] = useUpdateSellMutation()

  const [searchExporter, setSearchExporter] = useState<string>('')

  useGetAllExportersQuery({
    search: searchExporter,
  }, {
    refetchOnMountOrArgChange: true
  })
  const { exporters } = useAppSelector((state: RootState) => state.exporters)

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [toRedirect, setToRedirect] = useState<boolean>(false)

  const form = useForm<z.infer<typeof addSellSchema>>({
    resolver: zodResolver(addSellSchema),
    defaultValues: {
      buyer: data?.buyer?._id ?? '',
      total_amount: 0,
      total_qty: 0,
    },
  })

  async function handleModifyProducts(formData: z.infer<typeof addSellSchema>) {
    setIsSubmitting(true)

    const payload: Partial<ISell> = {
      buyer: {
        _id: formData.buyer,
        address: '',
        gst_number: '',
        name: '',
      },
      total_amount: formData.total_amount,
      total_qty: formData.total_qty,
    }

    try {
      if (payload.buyer?._id === '')
        throw new Error('Please Select one of your Exporter')

      if (data) {
        await Edit({
          _id: data._id,
          buyer: payload.buyer?._id || '',
        })

        setOpen(false)
      } else {
        dispatch(setSellAddInfo(payload))
        setToRedirect(true)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Fragment>
      {toRedirect ? (
        <SellItemForm setOpen={setOpen} />
      ) : (
        <Form {...form}>
          <form
            action=''
            onSubmit={form.handleSubmit(handleModifyProducts)}
            className='h-[80%] w-full'
          >
            <div className='flex h-[85%] w-full flex-col gap-4 overflow-y-auto overflow-x-hidden pb-5 pl-1 pr-4'>
              <FormField
                control={form.control}
                name='buyer'
                render={({ field }) => (
                  <FormItem className='mt-5 flex w-full flex-col items-start gap-1 space-y-1'>
                    <FormLabel>Whom did you sell it to?</FormLabel>
                    <FormControl>
                      {/* {exporters && exporters.length > 0 ? ( */}
                        <Select
                          value={field.value || ''}
                          onValueChange={(val) => {
                            field.onChange(val)
                          }}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select a Seller' />
                          </SelectTrigger>
                          <SelectContent>
                            <div className='border-none p-3'>
                              <Input
                                className='border placeholder-gray-300 outline-none'
                                style={{ outline: 'none', boxShadow: 'none' }}
                                placeholder='Search by Name & Number'
                                value={searchExporter}
                                onChange={(e) => {
                                  setSearchExporter(e.target.value)
                                }}
                              />
                            </div>
                            {exporters.map((item, index) => {
                              return (
                                <SelectItem value={item._id} key={index}>
                                  {item.name}
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                      {/* ) : (
                        <div className='text-sm text-gray-400'>
                          TRY ADDING EXPORTER: Error in Getting your Exporters
                        </div>
                      )} */}
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
              {toEdit ? 'Edit' : `Add`}
            </Button>
          </form>
        </Form>
      )}
    </Fragment>
  )
}

export default SellEntry
