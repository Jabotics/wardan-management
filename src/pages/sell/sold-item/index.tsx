import { useEffect, useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import {
  useGetSellItemsQuery,
  useRemoveSellItemMutation,
} from '@/store/actions/slices/exportSlice'
import ModifySellItems from './modify-sell-item'

const SoldItemsComponent = ({
  sellId,
  setClose,
  totalAmount,
  totalQty
}: {
  sellId: string
  setClose: React.Dispatch<React.SetStateAction<boolean>>
  totalAmount?: number
  totalQty?: number
}) => {
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
        await Delete({ id: toDeleteItemId })
      }
    } catch (error) {
      console.log(error)
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
            const netWeight = parseFloat(((weight / 1000) * Number(item?.qty)).toPrecision(3))

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
                  <div className='font-mono'>{`₹ ${item?.amount}`}</div>
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
                        <ModifySellItems
                          setOpen={() => setEditingItemId(null)}
                          data={item}
                          totalAmount={totalAmount}
                          totalQty={totalQty}
                        />
                      </DrawerContent>
                    </Drawer>
                    <div
                      className='cursor-pointer underline hover:text-rose-900'
                      onClick={() => {
                        handleDeleteSellItems(item._id)
                      }}
                    >
                      Delete
                    </div>
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
