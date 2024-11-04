import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { useGetTopFiveBuyersQuery } from '@/store/actions/slices/analysisSlice'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'

export default function StocksChart() {
  const chartRef = useRef(null)

  useGetTopFiveBuyersQuery()
  const { topFiveBuyers } = useAppSelector((state: RootState) => state.analysis)

  const topFiveBuyersForChartData = topFiveBuyers.map((i) => ({
    value: i.totalAmount,
    name: i.buyer,
  }))

  useEffect(() => {
    const myChart = echarts.init(chartRef.current)

    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: 'Total Sell (₹)',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: topFiveBuyersForChartData ?? [],
        },
      ],
    }

    myChart.setOption(option)

    return () => {
      myChart.dispose()
    }
  }, [topFiveBuyersForChartData])

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
}
