import EnhancedTable from '@/components/table'
import { useTranslation } from 'react-i18next'
import { createData, Data, headCells } from './schema'
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { useGetAllExportersQuery } from '@/store/actions/slices/exportersSlice';
import { ExportContactsTableConfig } from './settings.constant';

const ImportersPage = () => {
  const { t } = useTranslation();

  useGetAllExportersQuery({});
  const { exporters } = useAppSelector((state: RootState) => state.exporters)

  const rows = exporters?.map((item) =>
    createData(
      item._id,
      item.name,
      item.address,
      item.gst_number,
      item.phone
    )
  )

  return (
    <EnhancedTable<Data>
      data={rows}
      headCells={headCells}
      title={t('Exporter')}
      dense
      rowHeight={65}
      config={ExportContactsTableConfig}
    />
  )
}

export default ImportersPage