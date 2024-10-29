/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { purchaseItemsSchemaforOther } from '../../form-schema'
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
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'
import { useAddPurchaseMutation } from '@/store/actions/slices/purchaseSlice'
import { useGetOtherMaterialsQuery } from '@/store/actions/slices/otherMaterialsSlice'
import { toast } from 'sonner'
import { isErrorWithMessage } from '@/lib/utils'

const OtherMaterial = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  useGetOtherMaterialsQuery({})
  const { materials } = useAppSelector((state: RootState) => state.materials)

  const [Add] = useAddPurchaseMutation()

  const { purchaseInfo } = useAppSelector((state: RootState) => state.purchase)

  const form = useForm<z.infer<typeof purchaseItemsSchemaforOther>>({
    resolver: zodResolver(purchaseItemsSchemaforOther),
    defaultValues: {
      purchaseItems: [{ material: '', unit: '', qty: 0, amount: 0 }],
    },
  })

  const { control, handleSubmit } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'purchaseItems',
  })

  const onSubmit = async (
    formData: z.infer<typeof purchaseItemsSchemaforOther>
  ) => {
    try {
      const processedData = {
        ...formData,
        purchaseItems: formData.purchaseItems.map((item) => ({
          ...item,
          qty: Number(item.qty),
          amount: Number(item.amount),
        })),
      }
      const transportation_charge = purchaseInfo?.transportation_charge || 0
      const unloading_charge = purchaseInfo?.unloading_charge || 0

      const invoice_amount = processedData.purchaseItems.reduce(
        (total, item) => total + item.amount,
        0
      )

      const total_amount =
        invoice_amount + transportation_charge + unloading_charge

      const res = await Add({
        ...purchaseInfo,
        invoice_amount,
        total_amount,
        seller: purchaseInfo?.seller?._id || '',
        items: processedData.purchaseItems,
      }).unwrap()

      toast(res.message)
      setOpen(false)
    } catch (error) {
      if (isErrorWithMessage(error)) {
        toast(error.data.message);
      } else {
        toast('An unexpected error occurred');
      }
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
              name={`purchaseItems.${index}.material`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Material</FormLabel>
                  <FormControl>
                    {materials && materials.length > 0 ? (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className='h-10 w-full border-amber-950/25'>
                          <SelectValue placeholder='Select a Unit' />
                        </SelectTrigger>
                        <SelectContent>
                          {materials.map((item, index) => {
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
                        TRY ADDING MATERIAL: Error in getting your other materials
                      </div>
                    )}
                  </FormControl>
                </FormItem>
              )}
            />

            <div className='flex w-full items-center gap-2'>
              <FormField
                control={control}
                name={`purchaseItems.${index}.qty`}
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
                name={`purchaseItems.${index}.unit`}
                render={({ field }) => (
                  <FormItem className='w-1/3'>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className='h-10 w-full border-amber-950/25'>
                          <SelectValue placeholder='Select a Unit' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='kg'>kg</SelectItem>
                          {/* <SelectItem value='gms'>gms</SelectItem>
                          <SelectItem value='ton'>ton</SelectItem>
                          <SelectItem value='pcs'>pcs</SelectItem> */}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name={`purchaseItems.${index}.amount`}
              render={({ field }) => (
                <FormItem>
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
                        if (field.value === null || field.value === undefined) {
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
            onClick={() => append({ material: '', unit: '', qty: 0, amount: 0 })}
            className='w-full text-black'
          >
            Add Invoice
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

export default OtherMaterial
