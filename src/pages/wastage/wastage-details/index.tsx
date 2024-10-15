import EnhancedTable from '@/components/table'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createData, Data, headCells } from './schema'
import { useGetAllWastageQuery } from '@/store/actions/slices/wastageSlice'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'
import { TableDataFilters } from '@/interfaces'
// import { ImportContactsTableConfig } from './settings.constant'

const RawMaterialStocks = () => {
  const { t } = useTranslation()

  const [search, setSearch] = useState<string>('')

  const { wastageTablesShow } = useAppSelector((state: RootState) => state.app)

  const { isLoading } = useGetAllWastageQuery({
    category: wastageTablesShow
  }, {
    skip: !wastageTablesShow,
    refetchOnMountOrArgChange: true
  })
  const { rawMaterialWastage, packagingMaterialWastage } = useAppSelector(
    (state: RootState) => state.wastage
  )

  const rows = useMemo(() => {
    const wastageData =
      wastageTablesShow === 'RAW_MATERIAL'
        ? rawMaterialWastage
        : packagingMaterialWastage;
  
    return !isLoading && Array.isArray(wastageData) 
      ? wastageData.map((item) => createData(item._id, item.category, item.items, item.createdAt))
      : []; 
  }, [isLoading, packagingMaterialWastage, rawMaterialWastage, wastageTablesShow]);

  const dataFilters: TableDataFilters = useMemo(
    () => ({
      searchBy: {
        placeholderText: 'Search Wastage...',
        actions: [search, setSearch],
      },
    }),
    [search]
  )

  return (
    <EnhancedTable<Data>
      data={rows}
      headCells={headCells}
      title={
        wastageTablesShow === 'RAW_MATERIAL'
          ? t('Raw Material Wastage')
          : t('Packaging Product Wastage')
      }
      dense
      rowHeight={65}
      // config={ImportContactsTableConfig}
      dataFilters={{ ...dataFilters }}
    />
  )
}

export default RawMaterialStocks
