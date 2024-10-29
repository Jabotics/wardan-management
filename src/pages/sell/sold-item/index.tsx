import { useEffect, useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import {
  useGetSellItemsQuery,
  useRemoveSellItemMutation,
} from '@/store/actions/slices/exportSlice'
import ModifySellItems from './modify-sell-item'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { isErrorWithMessage } from '@/lib/utils'

const SoldItemsComponent = ({
  sellId,
  setClose,
  totalAmount,
  totalQty,
}: {
  sellId: string
  setClose: React.Dispatch<React.SetStateAction<boolean>>
  totalAmount?: number
  totalQty?: number
}) => {
  const [text, setText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null)

  const [Delete] = useRemoveSellItemMutation()
  const { data, isLoading, isError } = useGetSellItemsQuery(
    { sellId },
    { skip: !sellId, refetchOnMountOrArgChange: true }
  )
  const allItemsPurchased = data?.data || []
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  const handleDeleteSellItems = async (toDeleteItemId: string) => {
    try {
      if (toDeleteItemId) {
        const res = await Delete({ id: toDeleteItemId }).unwrap()

        toast(res.message)
      }

      setDeletingItemId(null)
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

  useEffect(() => {
    if (isError) {
      const handleError = setTimeout(() => {
        setClose(false)
      }, 1000)

      return () => clearTimeout(handleError)
    }
  }, [isError, setClose])

  if (isLoading) {
    return <>Loading....</>
  }
  if (isError) {
    return <>Error in fetching</>
  }

  return (
    <div className='flex w-full flex-1 flex-col gap-3 overflow-y-auto overflow-x-hidden'>
      <div
        onClick={() => setClose(false)}
        className='absolute right-5 top-5 cursor-pointer'
      >
        <Cross2Icon className='h-4 w-4' />
      </div>
      {allItemsPurchased?.length > 0
        ? allItemsPurchased.map((item) => {
            const variantName = item?.variant?.name
            const weight = variantName ? parseInt(variantName) : 0
            const netWeight = parseFloat(
              ((weight / 1000) * Number(item?.qty)).toPrecision(3)
            )

            return (
              <div
                className='flex h-24 w-full flex-col bg-black/10'
                key={item._id} // Use a unique key based on item ID
              >
                <div className='flex w-full flex-1 items-center justify-between px-3 py-2'>
                  <div className='flex h-full w-full flex-col items-start justify-start'>
                    <div className='flex flex-col items-start text-lg'>
                      <p>{item?.product?.name + ' Powder'}</p>
                      <p className='text-xs tracking-widest'>
                        {item?.variant?.name} ({item?.qty})
                      </p>
                    </div>
                  </div>
                  <div className='whitespace-nowrap'>{`${netWeight} kg`}</div>
                </div>
                <div className='flex h-10 w-full items-center justify-between border-t-2 border-dashed border-white px-3'>
                  <div className='font-mono'>{`₹ ${item?.amount} (C.T.C: ₹ ${item?.c2c_amount?.toFixed(2)})`}</div>
                  <div className='flex h-full w-1/4 items-center justify-end gap-3 text-xs'>
                    <Drawer open={editingItemId === item._id}>
                      <DrawerTrigger asChild>
                        <div
                          className='cursor-pointer underline hover:text-gray-600'
                          onClick={() => setEditingItemId(item._id)}
                        >
                          Edit
                        </div>
                      </DrawerTrigger>

                      <DrawerContent className='absolute h-[50%] w-full bg-white'>
                        <DrawerTitle className='text-center'>
                          Edit Sold Item
                        </DrawerTitle>
                        <DrawerDescription className='sr-only'>
                          Edit Sold Item
                        </DrawerDescription>

                        <ModifySellItems
                          setOpen={() => setEditingItemId(null)}
                          data={item}
                          totalAmount={totalAmount}
                          totalQty={totalQty}
                        />
                      </DrawerContent>
                    </Drawer>
                    <Dialog open={deletingItemId === item._id}>
                      <DialogTrigger asChild>
                        <div
                          className='cursor-pointer underline hover:text-rose-900'
                          onClick={() => {
                            setDeletingItemId(item._id)
                          }}
                        >
                          Delete
                        </div>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogTitle>{'Delete Details'}</DialogTitle>
                        <Separator />
                        <DialogDescription className='sr-only'>
                          Action dialog
                        </DialogDescription>

                        <span className='mb-5 flex flex-col gap-1'>
                          <span className='text-lg'>
                            Are you sure, you want to delete this record?
                          </span>
                          <span className='text-sm text-gray-500'>
                            If you are sure, type 'delete' then Confirm else
                            Cancel.
                          </span>
                          <Input
                            value={text}
                            onChange={(e) => {
                              setText(e.target.value)
                            }}
                            className={`${text.trim() === 'delete' ? 'border-black' : 'border-red-500'} h-6 w-fit outline-none`}
                            style={{
                              boxShadow: 'none',
                              outline: 'none',
                            }}
                          />
                        </span>

                        <div className='flex items-center gap-2'>
                          <DialogClose
                            onClick={() => setDeletingItemId(null)}
                            className={`w-full text-sm text-gray-400`}
                            disabled={isSubmitting}
                          >
                            Cancel
                          </DialogClose>
                          <DialogClose
                            onClick={() => {
                              if (text === 'delete') {
                                handleDeleteSellItems(item._id)
                              }

                              setText('')
                            }}
                            className={`inline-block w-full bg-gray-800 py-2 text-sm text-white`}
                            disabled={isSubmitting}
                          >
                            Confirm
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            )
          })
        : null}
    </div>
  )
}

export default SoldItemsComponent
