import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import StocksChart from './stocks-chart'

export function TabsDemo() {
  return (
    <Tabs defaultValue='stocks' className='h-full w-full overflow-hidden'>
      <TabsList className='grid w-full grid-cols-3'>
        <TabsTrigger value='growth-chart'>Growth Chart</TabsTrigger>
        <TabsTrigger value='stocks'>Stocks</TabsTrigger>
        <TabsTrigger value='transactions'>Transactions</TabsTrigger>
      </TabsList>
      <TabsContent value='growth-chart'></TabsContent>
      <TabsContent
        value='stocks'
        className='flex h-full w-full items-center justify-center -mt-5'
      >
        <div className='aspect-square h-[45vh]'>
          <StocksChart />
        </div>
      </TabsContent>
      <TabsContent value='transactions'></TabsContent>
    </Tabs>
  )
}
