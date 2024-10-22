import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { IOtherMaterial } from '@/interfaces'
import { RootState } from '@/store'
import { useGetOtherMaterialsQuery } from '@/store/actions/slices/otherMaterialsSlice'
import { useAppSelector } from '@/store/hooks'
import { Fragment, useState } from 'react'
import ModifyOtherMaterial from './modify-other-materials'

const AllOtherMaterials = () => {
  const { isLoading } = useGetOtherMaterialsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  )
  const { materials } = useAppSelector((state: RootState) => state.materials)

  const [selectedMaterial, setSelectedMaterial] =
    useState<IOtherMaterial | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      {!isLoading
        ? materials?.map((item, index) => {
            return (
              <Fragment key={index}>
                <Dialog open={open}>
                  <DialogTrigger asChild>
                    <div
                      key={index}
                      className='flex aspect-[2/1] h-3/5 cursor-pointer flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white/50 text-indigo-950 shadow-lg shadow-gray-100'
                      onClick={() => {
                        setOpen(true)
                        setSelectedMaterial(item)
                      }}
                    >
                      <p className='text-sm'>{item.name}</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className='h-fit w-[65vw] bg-white'>
                    {selectedMaterial ? (
                      <ModifyOtherMaterial
                        material={selectedMaterial}
                        setOpen={setOpen}
                      />
                    ) : null}
                  </DialogContent>
                </Dialog>
              </Fragment>
            )
          })
        : Array(5)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className='flex aspect-[2/1] h-3/5 flex-col items-center justify-center rounded-2xl bg-gray-300'
              >
                <div className='h-full w-full animate-pulse rounded-lg bg-gray-200' />
              </div>
            ))}
    </>
  )
}

export default AllOtherMaterials
