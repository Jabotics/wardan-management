import OtherMaterial from './other-material'
import PackagingMaterial from './packaging-material'
import RawMaterial from './raw-material'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { purchaseSchema } from '../form-schema'
import { Fragment, useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { IPurchase, ISeller } from '@/interfaces'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetAllImportersQuery } from '@/store/actions/slices/importersSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'
import {
  modifyPurchaseEntry,
  useUpdatePurchaseMutation,
} from '@/store/actions/slices/purchaseSlice'

const PurchaseEntry = ({
  category,
  setOpen,
  toEdit,
  data,
}: {
  category?: 'Raw Material' | 'Packaging Material' | 'Other'
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  toEdit: boolean
  data?: Partial<IPurchase>
}) => {
  const dispatch = useAppDispatch()

  const [Edit] = useUpdatePurchaseMutation()

  useGetAllImportersQuery({})
  const { importers } = useAppSelector((state: RootState) => state.importers)

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [toRedirect, setToRedirect] = useState<boolean>(false)

  const [selectedSeller, setSelectedSeller] = useState<ISeller | null>(null)

  const form = useForm<z.infer<typeof purchaseSchema>>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      category: data?.category ?? category,
      invoice_no: data?.invoice_no ?? '',
      seller: data?.seller?._id ?? '',
      transportation_charge: data?.transportation_charge ?? 0,
      unloading_charge: data?.unloading_charge ?? 0,
    },
  })

  async function handleModifyProducts(
    formData: z.infer<typeof purchaseSchema>
  ) {
    setIsSubmitting(true)

    const payload: Partial<IPurchase> = {
      category:
        formData.category === 'Raw Material'
          ? 'RAW_MATERIAL'
          : formData.category === 'Packaging Material'
            ? 'PACKAGING_PRODUCT'
            : 'OTHER',
      invoice_no: formData.invoice_no,
      seller: {
        _id: formData.seller,
        address: selectedSeller?.address ?? '',
        gst_number: selectedSeller?.gst_number ?? '',
        name: selectedSeller?.name ?? '',
      },
      transportation_charge: formData.transportation_charge,
      unloading_charge: formData.unloading_charge,
    }

    try {
      if (payload.seller?._id === '')
        throw new Error('Please Select one of your Importer')
      if (payload.invoice_no === '')
        throw new Error('Please Valid Invoice Number')

      if (toEdit) {
        const transportation_charge = formData?.transportation_charge || 0
        const unloading_charge = formData?.unloading_charge || 0

        const total_amount =
          (data?.invoice_amount ?? 0) + transportation_charge + unloading_charge

        const res = await Edit({
          _id: data?._id,
          invoice_no: formData.invoice_no,
          seller: formData.seller,
          invoice_amount: data?.invoice_amount ?? 0,
          transportation_charge: formData.transportation_charge,
          unloading_charge: formData.unloading_charge,
          total_amount,
        })

        if (res.error) throw new Error('Something went wrong')
        setOpen(false)
      } else {
        dispatch(modifyPurchaseEntry(payload))
        setToRedirect(true)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (toRedirect) {
    if (category === 'Packaging Material') {
      return <PackagingMaterial setOpen={setOpen} />
    }
    if (category === 'Raw Material') {
      return <RawMaterial setOpen={setOpen} />
    }
    if (category === 'Other') {
      return <OtherMaterial setOpen={setOpen} />
    }
  }

  return (
    <Fragment>
      {!toRedirect && (
        <Form {...form}>
          <form
            action=''
            onSubmit={form.handleSubmit(handleModifyProducts)}
            className='h-full w-full'
          >
            <div className='flex h-[85%] w-full flex-col gap-4 overflow-y-auto overflow-x-hidden pb-5 pl-1 pr-4'>
              <FormField
                control={form.control}
                name='invoice_no'
                render={({ field }) => (
                  <FormItem className='mt-5 flex w-full flex-col items-start gap-1 space-y-1'>
                    <FormLabel>Invoice Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter Invoice number'
                        {...field}
                        className='h-10'
                        type='text'
                        autoComplete='off'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='seller'
                render={({ field }) => (
                  <FormItem className='mt-5 flex w-full flex-col items-start gap-1 space-y-1'>
                    <FormLabel>Who did you buy it from?</FormLabel>
                    <FormControl>
                      {importers && importers.length > 0 ? (
                        <Select
                          value={field.value || ''}
                          onValueChange={(val) => {
                            field.onChange(val)

                            const seller = importers.find((i) => i._id === val)

                            seller && setSelectedSeller(seller)
                          }}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select a Seller' />
                          </SelectTrigger>
                          <SelectContent>
                            {importers.map((item, index) => {
                              return (
                                <SelectItem value={item._id} key={index}>
                                  {item.name}
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className='text-sm text-gray-400'>
                          TRY ADDING IMPORTERS: Error in Getting your Importers
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='transportation_charge'
                render={({ field }) => (
                  <FormItem className='mt-5 flex w-full flex-col items-start gap-1 space-y-1'>
                    <FormLabel>Transportation Charge (Rs)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter Transportation Charge'
                        {...field}
                        className='h-10'
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='unloading_charge'
                render={({ field }) => (
                  <FormItem className='mt-5 flex w-full flex-col items-start gap-1 space-y-1'>
                    <FormLabel>Unloading Charge (Rs)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter Unloading Charge'
                        {...field}
                        className='h-10'
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
              {data !== undefined ? 'Edit' : `Add`}
            </Button>
          </form>
        </Form>
      )}
    </Fragment>
  )
}

export default PurchaseEntry
