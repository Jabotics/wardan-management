import { Data } from './schema'

export const Material = ({ data }: { data: Data }) => {
  return <>{data?.material?.name}</>
}

export const Quantity = ({ data }: { data: Data }) => {
  return <span className='text-green-700'>{`${Math.round(Number(data.qty))} ${data.unit}`}</span>
}
