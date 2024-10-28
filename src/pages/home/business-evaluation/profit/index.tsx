import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const Profit = () => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl border-[1px] border-primary/65 bg-primary/5'>
      <div className='flex h-8 w-full items-center justify-center border-b border-primary text-xs'>
        Analysis
      </div>
      <div className='flex w-full flex-1 items-center justify-center gap-2'>
        <div className='flex h-full w-1/2 flex-col items-center justify-start'>
          Sale
        </div>
        <div className='h-full w-px bg-primary/15'></div>
        <div className='flex h-full w-1/2 flex-col items-center justify-start'>
          Stock
        </div>
      </div>
      <div className='h-24 w-full overflow-hidden border-t border-primary/15 relative'>
        <Carousel className='w-full max-w-xs'>
          <CarouselContent className='h-24'>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className='h-full p-1 flex items-center justify-center'>{index}</div>
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
