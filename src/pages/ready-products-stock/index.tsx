import EnhancedTable from "@/components/table"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { createData, Data, headCells } from "./schema"
import { useGetReadyProductStockQuery } from "@/store/actions/slices/readyProductStockSlice"
import { useAppSelector } from "@/store/hooks"
import { RootState } from "@/store"
import { TableDataFilters } from "@/interfaces"
import { ReadyProductStockTableConfig } from "./settings.constant"

const RawMaterialStocks = () => {
  const { t } = useTranslation()

  const [search, setSearch] = useState<string>('')

  useGetReadyProductStockQuery({})
  const { readyProducts } = useAppSelector((state: RootState) => state.readyProducts)

  const rows = useMemo(
    () =>
      readyProducts?.map((item) =>
        createData(
          item._id,
          item.product,
          item.variant,
          item.qty,
          item.unit,
          item.mrp,
          item.count,
          item.updatedAt
        )
      ) || [],
    [readyProducts]
  )
  
  const dataFilters: TableDataFilters = useMemo(
    () => ({
      searchBy: {
        placeholderText: 'Search Raw Material...',
        actions: [search, setSearch],
      },
    }),
    [search]
  )
  
  return (
    <EnhancedTable<Data>
      data={rows}
      headCells={headCells}
      title={t('Ready Product Stock')}
      dense
      rowHeight={65}
      config={ReadyProductStockTableConfig}
      dataFilters={{ ...dataFilters }}
    />
  )
}

export default RawMaterialStocks