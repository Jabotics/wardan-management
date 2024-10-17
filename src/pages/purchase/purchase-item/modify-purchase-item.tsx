import { IPurchaseItem } from '@/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
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
import {
  useAddPurchaseItemMutation,
  useUpdatePurchaseItemMutation,
} from '@/store/actions/slices/purchaseSlice'
import { useGetOtherMaterialsQuery } from '@/store/actions/slices/otherMaterialsSlice'

const purchaseItemsAddSchema = z.object({
  product: z.string().optional(),
  variant: z.string().optional(),
  material: z.string().optional(),
  qty: z.number(),
  amount: z.number(),
})

const purchaseItemsEditSchema = z.object({
  _id: z.string(),
  qty: z.number(),
  amount: z.number(),
})

const ModifyPurchaseItems = ({
  setOpen,
  data,
  purchaseId,
  category,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  data?: IPurchaseItem
  purchaseId?: string
  category: 'RAW_MATERIAL' | 'PACKAGING_PRODUCT' | 'OTHER'
}) => {
  const [Add] = useAddPurchaseItemMutation()
  const [Edit] = useUpdatePurchaseItemMutation()

  const toEdit = Boolean(data)

  useGetProductsQuery({})
  const { products } = useAppSelector((state: RootState) => state.products)

  useGetOtherMaterialsQuery({})
  const { materials } = useAppSelector((state: RootState) => state.materials)

  useGetAllVariantsQuery({})
  const { variants } = useAppSelector((state: RootState) => state.variants)

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const form = useForm<
    z.infer<typeof purchaseItemsAddSchema | typeof purchaseItemsEditSchema>
  >({
    resolver: zodResolver(
      toEdit ? purchaseItemsEditSchema : purchaseItemsAddSchema
    ),
    defaultValues: {
      ...(toEdit
        ? {
            _id: data?._id ?? '',
            qty: data?.qty ?? 0,
            amount: data?.amount ?? 0,
          }
        : {
            product: data?.product?._id ?? '',
            variant: data?.variant?._id ?? '',
            material: data?.material?._id ?? '',
            qty: data?.qty ?? 0,
            amount: data?.amount ?? 0,
          }),
    },
  })

  async function handleSubmit(
    formData: z.infer<
      typeof purchaseItemsAddSchema | typeof purchaseItemsEditSchema
    >
  ) {
    setIsSubmitting(true)

    try {
      if (toEdit) {
        const res = await Edit({
          _id: data?._id,
          amount: formData.amount,
          qty: formData.qty,
        }).unwrap()

        if (res.status === 'fail') throw new Error(res.message)
      } else {
        const { product, variant, material, qty, amount } = formData as z.infer<
          typeof purchaseItemsAddSchema
        >

        const payload: {
          purchaseId: string
          category: 'RAW_MATERIAL' | 'PACKAGING_PRODUCT' | 'OTHER'
          unit: string
          qty: number
          amount: number
          product?: string
          variant?: string
          material?: string
        } = {
          purchaseId: purchaseId ?? '',
          category,
          unit: 'kg',
          qty: qty ?? 0,
          amount: amount ?? 0,
        }

        if (product !== '') {
          payload.product = product
        }

        if (variant !== '') {
          payload.variant = variant
        }

        if (material !== '') {
          payload.material = material
        }

        const res = await Add(payload).unwrap()

        if (res.status === 'fail') throw new Error(res.message)
      }

      setOpen(false)
    } catch (error) {
      console.error('Submission error:', error)
      // Optionally set an error message in state to show to the user
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (data) {
      if ('product' in data) {
        form.setValue('product', data.product?._id)
      } else {
        form.setValue('product', '')
      }
      if ('variant' in data) {
        form.setValue('variant', data.variant?._id)
      } else {
        form.setValue('variant', '')
      }
      if ('material' in data) {
        form.setValue('material', data.material?._id)
      } else {
        form.setValue('material', '')
      }
    }
  }, [data, form])

  return (
    <div className='m-auto'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='flex h-fit min-h-[35vh] w-[35vw] flex-col items-center justify-between'
        >
          <div className='flex w-full flex-col gap-2'>
            <FormField
              control={form.control}
              name={`product`}
              render={({ field }) => (
                <FormItem
                  className={`${category === 'OTHER' ? 'hidden' : 'block'}`}
                >
                  <FormLabel>Products</FormLabel>
                  <FormControl>
                    {products && products.length > 0 ? (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className='h-10 w-full border-amber-950/25'>
                          <SelectValue placeholder='Select a Product' />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((item) => (
                            <SelectItem value={item._id || ''} key={item._id} disabled={toEdit ? item._id !== field.value : false}>
                              {item.name}
                            </SelectItem>
                          ))}
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
              name={`material`}
              render={({ field }) => (
                <FormItem
                  className={`${category !== 'OTHER' ? 'hidden' : 'block'}`}
                >
                  <FormLabel>Other Materials</FormLabel>
                  <FormControl>
                    {materials && materials.length > 0 ? (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className='h-10 w-full border-amber-950/25'>
                          <SelectValue placeholder='Select a Material' />
                        </SelectTrigger>
                        <SelectContent>
                          {materials.map((item) => (
                            <SelectItem value={item._id || ''} key={item._id} disabled={toEdit ? item._id !== field.value : false}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className='text-sm text-gray-300'>
                        TRY ADDING OTHER MATERIALS: Error in getting your other
                        materials
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
                <FormItem
                  className={`${category !== 'PACKAGING_PRODUCT' ? 'hidden' : 'block'}`}
                >
                  <FormLabel>Variant</FormLabel>
                  <FormControl>
                    {variants && variants.length > 0 ? (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className='h-10 w-full border-amber-950/25'>
                          <SelectValue placeholder='Select a Packaging Product' />
                        </SelectTrigger>
                        <SelectContent>
                          {variants.map((item) => (
                            <SelectItem value={item._id || ''} key={item._id} disabled={toEdit ? item._id !== field.value : false}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className='text-sm text-gray-300'>
                        TRY ADDING PACKAGING PRODUCT: Error in getting your
                        packaging product
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
              {toEdit ? 'Edit' : 'Add'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ModifyPurchaseItems
