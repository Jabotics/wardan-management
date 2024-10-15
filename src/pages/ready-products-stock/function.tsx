import { Data } from './schema'

export const Product = ({ data }: { data: Data }) => {
  return <>{data?.product?.name}</>
}

export const Quantity = ({ data }: { data: Data }) => {
  return <>{`${data.qty} ${data.unit} (${data.count} pieces)`}</>
}

export const Variant = ({ data }: { data: Data }) => {
  return <span className='bg-gray-400 px-3 py-1 rounded-md'>{`${data.variant.name}`}</span>
}

export const Price = ({ data }: { data: Data }) => {
  return <span className='text-lg'>{`₹${data.mrp}`}</span>
}
