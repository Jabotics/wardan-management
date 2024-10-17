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
import { useGetProductsQuery } from '@/store/actions/slices/productsSlice'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'
import { useGetAllVariantsQuery } from '@/store/actions/slices/variantsSlice'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

const sellItemsSchema = z.object({
  product: z.string(),
  variant: z.string(),
  qty: z.number(),
  amount: z.number(),
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

  useGetProductsQuery({})
  const { products } = useAppSelector((state: RootState) => state.products)

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
    } = {
      product: formData.product,
      amount: formData.amount,
      qty: formData.qty,
      variant: formData.variant,
    }

    try {
      if (data) {
        const res = await Edit({
          _id: data._id,
          amount: payload.amount,
          qty: payload.qty,
          total_qty: totalAmount ?? 0,
          total_amount: totalQty ?? 0,
        }).unwrap()

        if (res.status === 'fail') throw new Error(res.message)
      } else {
        const res = await Add({
          ...payload,
          sellId: sellId ?? '',
        }).unwrap()

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
              control={form.control}
              name={`variant`}
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
                          <SelectValue placeholder='Select a Variant' />
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
          </div>

          <div className='flex items-center gap-2 w-full'>
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
