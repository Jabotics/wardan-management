import { ISellItem } from '@/interfaces'

const ModifySellItems = ({
  setOpen,
  data,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  data?: ISellItem
}) => {

  console.log(data)

  return <div className='m-auto'>ModifySellItems</div>
}

export default ModifySellItems
