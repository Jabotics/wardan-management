/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { sellItemsSchema } from '../../form-schema'
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
import { useGetProductsQuery } from '@/store/actions/slices/productsSlice'
import { useGetAllVariantsQuery } from '@/store/actions/slices/variantsSlice'
import {
  setNewSell,
  useAddSellMutation,
} from '@/store/actions/slices/exportSlice'

const SellItemForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const dispatch = useAppDispatch()

  useGetProductsQuery({})
  const { products } = useAppSelector((state: RootState) => state.products)

  useGetAllVariantsQuery({})
  const { variants } = useAppSelector((state: RootState) => state.variants)

  const [Add] = useAddSellMutation()

  const { sellAddInfo } = useAppSelector((state: RootState) => state.sell)

  const form = useForm<z.infer<typeof sellItemsSchema>>({
    resolver: zodResolver(sellItemsSchema),
    defaultValues: {
      sellItems: [{ product: '', variant: '', qty: 0, amount: 0 }],
    },
  })

  const { control, handleSubmit } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sellItems',
  })

  const onSubmit = async (formData: z.infer<typeof sellItemsSchema>) => {
    try {
      const items = formData.sellItems.map((item) => ({
        product: item.product,
        variant: item.variant,
        qty: Number(item.qty),
        amount: Number(item.amount),
      }))

      const totalAmount = items.reduce((total, item) => total + item.amount, 0)
      const totalQty = items.reduce((total, item) => total + item.qty, 0)

      const res = await Add({
        ...sellAddInfo,
        buyer: sellAddInfo?.buyer?._id || '',
        items,
        total_amount: totalAmount,
        total_qty: totalQty,
      }).unwrap()

      dispatch(
        setNewSell({
          data: {
            total_amount: totalAmount,
            total_qty: totalQty,
            _id: res?.data?._id || '',
            createdAt: new Date().toISOString(),
            buyer: {
              _id: sellAddInfo?.buyer?._id || '',
              address: sellAddInfo?.buyer?.address || '',
              gst_number: sellAddInfo?.buyer?.gst_number || '',
              name: sellAddInfo?.buyer?.name || '',
            },
          },
        })
      )
      console.log(res)
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
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
              name={`sellItems.${index}.product`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Products</FormLabel>
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
                          {products.map((item, index) => {
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

            <FormField
              control={control}
              name={`sellItems.${index}.variant`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant</FormLabel>
                  <FormControl>
                    {variants && variants.length > 0 ? (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className='h-10 w-full border-amber-950/25'>
                          <SelectValue placeholder='Select a Unit' />
                        </SelectTrigger>
                        <SelectContent>
                          {variants.map((item, index) => {
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
                        TRY ADDING VARIANT: Error in getting your variants
                      </div>
                    )}
                  </FormControl>
                </FormItem>
              )}
            />

            <div className='mb-5 mt-2 flex w-full items-center gap-2'>
              <FormField
                control={control}
                name={`sellItems.${index}.qty`}
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
                name={`sellItems.${index}.amount`}
                render={({ field }) => (
                  <FormItem className='h-full w-1/3'>
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
                          if (
                            field.value === null ||
                            field.value === undefined
                          ) {
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
            </div>

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
            onClick={() =>
              append({ product: '', variant: '', qty: 0, amount: 0 })
            }
            className='w-full text-black'
          >
            Add More
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

export default SellItemForm
