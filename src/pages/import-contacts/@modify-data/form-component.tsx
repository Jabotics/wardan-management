import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ISeller } from '@/interfaces'
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
import { Fragment, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GSTValidation } from '@/lib/utils'
import {
  useAddImporterMutation,
  useEditImporterMutation,
  useRemoveImporterMutation,
} from '@/store/actions/slices/importersSlice'
import { Button } from '@/components/ui/button'

const FormComponent = ({
  data,
  toEdit,
  setOpen,
}: {
  toEdit: boolean
  data?: ISeller
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [Add] = useAddImporterMutation()
  const [Update] = useEditImporterMutation()
  const [Delete] = useRemoveImporterMutation()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [toStartEdit, setToStartEdit] = useState<boolean>(data ? true : false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? '',
      address: data?.address ?? '',
      gst_number: data?.gst_number ?? '',
      phone: data?.phone ?? '',
    },
  })

  async function handleDelete() {
    if (data && data._id) {
      setIsSubmitting(true)
      try {
        const res = await Delete({ id: data._id }).unwrap()

        if (res.status === 'fail') throw new Error(res.message)
      } catch (error) {
        console.log(error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  async function handleModifyProducts(formData: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // const payload: {
    //   name: string
    //   type: 'WHOLE' | 'MIXTURE'
    //   ingredients?: string[]
    //   _id?: string
    //   is_active?: boolean
    // } = {
    //   name: formData.name,
    //   type: formData.type as 'WHOLE' | 'MIXTURE',
    //   ingredients: formData.ingredients?.map((ingredient) => ingredient._id),
    // }

    // if (formData.type === 'WHOLE') delete payload.ingredients

    try {
      // if (data) {
      //   payload._id = data[0]._id
      //   payload.is_active = data[0].is_active

      //   const res = await Update(payload).unwrap()
      //   if (res.status === 'fail') throw new Error(res.message)
      // } else {
      //   console.log(payload)
      //   const res = await Add(payload).unwrap()
      //   if (res.status === 'fail') throw new Error(res.message)
      // }

      console.log('first')
      setOpen(false)
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

  // useEffect(() => {}, [data, form])

  console.log(toStartEdit)
  return (
    <Fragment>
      <Form {...form}>
        <form
          action=''
          onSubmit={form.handleSubmit(onSubmit)}
          className='h-full w-full'
        >
          <div className='flex w-full flex-1 flex-col gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='mt-5 flex w-full flex-col items-start gap-1 space-y-1'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={toStartEdit}
                      placeholder='Enter name'
                      {...field}
                      className='h-10'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem className='flex w-full h-32 flex-col items-start gap-1 space-y-1'>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={toStartEdit}
                      placeholder='Enter Address'
                      {...field}
                      className='h-10 max-h-32'
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='gst_number'
              rules={{ validate: GSTValidation }}
              render={({ field }) => (
                <FormItem className='flex w-full flex-col items-start gap-1 space-y-1'>
                  <FormLabel>GST Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={toStartEdit}
                      placeholder='Enter GST Number'
                      {...field}
                      maxLength={15}
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase()

                        if (/^[A-Z0-9]*$/.test(value) && value.length <= 15) {
                          field.onChange(value)
                        }
                      }}
                      className='h-10'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem className='flex w-full flex-col items-start gap-1 space-y-1'>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={toStartEdit}
                      type='number'
                      placeholder='Enter phone number'
                      {...field}
                      maxLength={10}
                      onChange={(e) => {
                        const value = e.target.value
                        if (String(value).length <= 10) {
                          field.onChange(value)
                        }
                      }}
                      className='h-10'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            className='h-10 w-full mt-5 rounded-xl bg-black text-gray-200 hover:bg-black/75'
            type='submit'
            onClick={() => {
              if (data) {
                setToStartEdit(false)
              }
            }}
          >
            {data ? !toStartEdit ? 'Submit' : 'Edit' : `Cancel`}
          </Button>
        </form>
      </Form>
    </Fragment>
  )
}

export default FormComponent
