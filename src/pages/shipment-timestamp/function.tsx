import { Data } from './schema'

export const Exporter = ({ data }: { data: Data }) => {
  return <>{data?.sellId?.buyer?.name}</>
}

export const Product = ({ data }: { data: Data }) => {
  return <>{data?.product?.name} ({data?.variant?.name})</>
}

export const Quantity = ({ data }: { data: Data }) => {
  return <span className='text-amber-700'>{`${Math.round(Number(data.qty))} kg`}</span>
}

export const Price = ({ data }: { data: Data }) => {
  return <span className='text-green-600'>₹ {data?.amount}</span>
}
