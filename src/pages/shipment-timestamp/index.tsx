import EnhancedTable from '@/components/table'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createData, Data, headCells } from './schema'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'
import { TableDataFilters } from '@/interfaces'
import { useGetShipmentsLogsQuery } from '@/store/actions/slices/shipmentLogsSlice'
import { useGetAllExportersQuery } from '@/store/actions/slices/exportersSlice'
import { useGetProductsQuery } from '@/store/actions/slices/productsSlice'

const RawMaterialStocks = () => {
  const { t } = useTranslation()

  const [search, setSearch] = useState<string>('')
  const [filterValues, setFilterValues] = useState<{
    products: string[]
    exportTo: string[]
  }>({
    products: [],
    exportTo: [],
  })

  useGetShipmentsLogsQuery(
    {
      search: search.replace(/ /g, '') || null,
      buyer:
        filterValues.exportTo.length > 0
          ? JSON.stringify(filterValues.exportTo)
          : null,
      product:
        filterValues.products.length > 0
          ? JSON.stringify(filterValues.products)
          : null,
    },
    { refetchOnMountOrArgChange: true }
  )
  const { shipments } = useAppSelector((state: RootState) => state.shipmentLogs)

  useGetAllExportersQuery({})
  const { exporters } = useAppSelector((state: RootState) => state.exporters)

  useGetProductsQuery({})
  const { products } = useAppSelector((state: RootState) => state.products)

  const rows = useMemo(
    () =>
      shipments?.map((item) =>
        createData(
          item._id,
          item.sellId,
          item.product,
          item.variant,
          item.qty,
          item.amount
        )
      ) || [],
    [shipments]
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
        placeholderText: 'Search for Logs...',
        actions: [search, setSearch],
      },
      filters: [
        {
          label: 'Products',
          type: 'object',
          options: products ? products.map((i) => ({ [i._id!]: i.name })) : [],
          value: filterValues.products,
        },
        {
          label: 'Export To',
          type: 'object',
          options: exporters ? exporters.map((i) => ({ [i._id]: i.name })) : [],
          value: filterValues.exportTo,
        },
      ],
      handleFilterChange,
    }),
    [search, products, filterValues.products, filterValues.exportTo, exporters]
  )

  return (
    <EnhancedTable<Data>
      data={rows}
      headCells={headCells}
      title={t('Shipment Logs')}
      dense
      rowHeight={65}
      dataFilters={{ ...dataFilters }}
    />
  )
}

export default RawMaterialStocks
