/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { purchaseItemsSchemaforRawMaterial } from '../../form-schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RiDeleteBinLine } from 'react-icons/ri'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'
import { resetPurchaseInfo, useAddPurchaseMutation } from '@/store/actions/slices/purchaseSlice'
import { useGetProductsQuery } from '@/store/actions/slices/productsSlice'
import { toast } from 'sonner'
import { isErrorWithMessage } from '@/lib/utils'

const RawMaterial = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const dispatch = useAppDispatch();

  useGetProductsQuery({})
  const { products } = useAppSelector((state: RootState) => state.products)

  const [Add] = useAddPurchaseMutation()

  const { purchaseInfo } = useAppSelector((state: RootState) => state.purchase)

  const form = useForm<z.infer<typeof purchaseItemsSchemaforRawMaterial>>({
    resolver: zodResolver(purchaseItemsSchemaforRawMaterial),
    defaultValues: {
      purchaseItems: [{ product: '', unit: '', qty: 0, amount: 0 }],
    },
  })

  const { control, handleSubmit } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'purchaseItems',
  })

  const handleSubmitData = async (
    formData: z.infer<typeof purchaseItemsSchemaforRawMaterial>
  ) => {
    try {
      const processedData = {
        ...formData,
        purchaseItems: formData.purchaseItems.map((item) => ({
          ...item,
          qty: Number(item.qty),
          amount: Number(item.amount),
        })),
      }
      const transportation_charge = purchaseInfo?.transportation_charge || 0
      const unloading_charge = purchaseInfo?.unloading_charge || 0

      const invoice_amount = processedData.purchaseItems.reduce(
        (total, item) => total + item.amount,
        0
      )

      const total_amount =
        invoice_amount + transportation_charge + unloading_charge

      const res = await Add({
        ...purchaseInfo,
        total_amount,
        invoice_amount,
        seller: purchaseInfo?.seller?._id || '',
        items: processedData.purchaseItems,
      }).unwrap()

      dispatch(resetPurchaseInfo())
      
      toast(res.message)
      setOpen(false)
    } catch (error) {
      if (isErrorWithMessage(error)) {
        toast(error.data.message);
      } else {
        toast('An unexpected error occurred');
      }
    }
  }

  async function onSubmit(data: z.infer<typeof purchaseItemsSchemaforRawMaterial>) {
    toast.promise(handleSubmitData(data), {
      loading: `${'Adding Information...'}`,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='h-full w-full overflow-y-auto overflow-x-hidden'
      >
        {fields.map((_, index) => (
          <div
            key={index}
            className='mb-10 rounded-3xl bg-amber-800/20 px-4 py-5'
          >
            <FormField
              control={control}
              name={`purchaseItems.${index}.product`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Raw Material</FormLabel>
                  <FormControl>
                    {products && products.length > 0 ? (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className='h-10 w-full border-amber-950/25'>
                          <SelectValue placeholder='Select a Unit' />
                        </SelectTrigger>
                        <SelectContent>
                          {products.filter(i => i.type === 'WHOLE').map((item, index) => {
                            return (
                              <SelectItem value={item._id || ''} key={index}>
                                {item.name}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className='text-sm text-gray-300'>
                        TRY ADDING PRODUCTS: Error in getting your products
                      </div>
                    )}
                  </FormControl>
                </FormItem>
              )}
            />

            <div className='flex w-full items-center gap-2'>
              <FormField
                control={control}
                name={`purchaseItems.${index}.qty`}
                render={({ field }) => (
                  <FormItem className='w-2/3'>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Quantity'
                        {...field}
                        className='h-10 w-full border-amber-950/25'
                        type='number'
                        onFocus={() => {
                          if (field.value === 0) {
                            field.onChange('') // Clear the input on focus
                          }
                        }}
                        onBlur={() => {
                          if (
                            field.value === null ||
                            field.value === undefined
                          ) {
                            field.onChange(0) // Revert to default value if empty
                          }
                        }}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value))
                        }}
                        autoComplete='off'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`purchaseItems.${index}.unit`}
                render={({ field }) => (
                  <FormItem className='w-1/3'>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className='h-10 w-full border-amber-950/25'>
                          <SelectValue placeholder='Select a Unit' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='kg'>kg</SelectItem>
                          {/* <SelectItem value='gms'>gms</SelectItem>
                          <SelectItem value='ton'>ton</SelectItem>
                          <SelectItem value='pcs'>pcs</SelectItem> */}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name={`purchaseItems.${index}.amount`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Amount'
                      {...field}
                      className='h-10 border-amber-950/25'
                      type='number'
                      onFocus={() => {
                        if (field.value === 0) {
                          field.onChange('')
                        }
                      }}
                      onBlur={() => {
                        if (field.value === null || field.value === undefined) {
                          field.onChange(0)
                        }
                      }}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value))
                      }}
                      autoComplete='off'
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {fields.length > 1 && (
              <Button
                type='button'
                onClick={() => remove(index)}
                className='mt-10 bg-red-800'
              >
                <RiDeleteBinLine className='text-white' />
              </Button>
            )}
          </div>
        ))}
        <div className='flex w-full items-center justify-between gap-2'>
          <Button
            type='button'
            onClick={() => append({ product: '', unit: '', qty: 0, amount: 0 })}
            className='w-full text-black'
          >
            Add Invoice
          </Button>
          <Button
            type='submit'
            className='w-full bg-black text-white hover:bg-black/80'
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default RawMaterial
