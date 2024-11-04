import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TransactionTab from './transaction'
import GrowthChart from './growth-chart'

export function DashboardTabs() {
  return (
    <Tabs defaultValue='transactions' className='w-full h-full'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='monthly-reports'>Monthly Reports</TabsTrigger>
        <TabsTrigger value='transactions'>Transactions</TabsTrigger>
      </TabsList>

      <TabsContent value='monthly-reports' className='h-full'>
        <GrowthChart />
      </TabsContent>

      <TabsContent value='transactions' className='h-full'>
        <TransactionTab />
      </TabsContent>
    </Tabs>
  )
}
