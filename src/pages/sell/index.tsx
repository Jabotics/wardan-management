import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import EnhancedTable from '@/components/table'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'

import { createData, Data, headCells } from './schema'
import { TableDataFilters } from '@/interfaces'

import { ImportContactsTableConfig } from './settings.constant'
import { useGetAllExportersQuery } from '@/store/actions/slices/exportersSlice'
import { useGetAllSellsQuery } from '@/store/actions/slices/exportSlice'

const Purchase = () => {
  const { t } = useTranslation()

  const [search, setSearch] = useState<string>('')
  const [filterValues, setFilterValues] = useState<{
    category: string[],
    exportTo: string[]
  }>({
    category: [],
    exportTo: [],
  })

  useGetAllSellsQuery(
    {
      search: search.replace(/ /g, '') || null,
      // category:
      //   filterValues.category.length > 0
      //     ? JSON.stringify(filterValues.category)
      //     : null,
      buyer:
        filterValues.exportTo.length > 0
          ? JSON.stringify(filterValues.exportTo)
          : null,
    },
    { refetchOnMountOrArgChange: true }
  )
  const { sell } = useAppSelector((state: RootState) => state.sell)

  useGetAllExportersQuery({})
  const { exporters } = useAppSelector((state: RootState) => state.exporters)

  const rows = useMemo(
    () =>
      sell?.map((item) =>
        createData(
          item._id,
          item.buyer,
          item.total_qty,
          item.total_amount,
          item.createdAt,
          item.invoice_no,
        )
      ) || [],
    [sell]
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
        placeholderText: 'Search By Invoice...',
        actions: [search, setSearch],
      },
      filters: [
        // {
        //   label: 'Category',
        //   type: 'array',
        //   options: ['RAW_MATERIAL', 'PACKAGING_PRODUCT', 'OTHER'].map(
        //     (i) => ({ [i]: i })
        //   ),
        //   value: filterValues.category, // need to change to incorporate, id to pass in payload, value to show in select
        // },
        {
          label: 'Export To',
          type: 'object',
          options: exporters
            ? exporters.map((i) => ({ [i._id]: i.name })) 
            : [],
          value: filterValues.exportTo,
        },
      ],
      handleFilterChange,
    }),
    [search, filterValues.exportTo, exporters]
  )

  return (
    <EnhancedTable<Data>
      data={rows}
      headCells={headCells}
      title={t('Sell')}
      dense
      rowHeight={65}
      config={ImportContactsTableConfig}
      dataFilters={{ ...dataFilters, handleFilterChange }}
    />
  )
}

export default Purchase
