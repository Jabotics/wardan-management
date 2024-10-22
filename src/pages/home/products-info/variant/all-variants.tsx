import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { IVariant } from '@/interfaces'
import { RootState } from '@/store'
import { useGetAllVariantsQuery } from '@/store/actions/slices/variantsSlice'
import { useAppSelector } from '@/store/hooks'
import { Fragment, useState } from 'react'
import ModifyVariant from './modify-variant'
import { useGetReadyProductStockQuery } from '@/store/actions/slices/readyProductStockSlice'

const AllVariants = () => {
  const { isLoading } = useGetAllVariantsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  )
  const { variants } = useAppSelector((state: RootState) => state.variants)

  useGetReadyProductStockQuery({})
  const { readyProducts } = useAppSelector(
    (state: RootState) => state.readyProducts
  )

  const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      {!isLoading
        ? variants?.map((item, index) => {
            const totalProduct = readyProducts.filter(
              (i) => i.variant._id === item._id
            ).length
            return (
              <Fragment key={index}>
                <Dialog open={open}>
                  <DialogTrigger asChild>
                    <div
                      key={index}
                      className='flex aspect-[2/1] h-3/5 cursor-pointer flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white/50 text-indigo-950 shadow-lg shadow-gray-100'
                      onClick={() => {
                        setOpen(true)
                        setSelectedVariant(item)
                      }}
                    >
                      <p className='text-sm'>{item.name}</p>
                      <p className='text-xs text-gray-500'>
                        {totalProduct} Products
                      </p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className='h-fit w-[65vw] bg-white'>
                    {selectedVariant ? (
                      <ModifyVariant
                        variant={selectedVariant}
                        setOpen={setOpen}
                      />
                    ) : null}
                  </DialogContent>
                </Dialog>
              </Fragment>
            )
          })
        : Array(5)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className='flex aspect-[2/1] h-3/5 flex-col items-center justify-center rounded-2xl bg-gray-300'
              >
                <div className='h-full w-full animate-pulse rounded-lg bg-gray-200' />
              </div>
            ))}
    </>
  )
}

export default AllVariants
