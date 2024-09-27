import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { IProduct } from '@/interfaces'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { formSchema } from './form-schema'
import { toast } from 'sonner'
import Input from '@mui/material/Input/Input'
import { Fragment, useEffect, useState } from 'react'
import { MenuItem, Select } from '@mui/material'
import { GiCoolSpices } from 'react-icons/gi'
import { FaPlus } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { RxCross1 } from 'react-icons/rx'
import { FcCheckmark } from 'react-icons/fc'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'
import {
  useAddProductsMutation,
  useEditProductsMutation,
  useFetchProductsQuery,
  useRemoveProductMutation,
} from '@/store/actions/slices/productsSlice'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const FormComponent = ({
  toEdit,
  isLoading,
  data,
}: {
  toEdit: boolean
  isLoading: boolean
  data: IProduct[] | null
}) => {
  const navigate = useNavigate()

  useFetchProductsQuery()
  const { allWholeProducts } = useAppSelector(
    (state: RootState) => state.products
  )

  const [Add] = useAddProductsMutation()
  const [Update] = useEditProductsMutation()
  const [Delete] = useRemoveProductMutation()

  const [addNewIngredient, setAddNewIngredient] = useState<boolean>(false)
  const [newIngredient, setNewIngredient] = useState<string | null>(null)

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data ? data[0]?.name : '',
      type: data ? data[0]?.type : '',
    },
  })

  const watchIngredients = form.watch('ingredients')
  const handleAddNewIngredient = () => {
    if (!newIngredient) return

    const ingredient = allWholeProducts.find((i) => i._id === newIngredient)
    if (!ingredient) return

    const updatedIngredients = [
      ...(Array.isArray(watchIngredients) ? watchIngredients : []),
      { name: ingredient.name, _id: newIngredient },
    ]

    form.setValue('ingredients', updatedIngredients)
    setAddNewIngredient(false)
    setNewIngredient(null)
  }

  const handleRemoveIngredient = (id: string) => {
    const newIngredientsList = form
      .watch('ingredients')
      ?.filter((i) => i._id !== id)

    form.setValue('ingredients', newIngredientsList)
  }

  async function handleDelete() {
    if (data && data[0]._id) {
      setIsSubmitting(true)
      try {
        const res = await Delete({ id: data[0]._id }).unwrap()

        if (res.status === 'fail') throw new Error(res.message)
        navigate(`/`)
      } catch (error) {
        console.log(error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  async function handleModifyProducts(formData: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    const payload: {
      name: string
      type: 'WHOLE' | 'MIXTURE'
      ingredients?: string[]
      _id?: string
      is_active?: boolean
    } = {
      name: formData.name,
      type: formData.type as 'WHOLE' | 'MIXTURE',
      ingredients: formData.ingredients?.map((ingredient) => ingredient._id),
    }

    if (formData.type === 'WHOLE') delete payload.ingredients

    try {
      if (data) {
        payload._id = data[0]._id
        payload.is_active = data[0].is_active

        const res = await Update(payload).unwrap()
        if (res.status === 'fail') throw new Error(res.message)
        navigate(`/`)
      } else {
        console.log(payload)
        const res = await Add(payload).unwrap()
        if (res.status === 'fail') throw new Error(res.message)
        navigate(`/`)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    toast.promise(handleModifyProducts(data), {
      loading: `${!toEdit ? 'Adding' : 'Updating '} Information...`,
    })
  }

  useEffect(() => {
    form.setValue('name', data?.[0]?.name ?? '')
    form.setValue('type', data?.[0]?.type ?? '')

    data?.[0]?.type === 'MIXTURE' &&
      form.setValue('ingredients', data?.[0]?.ingredients)
  }, [data, form])

  const excludedIds = data
    ? new Set([
        data[0]._id,
        ...(form.watch('ingredients')?.map((i) => i._id) || []),
      ])
    : new Set([
      ...(form.watch('ingredients')?.map((i) => i._id) || []),
    ])

  const menuItems = allWholeProducts
    .filter((item) => !excludedIds.has(item._id))
    .map((item, index) => (
      <MenuItem value={`${item._id}`} key={index}>
        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
      </MenuItem>
    ))

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <Fragment>
      <Form {...form}>
        <form
          action=''
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-1 flex-col gap-4'
        >
          <div className='w-full flex-1'>
            <div className='flex w-full items-center justify-center gap-20'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='flex w-full items-center gap-5 space-y-1'>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter product name'
                        {...field}
                        className='flex-1'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem className='flex w-full items-center gap-5 space-y-1'>
                    <FormLabel className='whitespace-nowrap'>
                      Product Type
                    </FormLabel>
                    <FormControl>
                      <Select
                        labelId='product-type-label'
                        {...field}
                        displayEmpty
                        defaultValue=''
                        sx={{ width: '100%', height: 30 }}
                      >
                        <MenuItem value='' disabled>
                          Select Product Type...
                        </MenuItem>
                        <MenuItem value='MIXTURE'>Mixture</MenuItem>
                        <MenuItem value='WHOLE'>Whole</MenuItem>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {form.watch('type') === 'MIXTURE' ? (
              <div className='my-5 flex items-center gap-4'>
                <GiCoolSpices size={20} />
                <span className='text-xl font-thin'>Ingredients</span>
              </div>
            ) : null}

            {form.watch('type') === 'MIXTURE' ? (
              <div className='ingredientsGrid w-full'>
                {form.watch('ingredients')?.map((item, index) => {
                  return (
                    <span
                      key={index}
                      className='flex w-full items-center justify-between rounded-2xl bg-stone-800 p-3'
                    >
                      <span className='text-white'>{item.name}</span>
                      <span
                        className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-stone-100'
                        onClick={() => {
                          if (item?._id) {
                            handleRemoveIngredient(item._id)
                          }
                        }}
                      >
                        <ImCross className='text-stone-800' size={10} />
                      </span>
                    </span>
                  )
                })}
                {addNewIngredient ? (
                  <span className='flex items-center gap-2'>
                    <Select
                      labelId='product-type-label'
                      displayEmpty
                      value={newIngredient || ''}
                      className='h-full w-3/4'
                      onChange={(e) => {
                        setNewIngredient(e.target.value as string)
                      }}
                    >
                      <MenuItem value='' disabled>
                        Add Ingredient
                      </MenuItem>
                      {menuItems}
                    </Select>
                    <span className='flex h-full flex-1 items-center justify-end gap-4 px-2'>
                      <FcCheckmark
                        size={30}
                        className='cursor-pointer'
                        onClick={handleAddNewIngredient}
                      />
                      <RxCross1
                        size={20}
                        className='cursor-pointer'
                        onClick={() => {
                          setAddNewIngredient(false)
                          setNewIngredient(null)
                        }}
                      />
                    </span>
                  </span>
                ) : null}
                {!addNewIngredient ? (
                  <span
                    className='flex w-full cursor-pointer items-center justify-start gap-5 rounded-2xl border border-stone-800 bg-stone-500/40 p-3'
                    onClick={() => setAddNewIngredient(true)}
                  >
                    <FaPlus color='#33333365' />
                    <span className='text-stone-800/75'>{`Add New`}</span>
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className='flex h-20 w-full items-center justify-end gap-5 border-t border-stone-500'>
            {data ? (
              <Button
                type='button'
                disabled={isSubmitting}
                className='rounded-xl bg-rose-900 px-5 py-6 text-base tracking-widest text-gray-300 hover:bg-rose-700'
                onClick={handleDelete}
              >
                Remove Product
              </Button>
            ) : null}
            <Button
              type='submit'
              disabled={isSubmitting}
              className='rounded-xl border border-gray-300 bg-transparent px-16 py-6 text-base tracking-widest text-gray-800 hover:bg-gray-300'
            >
              {toEdit ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </form>
      </Form>
    </Fragment>
  )
}

export default FormComponent
