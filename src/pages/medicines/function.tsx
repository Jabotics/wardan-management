import { Button } from '@/components/custom/button'
import { Data } from './schema'

export const ProductName = ({ data }: { data: Data }) => {
  return (
    <div className='flex w-[25rem] items-center gap-3'>
      <img
        src={data.image}
        alt='product_image'
        className='h-full w-16 rounded-md'
      />
      <div>
        <div
          className='text-lg tracking-tight'
          style={{ fontFamily: 'RobotoR' }}
        >
          {data.name}
        </div>
        <div
          className='text-sm text-gray-400'
          style={{ fontFamily: 'RobotoBold' }}
        >
          {data.category}
        </div>
      </div>
    </div>
  )
}

export const IsPublish = ({ data }: { data: Data }) => {
  return (
    <Button
      variant={'ghost'}
      className={`${data.publish ? 'bg-teal-200 text-teal-900' : 'bg-gray-400 text-gray-900'} h-5 w-24 text-xs`}
      disabled
    >
      {data.publish ? 'Published' : 'Draft'}
    </Button>
  )
}

export const CreateAt = ({ data }: { data: Data }) => {
  return (
    <div className='flex flex-col items-start'>
      <div
        style={{
          fontFamily: 'RobotoR',
        }}
      >
        {data.create_at.split(',')[0]}
      </div>
      <div
        style={{
          fontFamily: 'RobotoR',
        }}
        className='text-xs text-gray-500'
      >
        {data.create_at.split(',')[1]}
      </div>
    </div>
  )
}

export const Price = ({ data }: { data: Data }) => {
  return (
    <div
      className='flex items-center justify-start text-lg text-gray-600'
      style={{
        fontFamily: 'Ubuntu',
      }}
    >
      &#x20B9;{data.price}
    </div>
  )
}

export const Stock = ({ data }: { data: Data }) => {
  const fillPercentage = (data.stock / data.total_stock) * 100
  const bgContainerColor =
    fillPercentage > 40
      ? 'bg-green-100'
      : fillPercentage !== 0
        ? 'bg-orange-100'
        : 'bg-red-100'
  const bgColor =
    fillPercentage > 40
      ? 'bg-green-400'
      : fillPercentage !== 0
        ? 'bg-orange-400'
        : 'bg-red-400'

  const stockText =
    fillPercentage > 40
      ? `${data.stock} in stock`
      : fillPercentage !== 0
        ? `${data.stock} low stock`
        : 'out of stock'

  return (
    <div className='flex items-center justify-start'>
      <div className='flex flex-col items-start'>
        <div className={`h-2 w-16 rounded-full ${bgContainerColor}`}>
          <div
            className={`h-full ${bgColor} rounded-full`}
            style={{ width: `${fillPercentage}%` }}
          />
        </div>
        <div
          className='mt-2 text-[10px] font-semibold tracking-wider text-gray-500'
          style={{
            fontFamily: 'RobotoL',
          }}
        >
          {stockText}
        </div>
      </div>
    </div>
  )
}
