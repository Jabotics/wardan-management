import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { RootState } from '@/store'
import { useGetReadyProductStockQuery } from '@/store/actions/slices/readyProductStockSlice'
import { useAppSelector } from '@/store/hooks'
import { useEffect, useState } from 'react'
import type { CarouselApi } from '@/components/ui/carousel'
import { useGetProductWiseSellQuery } from '@/store/actions/slices/analysisSlice'

const Profit = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  )
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null
  )
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)

  useGetProductWiseSellQuery(
    {
      productId: selectedProductId || '',
      variantId: selectedVariantId || '',
    },
    {
      skip: !selectedProductId || !selectedVariantId,
      refetchOnMountOrArgChange: true,
    }
  )

  const { sales, remaining_stock } = useAppSelector((state: RootState) => state.analysis)

  useGetReadyProductStockQuery({})
  const { readyProducts } = useAppSelector(
    (state: RootState) => state.readyProducts
  )

  useEffect(() => {
    if (readyProducts.length > 0) {
      setSelectedProductId(readyProducts[0]?.product?._id)
      setSelectedVariantId(readyProducts[0]?.variant?._id)
    }
  }, [readyProducts])

  useEffect(() => {
    if (carouselApi) {
      const onSelect = () => {
        const index = carouselApi.selectedScrollSnap()
        setSelectedProductId(readyProducts[index]?.product?._id)
        setSelectedVariantId(readyProducts[index]?.variant?._id)
      }

      carouselApi.on('select', onSelect)

      return () => {
        carouselApi.off('select', onSelect)
      }
    }
  }, [carouselApi, readyProducts])

  return (
    <div className='flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl border-[1px] border-primary/65 bg-primary/5'>
      <div className='relative flex h-8 w-full items-center justify-center border-b border-primary text-xs'>
        Analysis
      </div>
      <div className='flex w-full flex-1 items-center justify-center gap-2'>
        <div className='flex h-full w-[46%] flex-col items-center justify-start'>
          Sale
          <div className='flex h-full w-full flex-col px-5'>
            <p className='text-[10px] text-gray-400'>Quantity</p>
            <p className='line-clamp-1 whitespace-nowrap text-green-600'>
              {sales?.total_qty ?? 0} pcs
            </p>
          </div>
          <div className='flex h-full w-full flex-col px-5'>
            <p className='text-[10px] text-gray-400'>Amount</p>
            <p className='text-green-600'>₹ {sales?.total_amount ?? 0}</p>
          </div>
        </div>
        <div className='h-full w-px bg-primary/15'></div>
        <div className='flex h-full w-[46%] flex-col items-center justify-start'>
          Stock
          <div className='flex h-full w-full flex-col px-5'>
            <p className='text-[10px] text-gray-400'>Quantity</p>
            <p className='line-clamp-1 whitespace-nowrap text-green-600'>
              {remaining_stock?.count ?? 0} pcs
            </p>
          </div>
          <div className='flex h-full w-full flex-col px-5'>
            <p className='text-[10px] text-gray-400'>Total CTC</p>
            <p className='text-green-600'>₹ {Number(remaining_stock?.c2c * remaining_stock?.count) ?? 0}</p>
          </div>
        </div>
      </div>
      <div className='relative h-24 w-full overflow-hidden border-t border-primary/15'>
        <Carousel setApi={setCarouselApi}>
          <CarouselContent className='h-24'>
            {readyProducts?.map((item) => (
              <CarouselItem key={item._id}>
                <div className='flex h-full flex-col items-center justify-center p-1 text-sm'>
                  <p>{item.product.name}</p>
                  <p className='rounded-md bg-gray-300 px-3 py-1'>
                    {item.variant.name}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='absolute left-2' />
          <CarouselNext className='absolute right-2' />
        </Carousel>
      </div>
    </div>
  )
}

export default Profit
