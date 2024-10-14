import EnhancedTable from "@/components/table"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { createData, Data, headCells } from "./schema"
import { useGetAllWastageQuery } from "@/store/actions/slices/wastageSlice"
import { useAppSelector } from "@/store/hooks"
import { RootState } from "@/store"
import { TableDataFilters } from "@/interfaces"
import { ImportContactsTableConfig } from "./settings.constant"

const RawMaterialStocks = () => {
  const { t } = useTranslation()

  const [search, setSearch] = useState<string>('')

  useGetAllWastageQuery({})
  const { rawMaterialWastage } = useAppSelector((state: RootState) => state.wastage)

  const rows = useMemo(
    () =>
      rawMaterialWastage?.map((item) =>
        createData(
          item._id,
          item.qty,
          item.unit,
          item.product,
        )
      ) || [],
    [rawMaterialWastage]
  )
  
  const dataFilters: TableDataFilters = useMemo(
    () => ({
      searchBy: {
        placeholderText: 'Search Wastage...',
        actions: [search, setSearch],
      },
    }),
    [search]
  )
  
  return (
    <EnhancedTable<Data>
      data={rows}
      headCells={headCells}
      title={t('Raw Material Wastage')}
      dense
      rowHeight={65}
      config={ImportContactsTableConfig}
      dataFilters={{ ...dataFilters }}
    />
  )
}

export default RawMaterialStocks