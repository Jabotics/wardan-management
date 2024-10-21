import EnhancedTable from "@/components/table"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { createData, Data, headCells } from "./schema"
import { useGetAllAssetsQuery } from "@/store/actions/slices/assetsSlice"
import { useAppSelector } from "@/store/hooks"
import { RootState } from "@/store"
import { TableDataFilters } from "@/interfaces"
import { ImportContactsTableConfig } from "./settings.constant"

const Assets = () => {
  const { t } = useTranslation()

  const [search, setSearch] = useState<string>('')

  useGetAllAssetsQuery({}, { refetchOnMountOrArgChange: true })
  const { assets } = useAppSelector((state: RootState) => state.assets)

  const rows = useMemo(
    () =>
      assets?.map((item) =>
        createData(
          item._id,
          item.amount,
          item.invoice_no,
          item.item_name,
        )
      ) || [],
    [assets]
  )
  
  const dataFilters: TableDataFilters = useMemo(
    () => ({
      searchBy: {
        placeholderText: 'Search for Assets...',
        actions: [search, setSearch],
      },
    }),
    [search]
  )
  
  return (
    <EnhancedTable<Data>
      data={rows}
      headCells={headCells}
      title={t('Asset')}
      dense
      rowHeight={65}
      config={ImportContactsTableConfig}
      dataFilters={{ ...dataFilters }}
    />
  )
}

export default Assets