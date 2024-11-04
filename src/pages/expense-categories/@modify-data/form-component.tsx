import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
;('@/interfaces')
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { formSchema } from './form-schema'
import { Fragment } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/store/hooks'
import { isErrorWithMessage } from '@/lib/utils'
import { toast } from 'sonner'
import {
  addExpenseCategory,
  updateExpenseCategory,
  useAddExpenseCategoryMutation,
  useUpdateExpenseCategoryMutation,
} from '@/store/actions/slices/expenseSlice'
import { IExpenseCategory } from '@/interfaces'

const FormComponent = ({
  data,
  isSubmitting,
  setOpen,
  setIsSubmitting,
}: {
  data?: IExpenseCategory
  toEdit: boolean
  isSubmitting: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const dispatch = useAppDispatch()

  const [Add] = useAddExpenseCategoryMutation()
  const [Update] = useUpdateExpenseCategoryMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? '',
    },
  })

  async function handleModifyProducts(formData: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    const payload: {
      name: string
    } = {
      name: formData.name,
    }

    try {
      if (data) {
        const res = await Update({
          ...payload,
          _id: data?._id ?? '',
        }).unwrap()

        dispatch(
          updateExpenseCategory({
            ...payload,
            _id: data?._id ?? '',
          })
        )

        toast(res.message)
      } else {
        const res = await Add(payload).unwrap()

        dispatch(
          addExpenseCategory({
            ...payload,
            _id: res?.data?._id,
          })
        )

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
          <div className='flex h-fit w-full flex-col gap-4'>
            <FormField
              control={form.control}
              name={`name`}
              render={({ field }) => (
                <FormItem className='mb-5 flex w-full flex-col'>
                  <FormLabel className='mt-2'>Category:</FormLabel>
                  <FormControl>
                    <div className='flex w-full items-center gap-1'>
                      <Input
                        placeholder='Category Name'
                        {...field}
                        className='h-10 w-full border-amber-950/25'
                        onChange={(e) => {
                          field.onChange(e.target.value)
                        }}
                        autoComplete='off'
                      />
                    </div>
                  </FormControl>
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
