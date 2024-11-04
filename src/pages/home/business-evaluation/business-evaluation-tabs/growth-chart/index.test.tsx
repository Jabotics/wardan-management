import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const mockData = {
  months: [
    '2023-1',
    '2023-2',
    '2023-3',
    '2023-4',
    '2023-5',
    '2023-6',
    '2023-7',
    '2023-8',
    '2023-9',
    '2023-10',
    '2023-11',
    '2023-12',
  ],
  seriesData: [
    {
      name: 'Expense',
      data: [500, 700, 800, 600, 650, 900, 1000, 1200, 1100, 1300, 1400, 1500],
    },
    {
      name: 'Sales',
      data: [
        800, 900, 1000, 1100, 1200, 1500, 1800, 2000, 1900, 2100, 2200, 2300,
      ],
    },
    {
      name: 'Stock',
      data: [
        2000, 1950, 1900, 1800, 1750, 1700, 1650, 1600, 1550, 1500, 1450, 1400,
      ],
    },
  ],
}

const GrowthChart = () => {
  const chartRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current)

      const colors = ['#5470C6', '#EE6666', '#91CC75']

      const option = {
        color: colors,
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: mockData.seriesData.map((series) => series.name), // Use the names directly
        },
        grid: {
          top: 70,
          bottom: 50,
        },
        xAxis: {
          type: 'category',
          data: mockData.months, // Use consistent month data for the year 2017
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: 'value',
        },
        series: mockData.seriesData.map((series) => ({
          name: series.name,
          type: 'line',
          smooth: true,
          emphasis: {
            focus: 'series',
          },
          data: series.data,
        })),
      }

      myChart.setOption(option)

      // Cleanup function to dispose the chart instance on unmount
      return () => {
        myChart.dispose()
      }
    }
  }, [])

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
}

export default GrowthChart
