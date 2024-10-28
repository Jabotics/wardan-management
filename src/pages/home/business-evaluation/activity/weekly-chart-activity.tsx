import ReactEchart from '@/components/shared/ReactEChart'
import { SxProps, useTheme } from '@mui/material'
import { LegendComponentOption } from 'echarts'
import EChartsReactCore from 'echarts-for-react/lib/core'
import { BarChart, BarSeriesOption } from 'echarts/charts'
import {
  GridComponent,
  GridComponentOption,
  LegendComponent,
  TitleComponent,
  TooltipComponentOption,
  TooltipComponent,
  ToolboxComponent,
  ToolboxComponentOption,
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import React from 'react'

type TransactionDataType = { product: string; currentMonthStock: number; previousMonthStock: number }[];

export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | ToolboxComponentOption
>

echarts.use([
  BarChart,
  LegendComponent,
  CanvasRenderer,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
])

interface WeeklyActivityChartProps {
  chartRef: React.MutableRefObject<EChartsReactCore | null>
  sx?: SxProps
  seriesData: TransactionDataType
}

const WeeklyActivityChart = ({
  chartRef,
  seriesData,
  sx,
  ...rest
}: WeeklyActivityChartProps) => {
  const theme = useTheme()

  const fixedBarWidth = 10
  const barGap = 1

  const xAxisData = seriesData.map((item) => item.product)
  const depositData = seriesData.map((item) => item.previousMonthStock)
  const withdrawData = seriesData.map((item) => item.currentMonthStock)

  const chartOptions: ECOption = {
    title: { show: false },
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLabel: { color: '#8783d8', fontSize: 13, padding: 10 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#8783d8', fontSize: 13 },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: theme.palette.secondary.contrastText } },
    },
    grid: {
      left: '2%',
      right: '2%',
      top: '15%',
      bottom: '5%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}kg',
      backgroundColor: theme.palette.common.black,
      textStyle: { color: theme.palette.secondary.contrastText },
      borderWidth: 0,
      padding: 10,
    },
    legend: {
      data: [
        { name: 'Previous Month', icon: 'circle' },
        { name: 'Current Month', icon: 'circle' },
      ],
      textStyle: { color: '#8783d8' },
      left: 20,
      top: 0,
      padding: [10, 20, 30, 40],
    },
    series: [
      {
        data: depositData,
        type: 'bar',
        name: 'Previous Month',
        barWidth: fixedBarWidth,
        itemStyle: { borderRadius: 30, color: '#000' },
        emphasis: { itemStyle: { color: '#00000095' } },
        barGap,
      },
      {
        data: withdrawData,
        type: 'bar',
        name: 'Current Month',
        barWidth: fixedBarWidth,
        itemStyle: { borderRadius: 30, color: '#8783d8' },
      },
    ],
  }

  return (
    <ReactEchart
      echarts={echarts}
      option={chartOptions}
      ref={chartRef}
      sx={{
        maxHeight: '100%',
        width: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        ...sx,
      }}
      {...rest}
    />
  )
}

export default WeeklyActivityChart
