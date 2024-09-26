import EnhancedTable from '@/components/table'
import { useTranslation } from 'react-i18next'
import { Data, headCells, rows } from './schema'

const HomePage = () => {
  const { t } = useTranslation()
  return (
    <EnhancedTable<Data>
      data={rows}
      headCells={headCells}
      title={t('Stock')}
      dense
      rowHeight={65}
    />
  )
}

export default HomePage
