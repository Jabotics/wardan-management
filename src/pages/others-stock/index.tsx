import EnhancedTable from "@/components/table"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { createData, Data, headCells } from "./schema"
import { resetEditPackagingAndOther, useGetRawStocksQuery } from "@/store/actions/slices/rawStockSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { RootState } from "@/store"
import { TableDataFilters } from "@/interfaces"

const RawMaterialStocks = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState<string>('')

  useGetRawStocksQuery({}, { refetchOnMountOrArgChange: true })
  const { otherStock } = useAppSelector((state: RootState) => state.rawStocks)

  const rows = useMemo(
    () =>
      otherStock?.map((item) =>
        createData(
          item._id,
          item.category,
          item.material,
          item.qty,
          item.unit,
        )
      ) || [],
    [otherStock]
  )
  
  const dataFilters: TableDataFilters = useMemo(
    () => ({
      searchBy: {
        placeholderText: 'Search Other Material...',
        actions: [search, setSearch],
      },
    }),
    [search]
  )

  useEffect(() => {
    dispatch(resetEditPackagingAndOther())
  }, [dispatch])
  
  return (
    <EnhancedTable<Data>
      data={rows}
      headCells={headCells}
      title={t('Other Material')}
      dense
      rowHeight={65}
      // config={ImportContactsTableConfig}
      dataFilters={{ ...dataFilters }}
    />
  )
}

export default RawMaterialStocks