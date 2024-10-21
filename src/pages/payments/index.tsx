import EnhancedTable from "@/components/table"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { createData, Data, headCells } from "./schema"
import { useGetAllPaymentsQuery } from "@/store/actions/slices/paymentSlice"
import { useAppSelector } from "@/store/hooks"
import { RootState } from "@/store"
import { TableDataFilters } from "@/interfaces"
import { ImportContactsTableConfig } from "./settings.constant"

const Assets = () => {
  const { t } = useTranslation()

  const [search, setSearch] = useState<string>('')

  useGetAllPaymentsQuery({}, { refetchOnMountOrArgChange: true })
  const { payments } = useAppSelector((state: RootState) => state.payments)

  const rows = useMemo(
    () =>
      payments?.map((item) =>
        createData(
          item._id,
          item.seller,
          item.amount,
          item.remarks,
          item.createdAt,
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
    }),
    [search]
  )
  
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