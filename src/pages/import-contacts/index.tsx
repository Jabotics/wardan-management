import EnhancedTable from '@/components/table'
import { useTranslation } from 'react-i18next'
import { createData, Data, headCells } from './schema'
import { useGetAllImportersQuery } from '@/store/actions/slices/importersSlice';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { ImportContactsTableConfig } from './settings.constant';

const ImportersPage = () => {
  const { t } = useTranslation();

  useGetAllImportersQuery({}, { refetchOnMountOrArgChange: true });
  const { importers } = useAppSelector((state: RootState) => state.importers)

  const rows = importers?.map((item) =>
    createData(
      item._id,
      item.name,
      item.address,
      item.gst_number,
      item.phone,
      item.payable_amount
    )
  )

  return (
    <EnhancedTable<Data>
      data={rows}
      headCells={headCells}
      title={t('Importer')}
      dense
      rowHeight={65}
      config={ImportContactsTableConfig}
    />
  )
}

export default ImportersPage