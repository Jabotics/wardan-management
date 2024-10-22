import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { name: 'Haldi', prev: 4000, curr: 2400, amt: 2400 },
  { name: 'Red Chilli', prev: 2000, curr: 9800, amt: 2290 },
  { name: 'Dhaniya', prev: 3000, curr: 1398, amt: 2210 },
  { name: 'Jeera', prev: 2000, curr: 9800, amt: 2290 },
]

const Example = () => {
  return (
    <ResponsiveContainer width='100%' height='100%' minWidth={600}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis
          yAxisId='left'
          orientation='left'
          stroke='#8884d8'
          domain={[0, 10000]}
          label={'Previous Stock'}
        />
        <YAxis
          yAxisId='right'
          orientation='right'
          stroke='#82ca9d'
          domain={[0, 10000]}
          label={'Current Stock'}
        />
        <Tooltip />
        <Legend />
        <Bar yAxisId='left' dataKey='prev' fill='#8884d8' barSize={30} />
        <Bar yAxisId='right' dataKey='curr' fill='#82ca9d' barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default Example
