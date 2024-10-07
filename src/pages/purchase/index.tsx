import { RootState } from "@/store"
import { useGetPurchaseEntryQuery } from "@/store/actions/slices/purchaseSlice"
import { useAppSelector } from "@/store/hooks"
import { useTranslation } from "react-i18next";
import { createData, Data, headCells } from "./schema";
import EnhancedTable from "@/components/table";
import { ImportContactsTableConfig } from "./settings.constant";

const Purchase = () => {
  const { t } = useTranslation();

  useGetPurchaseEntryQuery({})
  const { allPurchase } = useAppSelector((state: RootState) => state.purchase)

  const rows = allPurchase?.map((item) =>
    createData(
      item._id,
      item.invoice_no,
      item.seller,
      item.category,
      item.invoice_amount,
      item.transportation_charge,
      item.unloading_charge,
      item.total_amount,
      item.createdAt
    )
  )

  return (
    <EnhancedTable<Data>
      data={rows}
      headCells={headCells}
      title={t('Purchase')}
      dense
      rowHeight={65}
      config={ImportContactsTableConfig}
    />
  )
}

export default Purchase