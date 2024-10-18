import { Data } from './schema'

export const Product = ({ data }: { data: Data }) => {
  return <>{data?.product?.name}</>
}

export const Variant = ({ data }: { data: Data }) => {
  return <>{data?.variant?.name}</>
}

export const Quantity = ({ data }: { data: Data }) => {
  console.log(data)
  return <>{`${data.qty} ${data.unit} (${data.count} pcs)`}</>
}
