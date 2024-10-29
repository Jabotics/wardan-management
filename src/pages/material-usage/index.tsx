import EnhancedTable from "@/components/table"
import { 
  useMemo, 
  // useState 
} from "react"
import { useTranslation } from "react-i18next"
import { createData, Data, headCells } from "./schema"
import { useAppSelector } from "@/store/hooks"
import { RootState } from "@/store"
// import { TableDataFilters } from "@/interfaces"
import { useGetAllMaterialUsageQuery } from "@/store/actions/slices/materialUsageSlice"

const RawMaterialStocks = () => {
  const { t } = useTranslation()

  // const [search, setSearch] = useState<string>('')

  useGetAllMaterialUsageQuery({}, { refetchOnMountOrArgChange: true })
  const { materialUsages } = useAppSelector((state: RootState) => state.materialUsage)

  const rows = useMemo(
    () =>
      materialUsages?.map((item) =>
        createData(
          item._id,
          item.category,
          item.items,
          item.createdAt,
        )
      ) || [],
    [materialUsages]
  )
  
  // const dataFilters: TableDataFilters = useMemo(
  //   () => ({
  //     searchBy: {
  //       placeholderText: 'Search Usag...',
  //       actions: [search, setSearch],
  //     },
  //   }),
  //   [search]
  // )
  
  return (
    <EnhancedTable<Data>
      data={rows}
      headCells={headCells}
      title={t('Material Usage')}
      dense
      rowHeight={65}
      // config={ImportContactsTableConfig}
      // dataFilters={{ ...dataFilters }}
    />
    // <></>
  )
}

export default RawMaterialStocks