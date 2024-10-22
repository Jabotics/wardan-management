import { Data } from './schema'

export const Product = ({ data }: { data: Data }) => {
  return <>{data?.product?.name}</>
}

export const Variant = ({ data }: { data: Data }) => {
  return <>{data?.variant?.name}</>
}

export const Quantity = ({ data }: { data: Data }) => {
  return <>{`${data.qty?.toFixed(3)} ${data.unit}`}</>
}
