import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { IPayment, IUpdatePayment } from '@/interfaces'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { formSchema } from './form-schema'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Fragment,
  // useEffect,
  // useState
} from 'react'
import { Input } from '@/components/ui/input'
import {
  useAddPaymentMutation,
  useUpdatePaymentMutation,
} from '@/store/actions/slices/paymentSlice'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useGetAllImportersQuery } from '@/store/actions/slices/importersSlice'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'

const FormComponent = ({
  data,
  isSubmitting,
  // toEdit,
  setOpen,
  setIsSubmitting,
}: {
  toEdit: boolean
  isSubmitting: boolean
  data?: IPayment
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [Add] = useAddPaymentMutation()
  const [Update] = useUpdatePaymentMutation()
  
  useGetAllImportersQuery({})
  const { importers } = useAppSelector((state: RootState) => state.importers)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: data?.amount ?? 0,
      remarks: data?.remarks ?? '',
      seller: data?.seller?._id ?? '',
    },
  })

  async function handleModifyProducts(formData: z.infer<typeof formSchema>) {
    // setIsSubmitting(true)

    const payload: {
      remarks: string
      amount: number
      seller: string
      _id?: string
    } = {
      seller: formData.seller,
      amount: formData.amount,
      remarks: formData.remarks,
    }

    try {
      setIsSubmitting(true)
      if (data) {
        payload._id = data._id

        const res = await Update(payload as IUpdatePayment).unwrap()
        if (res.status === 'fail') throw new Error(res.message)
      } else {
        const res = await Add(payload).unwrap()
        if (res.status === 'fail') throw new Error(res.message)
      }

      setOpen(false)
    } catch (error) {
      console.log(error)
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

                          // const seller = importers.find((i) => i._id === val)

                          // seller && setSelectedSeller(seller)
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
              name='remarks'
              render={({ field }) => (
                <FormItem className='flex h-32 w-full flex-col items-start gap-1 space-y-1'>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter Remarks'
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
