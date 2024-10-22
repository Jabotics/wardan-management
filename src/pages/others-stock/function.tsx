import { Data } from './schema'

export const Material = ({ data }: { data: Data }) => {
  return <>{data?.material?.name}</>
}

export const Quantity = ({ data }: { data: Data }) => {
  return <>{`${data.qty?.toFixed(3)} ${data.unit}`}</>
}
