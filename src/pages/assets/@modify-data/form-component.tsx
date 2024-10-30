import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { IAsset } from '@/interfaces'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formSchema } from './form-schema'
import {
  Fragment,
  // useEffect,
  // useState
} from 'react'
import { Input } from '@/components/ui/input'
import {
  useAddAssetMutation,
  useEditAssetMutation,
} from '@/store/actions/slices/assetsSlice'
import { Button } from '@/components/ui/button'
import { useGetAllImportersQuery } from '@/store/actions/slices/importersSlice'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'
import { toast } from 'sonner'
import { isErrorWithMessage } from '@/lib/utils'

const FormComponent = ({
  data,
  isSubmitting,
  // toEdit,
  setOpen,
  setIsSubmitting,
}: {
  toEdit: boolean
  isSubmitting: boolean
  data?: IAsset
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [Add] = useAddAssetMutation()
  const [Update] = useEditAssetMutation()

  useGetAllImportersQuery({})
  const { importers } = useAppSelector((state: RootState) => state.importers)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item_name: data?.item_name ?? '',
      amount: data?.amount ?? 0,
      invoice_no: data?.invoice_no ?? '',
      seller: data?.seller?._id ?? '',
    },
  })

  async function handleModifyProducts(formData: z.infer<typeof formSchema>) {
    // setIsSubmitting(true)

    const payload: {
      item_name: string
      amount: number
      invoice_no: string
      _id?: string
      seller: string
    } = {
      item_name: formData.item_name,
      amount: formData.amount,
      invoice_no: formData.invoice_no,
      seller: formData.seller,
    }

    try {
      setIsSubmitting(true)
      if (data) {
        payload._id = data._id
        const sellerName =
          importers.find((i) => i._id === payload.seller)?.name ?? ''

        const res = await Update({
          ...payload,
          seller: {
            _id: payload.seller,
            name: sellerName,
          },
        } as IAsset).unwrap()
        toast(res.message)
      } else {
        const res = await Add(payload).unwrap()
        if (res.status === 'fail') throw new Error(res.message)

        toast(res.message)
      }

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

  return (
    <Fragment>
      <Form {...form}>
        <form
          action=''
          onSubmit={form.handleSubmit(handleModifyProducts)}
          className='h-full w-full'
        >
          <div className='flex w-full flex-1 flex-col gap-4'>
            <FormField
              control={form.control}
              name='item_name'
              render={({ field }) => (
                <FormItem className='mt-5 flex w-full flex-col items-start gap-1 space-y-1'>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter Item Name'
                      {...field}
                      className='h-10'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='seller'
              render={({ field }) => (
                <FormItem className='mt-5 flex w-full flex-col items-start gap-1 space-y-1'>
                  <FormLabel>Who did you buy it from?</FormLabel>
                  <FormControl>
                    {importers && importers.length > 0 ? (
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
                          {importers.map((item, index) => {
                            return (
                              <SelectItem value={item._id} key={index}>
                                {item.name}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className='text-sm text-gray-400'>
                        TRY ADDING IMPORTERS: Error in Getting your Importers
                      </div>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem className='flex w-full flex-col items-start gap-1 space-y-1'>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter Amount'
                      {...field}
                      type='number'
                      onFocus={() => {
                        if (field.value === 0) {
                          field.onChange('')
                        }
                      }}
                      onBlur={() => {
                        if (
                          field.value === null ||
                          field.value === undefined ||
                          String(field.value) === ''
                        ) {
                          field.onChange(0)
                        }
                      }}
                      onChange={(e) => {
                        const value = e.target.value
                        field.onChange(value ? parseFloat(value) : 0)
                      }}
                      autoComplete='off'
                      className='h-10'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='invoice_no'
              render={({ field }) => (
                <FormItem className='flex w-full flex-col items-start gap-1 space-y-1'>
                  <FormLabel>Invoice</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter Invoice number'
                      {...field}
                      className='h-10'
                      type='text'
                      autoComplete='off'
                    />
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
