import EnhancedTable from '@/components/table'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createData, Data, headCells } from './schema'
import { useGetAllReceiptsQuery } from '@/store/actions/slices/receiptsSlice'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'
import { TableDataFilters } from '@/interfaces'
import { ImportContactsTableConfig } from './settings.constant'
import { useGetAllExportersQuery } from '@/store/actions/slices/exportersSlice'
import { useLocation } from 'react-router-dom'

const Assets = () => {
  const { t } = useTranslation()
  const pathname = useLocation();
  const preSelectedBuyer = pathname.search.split('=')[1]

  const [search, setSearch] = useState<string>('')
  const [filterValues, setFilterValues] = useState<{
    exportTo: string[]
  }>({
    exportTo: [],
  })

  useGetAllReceiptsQuery(
    {
      search: search.replace(/ /g, '') || null,
      buyer:
        filterValues.exportTo.length > 0
          ? JSON.stringify(filterValues.exportTo)
          : null,
    },
    { refetchOnMountOrArgChange: true }
  )
  const { receipts } = useAppSelector((state: RootState) => state.receipts)

  useGetAllExportersQuery({})
  const { exporters } = useAppSelector((state: RootState) => state.exporters)

  const rows = useMemo(
    () =>
      receipts?.map((item) =>
        createData(
          item._id,
          item.buyer,
          item.amount,
          item.remarks,
          item.createdAt
        )
      ) || [],
    [receipts]
  )

  const handleFilterChange = (label: string, value: string[]) => {
    setFilterValues((prev) => ({
      ...prev,
      [String(label.charAt(0).toLowerCase() + label.substring(1)).replace(
        / /g,
        ''
      )]: value,
    }))
  }

  const dataFilters: TableDataFilters = useMemo(
    () => ({
      searchBy: {
        placeholderText: 'Search for Payment...',
        actions: [search, setSearch],
      },
      filters: [
        {
          label: 'Export To',
          type: 'object',
          options: exporters
            ? exporters.map((i) => ({ [i._id]: i.name })) 
            : [],
          value: filterValues.exportTo,
        },
      ],
      handleFilterChange
    }),
    [exporters, filterValues.exportTo, search]
  )

  useEffect(() => {
    if (preSelectedBuyer !== undefined) {
      setFilterValues((p) => ({
        ...p,
        exportTo: [preSelectedBuyer]
      }))
    } else {
      setFilterValues((p) => ({
        ...p,
        exportTo: []
      }))
    }
  }, [preSelectedBuyer])

  return (
    <EnhancedTable<Data>
      data={rows}
      headCells={headCells}
      title={t('Receipt')}
      dense
      rowHeight={65}
      config={ImportContactsTableConfig}
      dataFilters={{ ...dataFilters }}
    />
  )
}

export default Assets
