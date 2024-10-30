import EnhancedTable from "@/components/table"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { createData, Data, headCells } from "./schema"
import { useAppSelector } from "@/store/hooks"
import { RootState } from "@/store"
import { TableDataFilters } from "@/interfaces"
import { ReadyProductStockTableConfig } from "./settings.constant"
import { useGetExpenseCategoryQuery } from "@/store/actions/slices/expenseSlice"

const RawMaterialStocks = () => {
  const { t } = useTranslation()

  const [search, setSearch] = useState<string>('')

  useGetExpenseCategoryQuery({}, { refetchOnMountOrArgChange: true })
  const { expenseCategories } = useAppSelector((state: RootState) => state.expense)

  const rows = useMemo(
    () =>
      expenseCategories?.map((item) =>
        createData(
          item._id,
          item.name,
          item.is_active,
        )
      ) || [],
    [expenseCategories]
  )
  
  const dataFilters: TableDataFilters = useMemo(
    () => ({
      searchBy: {
        placeholderText: 'Search Expense Category...',
        actions: [search, setSearch],
      },
    }),
    [search]
  )
  
  return (
    <EnhancedTable<Data>
      data={rows}
      headCells={headCells}
      title={t('Expense Category')}
      dense
      rowHeight={65}
      config={ReadyProductStockTableConfig}
      dataFilters={{ ...dataFilters }}
    />
  )
}

export default RawMaterialStocks