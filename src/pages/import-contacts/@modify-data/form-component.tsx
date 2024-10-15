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
// import { toast } from 'sonner'
import {
  Fragment,
  // useEffect,
  // useState
} from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GSTValidation } from '@/lib/utils'
import {
  useAddImporterMutation,
  useEditImporterMutation,
} from '@/store/actions/slices/importersSlice'
import { Button } from '@/components/ui/button'

const FormComponent = ({
  data,
  isSubmitting,
  // toEdit,
  setOpen,
  setIsSubmitting,
}: {
  toEdit: boolean
  isSubmitting: boolean
  data?: ISeller
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [Add] = useAddImporterMutation()
  const [Update] = useEditImporterMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? '',
      address: data?.address ?? '',
      gst_number: data?.gst_number ?? '',
      phone: data?.phone ?? '',
    },
  })
  // console.log(setIsSubmitting)

  async function handleModifyProducts(formData: z.infer<typeof formSchema>) {
    // setIsSubmitting(true)

    const payload: {
      name: string
      address: string
      gst_number: string
      _id?: string
      phone: string
    } = {
      name: formData.name,
      address: formData.address,
      gst_number: formData.gst_number,
      phone: formData.phone,
    }

    try {
      // setIsSubmitting(true)
      if (data) {
        payload._id = data._id

        const res = await Update(payload as ISeller).unwrap()
        if (res.status === 'fail') throw new Error(res.message)
      } else {
        const res = await Add(payload).unwrap()
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
    <Fragment>
      <Form {...form}>
        <form
          action=''
          onSubmit={form.handleSubmit(handleModifyProducts)}
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
                <FormItem className='flex h-32 w-full flex-col items-start gap-1 space-y-1'>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
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
