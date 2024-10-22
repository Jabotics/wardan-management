import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import StocksChart from './stocks-chart'
import TransactionTab from './transaction'
import GrowthChart from './growth-chart'

export function DashboardTabs() {
  return (
    <Tabs defaultValue='stocks' className='w-full'>
      <TabsList className='grid w-full grid-cols-3'>
        <TabsTrigger value='growth-chart'>Growth Chart</TabsTrigger>
        <TabsTrigger value='stocks'>Stocks</TabsTrigger>
        <TabsTrigger value='transactions'>Transactions</TabsTrigger>
      </TabsList>

      <TabsContent value='growth-chart'>
        <GrowthChart />
      </TabsContent>

      <TabsContent value='stocks' className='flex h-full w-full items-center justify-center'>
        <div className='aspect-square h-[45vh]'>
          <StocksChart />
        </div>
      </TabsContent>

      <TabsContent value='transactions'>
        <TransactionTab />
      </TabsContent>
    </Tabs>
  )
}
