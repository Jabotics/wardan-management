import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import EnhancedTable from '@/components/table'
import { useGetAllImportersQuery } from '@/store/actions/slices/importersSlice'
import { useAppSelector } from '@/store/hooks'
import { useGetPurchaseEntryQuery } from '@/store/actions/slices/purchaseSlice'
import { RootState } from '@/store'

import { createData, Data, headCells } from './schema'
import { TableDataFilters } from '@/interfaces'

import { ImportContactsTableConfig } from './settings.constant'

const Purchase = () => {
  const { t } = useTranslation()

  const [search, setSearch] = useState<string>('')
  const [filterValues, setFilterValues] = useState<{
    category: string[],
    importFrom: string[]
  }>({
    category: [],
    importFrom: [],
  })

  useGetPurchaseEntryQuery(
    {
      search: search.replace(/ /g, '') || null,
      category:
        filterValues.category.length > 0
          ? JSON.stringify(filterValues.category)
          : null,
      seller:
        filterValues.importFrom.length > 0
          ? JSON.stringify(filterValues.importFrom)
          : null,
    },
    { refetchOnMountOrArgChange: true }
  )
  const { allPurchase } = useAppSelector((state: RootState) => state.purchase)

  useGetAllImportersQuery({})
  const { importers } = useAppSelector((state: RootState) => state.importers)

  const rows = useMemo(
    () =>
      allPurchase?.map((item) =>
        createData(
          item._id,
          item.invoice_no,
          item.seller,
          item.category,
          item.invoice_amount,
          item.transportation_charge,
          item.unloading_charge,
          item.total_amount,
          item.createdAt,
          item.invoice_url
        )
      ) || [],
    [allPurchase]
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
        {
          label: 'Category',
          type: 'array',
          options: ['RAW_MATERIAL', 'PACKAGING_PRODUCT', 'OTHER'].map(
            (i) => ({ [i]: i })
          ),
          value: filterValues.category, // need to change to incorporate, id to pass in payload, value to show in select
        },
        {
          label: 'Import From',
          type: 'object',
          options: importers
            ? importers.map((i) => ({ [i._id]: i.name })) 
            : [],
          value: filterValues.importFrom,
        },
      ],
      handleFilterChange,
    }),
    [search, filterValues.category, filterValues.importFrom, importers]
  )

  return (
    <EnhancedTable<Data>
      data={rows}
      headCells={headCells}
      title={t('Purchase')}
      dense
      rowHeight={65}
      config={ImportContactsTableConfig}
      dataFilters={{ ...dataFilters, handleFilterChange }}
    />
  )
}

export default Purchase
