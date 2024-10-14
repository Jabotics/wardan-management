import { Data } from './schema'

export const Product = ({ data }: { data: Data }) => {
  return <>{data?.product?.name}</>
}

// export const Quantity = ({ data }: { data: Data }) => {
//   return <></>
// }
