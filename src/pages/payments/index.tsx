import EnhancedTable from '@/components/table'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createData, Data, headCells } from './schema'
import { useGetAllPaymentsQuery } from '@/store/actions/slices/paymentSlice'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'
import { TableDataFilters } from '@/interfaces'
import { ImportContactsTableConfig } from './settings.constant'
import { useGetAllImportersQuery } from '@/store/actions/slices/importersSlice'
import { useLocation } from 'react-router-dom'

const Assets = () => {
  const { t } = useTranslation()
  const pathname = useLocation();
  const preSelectedSeller = pathname.search.split('=')[1]

  const [search, setSearch] = useState<string>('')
  const [filterValues, setFilterValues] = useState<{
    importFrom: string[]
  }>({
    importFrom: [],
  })

  useGetAllPaymentsQuery(
    {
      search: search.replace(/ /g, '') || null,
      seller:
        filterValues.importFrom.length > 0
          ? JSON.stringify(filterValues.importFrom)
          : null,
    },
    { refetchOnMountOrArgChange: true }
  )
  const { payments } = useAppSelector((state: RootState) => state.payments)

  useGetAllImportersQuery({})
  const { importers } = useAppSelector((state: RootState) => state.importers)

  const handleFilterChange = (label: string, value: string[]) => {
    setFilterValues((prev) => ({
      ...prev,
      [String(label.charAt(0).toLowerCase() + label.substring(1)).replace(
        / /g,
        ''
      )]: value,
    }))
  }

  const rows = useMemo(
    () =>
      payments?.map((item) =>
        createData(
          item._id,
          item.seller,
          item.amount,
          item.remarks,
          item.createdAt
        )
      ) || [],
    [payments]
  )

  const dataFilters: TableDataFilters = useMemo(
    () => ({
      searchBy: {
        placeholderText: 'Search for Payment...',
        actions: [search, setSearch],
      },
      filters: [
        {
          label: 'Import From',
          type: 'object',
          options: importers
            ? importers.map((i) => ({ [i._id]: i.name })) 
            : [],
          value: filterValues.importFrom,
        },
      ],
      handleFilterChange
    }),
    [filterValues.importFrom, importers, search]
  )

  useEffect(() => {
    if (preSelectedSeller !== undefined) {
      setFilterValues((p) => ({
        ...p,
        importFrom: [preSelectedSeller]
      }))
    } else {
      setFilterValues((p) => ({
        ...p,
        importFrom: []
      }))
    }
  }, [preSelectedSeller])

  return (
    <EnhancedTable<Data>
      data={rows}
      headCells={headCells}
      title={t('Payment')}
      dense
      rowHeight={65}
      config={ImportContactsTableConfig}
      dataFilters={{ ...dataFilters }}
    />
  )
}

export default Assets
