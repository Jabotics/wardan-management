import { Data } from './schema'

export const Product = ({ data }: { data: Data }) => {
  return <>{data?.product?.name}</>
}

export const Variant = ({ data }: { data: Data }) => {
  return <span className='bg-gray-300 px-3 py-1 rounded-md'>{data?.variant?.name}</span>
}

export const Quantity = ({ data }: { data: Data }) => {
  return <span className='text-green-700'>{`${Math.round(Number(data.qty))} ${data.unit}`}</span>
}
