import { ISellItem } from '@/interfaces'
import {
  useAddSellItemMutation,
  useUpdateSellItemMutation,
} from '@/store/actions/slices/exportSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useGetReadyProductStockQuery } from '@/store/actions/slices/readyProductStockSlice'
import { useGetAllVariantsQuery } from '@/store/actions/slices/variantsSlice'
import { toast } from 'sonner'
import { isErrorWithMessage } from '@/lib/utils'

const sellItemsSchema = z.object({
  product: z.string(),
  variant: z.string(),
  qty: z.number(),
  amount: z.number(),
  c2c: z.number(),
})

const ModifySellItems = ({
  setOpen,
  data,
  sellId,
  totalAmount,
  totalQty,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  data?: ISellItem
  sellId?: string
  totalAmount?: number
  totalQty?: number
}) => {
  const [Add] = useAddSellItemMutation()
  const [Edit] = useUpdateSellItemMutation()

  useGetReadyProductStockQuery({})
  const { readyProducts } = useAppSelector(
    (state: RootState) => state.readyProducts
  )
  const uniqueProducts = Array.from(
    new Map(readyProducts.map((item) => [item.product._id, item])).values()
  )
  const variantsInReadyProducts = uniqueProducts.map((i) => i.variant._id)

  useGetAllVariantsQuery({})
  const { variants } = useAppSelector((state: RootState) => state.variants)

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const form = useForm<z.infer<typeof sellItemsSchema>>({
    resolver: zodResolver(sellItemsSchema),
    defaultValues: {
      product: data?.product?._id ?? '',
      variant: data?.variant?._id ?? '',
      qty: data?.qty ?? 0,
      amount: data?.amount ?? 0,
      c2c: data?.c2c_amount ?? 0,
    },
  })

  async function handleModifySellItem(
    formData: z.infer<typeof sellItemsSchema>
  ) {
    setIsSubmitting(true)

    const payload: {
      product: string
      variant: string
      amount: number
      qty: number
      _id?: string
      c2c_amount: number
    } = {
      product: formData.product,
      amount: formData.amount,
      qty: formData.qty,
      variant: formData.variant,
      c2c_amount: formData.c2c,
    }

    try {
      if (data) {
        const res = await Edit({
          _id: data._id,
          amount: payload.amount,
          qty: payload.qty,
          total_qty: payload.qty ?? totalQty,
          total_amount: payload.amount ?? totalAmount,
          c2c_amount: payload.c2c_amount,
        }).unwrap()

        toast(res.message)
      } else {
        const res = await Add({
          ...payload,
          sellId: sellId ?? '',
        }).unwrap()

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
    <div className='m-auto'>
      <Form {...form}>
        <form
          action=''
          onSubmit={form.handleSubmit(handleModifySellItem)}
          className='flex h-fit min-h-[35vh] w-[35vw] flex-col items-center justify-between'
        >
          <div className='flex w-full flex-col gap-2'>
            <FormField
              control={form.control}
              name={`product`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Products</FormLabel>
                  <FormControl>
                    {readyProducts && readyProducts.length > 0 ? (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className='h-10 w-full border-amber-950/25'>
                          <SelectValue placeholder='Select a Unit' />
                        </SelectTrigger>
                        <SelectContent>
                          {readyProducts.map((item, index) => {
                            return (
                              <SelectItem
                                value={item.product._id || ''}
                                key={index}
                              >
                                {item.product.name}
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
              control={form.control}
              name={`variant`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant</FormLabel>
                  <FormControl>
                    {readyProducts && readyProducts.length > 0 ? (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className='h-10 w-full border-amber-950/25'>
                          <SelectValue placeholder='Select a Variant' />
                        </SelectTrigger>
                        <SelectContent>
                          {variants.map((item, index) => {
                            if (variantsInReadyProducts.includes(item._id)) {
                              return (
                                <SelectItem value={item?._id || ''} key={index}>
                                  {item?.name}
                                </SelectItem>
                              )
                            }
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

            {form.watch('product') && form.watch('variant') ? (
              <div className='mb-5 mt-2 flex w-full items-center gap-2'>
                <FormField
                  control={form.control}
                  name={`qty`}
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

                            const selectedReadyProduct = readyProducts.filter(
                              (i) =>
                                i.product._id === form.getValues('product') &&
                                i.variant._id === form.getValues('variant')
                            )

                            const selectedCTC =
                              selectedReadyProduct[0].c2c *
                              Number(e.target.value)
                            form.setValue('c2c', selectedCTC)
                          }}
                          autoComplete='off'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`amount`}
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
            ) : null}

            {form.watch('c2c') !== 0 && <div>C.T.C: ₹ {form.watch('c2c')}</div>}
          </div>

          <div className='flex w-full items-center gap-2'>
            <Button
              className='mt-5 h-10 w-full rounded-xl'
              type='button'
              disabled={isSubmitting}
              variant={'outline'}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className='mt-5 h-10 w-full rounded-xl bg-black text-gray-200 hover:bg-black/75'
              type='submit'
              disabled={isSubmitting}
            >
              {data !== undefined ? 'Edit' : `Add`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ModifySellItems
