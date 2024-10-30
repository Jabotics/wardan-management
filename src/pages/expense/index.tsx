import EnhancedTable from "@/components/table"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { createData, Data, headCells } from "./schema"
import { useAppSelector } from "@/store/hooks"
import { RootState } from "@/store"
import { TableDataFilters } from "@/interfaces"
import { ReadyProductStockTableConfig } from "./settings.constant"
import { useGetExpenseQuery } from "@/store/actions/slices/expenseSlice"

const RawMaterialStocks = () => {
  const { t } = useTranslation()

  const [search, setSearch] = useState<string>('')

  useGetExpenseQuery({}, { refetchOnMountOrArgChange: true })
  const { expenses } = useAppSelector((state: RootState) => state.expense)

  const rows = useMemo(
    () =>
      expenses?.map((item) =>
        createData(
          item._id,
          item.category,
          item.remarks,
          item.month,
          item.year,
          item.amount,
        )
      ) || [],
    [expenses]
  )
  
  const dataFilters: TableDataFilters = useMemo(
    () => ({
      searchBy: {
        placeholderText: 'Search for Expense...',
        actions: [search, setSearch],
      },
    }),
    [search]
  )
  
  return (
    <EnhancedTable<Data>
      data={rows}
      headCells={headCells}
      title={t('Expense')}
      dense
      rowHeight={65}
      config={ReadyProductStockTableConfig}
      dataFilters={{ ...dataFilters }}
    />
  )
}

export default RawMaterialStocks