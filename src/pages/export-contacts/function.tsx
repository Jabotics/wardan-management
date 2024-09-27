import { Data } from './schema'

export const Address = ({ data }: { data: Data }) => {
  return <div className='w-full h-full flex items-center justify-center'>
    <span className='w-[400px] text-xs'>{data.address}</span>
  </div>
}

export const GSTNumber = ({ data }: { data: Data }) => {
  return <>{data.gst_number}</>
}