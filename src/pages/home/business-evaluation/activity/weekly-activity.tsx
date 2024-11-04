import ReactECharts from 'echarts-for-react'
import { useEffect, useRef, useState } from 'react'
import WeeklyActivityChart from './weekly-chart-activity'
import { useChartResize } from '@/hooks/use-echarts-resize'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useGetRemainingStocksQuery } from '@/store/actions/slices/getRemainingSlice'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'

type TransactionDataType = { product: string; currentMonthStock: number; previousMonthStock: number }[];

const WeeklyActivity = () => {
  useGetRemainingStocksQuery({})
  const { remainingStock } = useAppSelector(
    (state: RootState) => state.remainings
  )
  console.log(remainingStock)

  const chartRef = useRef<ReactECharts | null>(null)
  const [chartData, setChartData] = useState<TransactionDataType>([])
  useChartResize(chartRef)

  useEffect(() => {
    const fetchData = () => {
      setChartData(remainingStock)
    }

    fetchData()
  }, [remainingStock])

  return (
    <Stack
      sx={{
        width: '100%',
        height: 270, 
        overflowY: 'hidden',
        overflowX: 'auto', 
      }}
    >
      <Card sx={{ backgroundColor: 'common.white', width: '100%', flex: 1 }}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            width: '100%',
            pb: 0,
          }}
        >
          <div
            style={{
              overflowX: 'auto', 
              overflowY: 'hidden', 
              whiteSpace: 'nowrap',
              width: '100%', 
              height: '100%', 
            }}
          >
            <WeeklyActivityChart chartRef={chartRef} seriesData={chartData} />
          </div>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default WeeklyActivity
