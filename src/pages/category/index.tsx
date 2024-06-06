import { RootState } from "@/store"
import { useGetCategoriesQuery } from "@/store/actions/slices/categorySlice"
import { useAppSelector } from "@/store/hooks"
import { categoryHeadCells, createCategoryData } from "./schema"
import { useTranslation } from "react-i18next"
import EnhancedTable from "@/components/table"
import { ICategory } from "@/interfaces"
import { categoryExpand } from "./function"

const index = () => {
  
  const { t } = useTranslation()

  useGetCategoriesQuery({})
  const { categories } = useAppSelector((state: RootState) => state.category)

  const rows = categories.map(item =>
    createCategoryData(
      item.id,
      item.name,
      item.is_active
    )
  );
  return (
    <EnhancedTable<ICategory>
      data={rows}
      headCells={categoryHeadCells}
      title={t('Category')}
      dense
      ExpandedBody={categoryExpand}
    />
  )
}

export default index