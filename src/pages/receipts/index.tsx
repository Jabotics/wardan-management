import EnhancedTable from "@/components/table"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { createData, Data, headCells } from "./schema"
import { useGetAllReceiptsQuery } from "@/store/actions/slices/receiptsSlice"
import { useAppSelector } from "@/store/hooks"
import { RootState } from "@/store"
import { TableDataFilters } from "@/interfaces"
import { ImportContactsTableConfig } from "./settings.constant"

const Assets = () => {
  const { t } = useTranslation()

  const [search, setSearch] = useState<string>('')

  useGetAllReceiptsQuery({}, { refetchOnMountOrArgChange: true })
  const { receipts } = useAppSelector((state: RootState) => state.receipts)

  const rows = useMemo(
    () =>
      receipts?.map((item) =>
        createData(
          item._id,
          item.buyer,
          item.amount,
          item.remarks,
          item.createdAt,
        )
      ) || [],
    [receipts]
  )
  
  const dataFilters: TableDataFilters = useMemo(
    () => ({
      searchBy: {
        placeholderText: 'Search for Payment...',
        actions: [search, setSearch],
      },
    }),
    [search]
  )
  
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