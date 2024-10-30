import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {} from // IReadyProductStock,
'@/interfaces'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { formSchema } from './form-schema'
import { Fragment, useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  // addReadyProduct,
  useAddReadyProductMutation,
} from '@/store/actions/slices/readyProductStockSlice'
import { Button } from '@/components/ui/button'
import {
  // useAppDispatch,
  useAppSelector,
} from '@/store/hooks'
import { useGetProductsQuery } from '@/store/actions/slices/productsSlice'
import { RootState } from '@/store'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetAllVariantsQuery } from '@/store/actions/slices/variantsSlice'
import { isErrorWithMessage } from '@/lib/utils'
import { toast } from 'sonner'

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
  const { readyProducts } = useAppSelector(
    (state: RootState) => state.readyProducts
  )

  useGetProductsQuery({})
  const { products } = useAppSelector((state: RootState) => state.products)

  useGetAllVariantsQuery({})
  const { variants } = useAppSelector((state: RootState) => state.variants)

  const [Add] = useAddReadyProductMutation()

  const [productType, setProductType] = useState<'MIXTURE' | 'WHOLE' | null>(
    null
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: '',
      variant: '',
      count: 0,
      mrp: 0,
      qty: 0,
      c2c: 0,
      unit: 'kg',
    },
  })

  async function handleModifyProducts(formData: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    const payload: {
      product: string
      variant: string
      type: 'WHOLE' | 'MIXTURE'
      qty: number
      unit: 'kg'
      mrp: number
      count: number
      c2c: number
    } = {
      product: formData.product,
      variant: formData.variant,
      count: formData.count,
      c2c: formData.c2c,
      mrp: formData.mrp,
      qty: formData.qty,
      unit: 'kg',
      type: productType ?? 'WHOLE',
    }

    try {
      const res = await Add(payload).unwrap();

      // dispatch(
      //   addReadyProduct({
      //     ...payload,
      //     product: {
      //       _id: payload.product,
      //       name: '',
      //     },
      //     variant: {
      //       _id: payload.variant,
      //       name: '',
      //     },
      //     _id: res.data._id as string,
      //     updatedAt: new Date().toISOString(),
      //   })
      // )

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

  return (
    <Fragment>
      <Form {...form}>
        <form
          action=''
          onSubmit={form.handleSubmit(handleModifyProducts)}
          className='h-full w-full'
        >
          <div className='flex h-[30vh] w-full flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <FormField
                control={form.control}
                name={`product`}
                render={({ field }) => (
                  <FormItem className='w-2/3'>
                    <FormLabel>Product</FormLabel>
                    <FormControl>
                      {products && products.length > 0 ? (
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)

                            const selectedProductType = products.find(
                              (i) => i._id === value
                            )?.type
                            setProductType(
                              selectedProductType as 'MIXTURE' | 'WHOLE'
                            )

                            if (form.watch('variant') !== '') {
                              const selectedMrp = readyProducts.filter(
                                (i) =>
                                  i.product._id === value &&
                                  i.variant._id === form.watch('variant')
                              )[0]?.mrp

                              const selectedCTC = readyProducts.filter(
                                (i) =>
                                  i.product._id === value &&
                                  i.variant._id === form.watch('variant')
                              )[0]?.c2c

                              if (selectedMrp !== undefined) {
                                form.setValue('mrp', Number(selectedMrp))
                              } else {
                                console.warn(
                                  'MRP is undefined for the selected product and variant.'
                                )
                                form.setValue('mrp', 0)
                              }

                              if (selectedCTC !== undefined) {
                                form.setValue('c2c', Number(selectedCTC))
                              } else {
                                console.warn(
                                  'CTC is undefined for the selected product and variant.'
                                )
                                form.setValue('c2c', 0)
                              }
                            }
                          }}
                          value={field.value}
                        >
                          <SelectTrigger className='h-10 w-full border-amber-950/25'>
                            <SelectValue placeholder='Select a Product' />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((item, index) => (
                              <SelectItem value={item._id || ''} key={index}>
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
                name={`variant`}
                render={({ field }) => (
                  <FormItem className='w-1/3'>
                    <FormLabel>Variant</FormLabel>
                    <FormControl>
                      {variants && variants.length > 0 ? (
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)

                            if (form.watch('product') !== '') {
                              const selectedMrp = readyProducts.filter(
                                (i) =>
                                  i.product._id === form.watch('product') &&
                                  i.variant._id === value
                              )[0]?.mrp

                              const selectedCTC = readyProducts.filter(
                                (i) =>
                                  i.product._id === form.watch('product') &&
                                  i.variant._id === value
                              )[0]?.c2c

                              if (selectedMrp !== undefined) {
                                form.setValue('mrp', Number(selectedMrp))
                              } else {
                                console.warn(
                                  'MRP is undefined for the selected product and variant.'
                                )
                                form.setValue('mrp', 0)
                              }

                              if (selectedCTC !== undefined) {
                                form.setValue('c2c', Number(selectedCTC))
                              } else {
                                console.warn(
                                  'CTC is undefined for the selected product and variant.'
                                )
                                form.setValue('c2c', 0)
                              }
                            }
                          }}
                          value={field.value}
                        >
                          <SelectTrigger className='h-10 w-full border-amber-950/25'>
                            <SelectValue placeholder='Select a Variant' />
                          </SelectTrigger>
                          <SelectContent>
                            {variants.map((item, index) => (
                              <SelectItem value={item._id || ''} key={index}>
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
            </div>

            {form.watch('product') && form.watch('variant') ? (
              <div className='flex h-full w-full items-center gap-3'>
                <div className='flex h-full w-2/3 flex-col items-start justify-start gap-3'>
                  <FormField
                    control={form.control}
                    name={`count`}
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Count</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Count'
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
                              const enteredCount = e.target.value
                              field.onChange(Number(enteredCount))

                              const variant = variants.find(
                                (i) => i._id === form.watch('variant')
                              )
                              const variantName = variant?.name
                              const weight = variantName
                                ? parseInt(variantName)
                                : 0
                              const netWeight =
                                (weight / 1000) * Number(enteredCount)

                              form.setValue(
                                'qty',
                                parseFloat(netWeight.toPrecision(4))
                              )
                            }}
                            autoComplete='off'
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div>Net Weight: {form.watch('qty')}kg</div>
                  {productType === 'MIXTURE' ? (
                    <div className='flex items-start gap-3'>
                      <span>Ingredients:</span>
                      {products.map((item, index) => {
                        if (item._id === form.watch('product')) {
                          if (item.type === 'MIXTURE') {
                            return (
                              <div
                                key={index}
                                className='flex items-center gap-3 overflow-y-hidden overflow-x-auto whitespace-nowrap w-[35%] pb-5'
                              >
                                {item.ingredients?.map((ingredient, iindex) => {
                                  return (
                                    <span key={iindex} className='flex items-center px-3'>
                                      <span className='mr-2 text-amber-600'>{ingredient.product.name}</span>
                                      <span className='text-sm text-amber-600/65'>
                                        (
                                        {Number(
                                          ingredient.qty * form.watch('qty')
                                        ).toFixed(2)}
                                        kg)
                                      </span>
                                    </span>
                                  )
                                })}
                              </div>
                            )
                          }

                          return null
                        }
                        return null
                      })}
                    </div>
                  ) : null}
                </div>

                <div className='mt-5 flex h-full w-1/3 flex-col items-start'>
                  <FormField
                    control={form.control}
                    name={`mrp`}
                    render={({ field }) => (
                      <FormItem className='flex w-full items-center gap-5'>
                        <FormLabel className='mt-2'>M.R.P:</FormLabel>
                        <FormControl>
                          <div className='flex items-center gap-1'>
                            {'₹'}
                            <Input
                              placeholder='M.R.P'
                              {...field}
                              className='h-full w-full border-none border-amber-950/25 p-0 shadow-none outline-none'
                              style={{
                                boxShadow: 'none',
                                outline: 'none',
                              }}
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
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`c2c`}
                    render={({ field }) => (
                      <FormItem className='flex w-full items-center gap-5'>
                        <FormLabel className='mt-2'>C.T.C:</FormLabel>
                        <FormControl>
                          <div className='flex items-center gap-1'>
                            {'₹'}
                            <Input
                              placeholder='C.T.C'
                              {...field}
                              className='h-full w-full border-none border-amber-950/25 p-0 shadow-none outline-none'
                              style={{
                                boxShadow: 'none',
                                outline: 'none',
                              }}
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
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ) : null}
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
