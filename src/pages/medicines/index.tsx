import EnhancedTable from '@/components/table'
import { useTranslation } from 'react-i18next'
import { rows } from './__mock__'
import { Data, headCells } from './schema'

const HomePage = () => {
  const { t } = useTranslation()
  return (
    <EnhancedTable<Data>
      data={rows}
      headCells={headCells}
      title={t('Nutrition')}
      dense
      rowHeight={100}
    />
  )
}

export default HomePage
