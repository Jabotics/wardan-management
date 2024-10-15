import { transformString } from '@/lib/utils';
import { setWastageTableShow } from '@/store/actions/slices/appSlice';
import { useGetAllWastageQuery } from '@/store/actions/slices/wastageSlice';
import { useAppDispatch } from '@/store/hooks';
import { forwardRef, MutableRefObject } from 'react';

interface WastageCategoryProps {
  setShouldScroll: (shouldScroll: boolean) => void;
}

const WastageCategory = forwardRef<HTMLDivElement, WastageCategoryProps>(
  ({ setShouldScroll }, ref) => {
    const dispatch = useAppDispatch();

    useGetAllWastageQuery({});

    const handleCheckDetailsClick = (item: string) => {
      dispatch(setWastageTableShow(item as 'RAW_MATERIAL'));
      setShouldScroll(true);

      if (ref && (ref as MutableRefObject<HTMLDivElement | null>).current) {
        (ref as MutableRefObject<HTMLDivElement | null>).current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    return (
      <div className='w-full flex-1 py-5'>
          <div className='flex h-full items-center gap-3 overflow-x-auto overflow-y-hidden px-3'>
            {['RAW_MATERIAL', 'PACKAGING_PRODUCT'].map((item, index) => (
              <div key={index} className='flex h-full w-60 shrink-0 flex-col items-center justify-center rounded-3xl border border-indigo-300 bg-indigo-200'>
                <h4 className='text-xl'>{transformString(item)}</h4>
                <p
                  className='cursor-pointer text-sm text-gray-500 underline'
                  onClick={() => handleCheckDetailsClick(item)}
                >
                  Check all details
                </p>
              </div>
            ))}
          </div>
      </div>
    );
  }
);

export default WastageCategory;
