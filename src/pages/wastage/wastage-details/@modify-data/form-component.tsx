import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { formSchema } from './form-schema'
import { toast } from 'sonner'
import {
  Fragment,
  useEffect,
  // useEffect,
  useState,
} from 'react'
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
import { useAddWastageMutation } from '@/store/actions/slices/wastageSlice'
import { useGetProductsQuery } from '@/store/actions/slices/productsSlice'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'

const FormComponent = ({
  toEdit,
  setOpen,
  label,
}: {
  toEdit: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  label: 'RAW_MATERIAL' | null
}) => {
  const isLoading: boolean = !label

  useGetProductsQuery({})
  const { products } = useAppSelector((state: RootState) => state.products)

  const [Add] = useAddWastageMutation()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: label ?? '',
      items: [{ product: '', unit: '', qty: 0 }],
    },
  })

  const { control } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })

  async function handleModifyProducts(formData: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    if (label) {
      const payload: {
        category: 'RAW_MATERIAL'
        items: { product: string; unit: string; qty: number }[]
      } = {
        category: formData.category as 'RAW_MATERIAL',
        items: formData.items.map((i) => ({
          ...i,
          unit: 'kg',
        })),
      }

      console.log(formData.category)

      try {
        const res = await Add(payload).unwrap()
        if (res.status === 'fail') throw new Error(res.message)

        setOpen(false)
      } catch (error) {
        console.log(error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    toast.promise(handleModifyProducts(data), {
      loading: `${!toEdit ? 'Adding' : 'Updating '} Information...`,
    })
  }

  useEffect(() => {
    if (label) {
      form.setValue('category', label)
    } else {
      form.setValue('category', '')
    }
  }, [form, label])

  return (
    <Fragment>
      {!isLoading ? (
        <Form {...form}>
          <form
            action=''
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex w-full flex-1 flex-col'
          >
            <div className='mb-5 h-96 w-full overflow-y-auto overflow-x-hidden'>
              {fields?.map((_, index) => (
                <div
                  key={index}
                  className='mb-5 rounded-3xl bg-amber-800/20 px-4 py-5'
                >
                  <FormField
                    control={control}
                    name={`items.${index}.product`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Raw Material</FormLabel>
                        <FormControl>
                          {products && products?.length > 0 ? (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className='h-10 w-full border-amber-950/25'>
                                <SelectValue placeholder='Select a Unit' />
                              </SelectTrigger>
                              <SelectContent>
                                {products?.map((item, index) => {
                                  return (
                                    <SelectItem
                                      value={item?._id || ''}
                                      key={index}
                                    >
                                      {item?.name}
                                    </SelectItem>
                                  )
                                })}
                              </SelectContent>
                            </Select>
                          ) : (
                            <div className='text-sm text-gray-600'>
                              TRY ADDING MATERIAL: Error in getting your other
                              materials
                            </div>
                          )}
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className='flex w-full items-center gap-2'>
                    <FormField
                      control={control}
                      name={`items.${index}.qty`}
                      render={({ field }) => (
                        <FormItem className='w-2/3'>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <div className='flex items-center gap-2'>
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
                              kg
                            </div>
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
            </div>

            <div className='flex w-full items-center justify-between gap-2'>
              <Button
                type='button'
                onClick={() => append({ product: '', unit: '', qty: 0 })}
                className='w-full text-black'
                disabled={isSubmitting}
              >
                Add More
              </Button>
              <Button
                type='submit'
                className='w-full bg-black text-white hover:bg-black/80'
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      ) : null}
    </Fragment>
  )
}

export default FormComponent
