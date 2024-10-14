import EnhancedTable from "@/components/table"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { createData, Data, headCells } from "./schema"
import { useGetRawStocksQuery } from "@/store/actions/slices/rawStockSlice"
import { useAppSelector } from "@/store/hooks"
import { RootState } from "@/store"
import { TableDataFilters } from "@/interfaces"

const RawMaterialStocks = () => {
  const { t } = useTranslation()

  const [search, setSearch] = useState<string>('')

  useGetRawStocksQuery({})
  const { packagingStock } = useAppSelector((state: RootState) => state.rawStocks)

  const rows = useMemo(
    () =>
      packagingStock?.map((item) =>
        createData(
          item._id,
          item.category,
          item.product,
          item.variant,
          item.qty,
          item.unit,
        )
      ) || [],
    [packagingStock]
  )
  
  const dataFilters: TableDataFilters = useMemo(
    () => ({
      searchBy: {
        placeholderText: 'Search Packaging Material...',
        actions: [search, setSearch],
      },
    }),
    [search]
  )
  
  return (
    <EnhancedTable<Data>
      data={rows}
      headCells={headCells}
      title={t('Packaging Material')}
      dense
      rowHeight={65}
      // config={ImportContactsTableConfig}
      dataFilters={{ ...dataFilters }}
    />
  )
}

export default RawMaterialStocks