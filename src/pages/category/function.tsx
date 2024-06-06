import { Button } from "@/components/custom/button"
import { ICategory } from "@/interfaces"

export const IsCategoryPublish = ({ data }: { data: ICategory }) => {
  return (
    <Button
      variant={'ghost'}
      className={`${data.is_active ? 'bg-teal-200 text-teal-900' : 'bg-gray-400 text-gray-900'} h-5 w-24 text-xs`}
      disabled
    >
      {data.is_active ? 'Published' : 'Draft'}
    </Button>
  )
}

export const categoryExpand = ({ data }: { data: ICategory }) => {
  return (
    <div>{data.id}</div>
  )
}