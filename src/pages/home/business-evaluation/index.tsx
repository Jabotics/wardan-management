import WeeklyActivity from './activity/weekly-activity'
import { DashboardTabs } from './business-evaluation-tabs'
import StocksChart from './business-evaluation-tabs/stocks-chart'
import Profit from './profit'

const BusinessEvaluation = () => {
  return (
    <div className='flex h-full w-full flex-col gap-2 overflow-hidden'>
      <div className='flex h-[40%] w-full flex-row gap-5 overflow-hidden'>
        <div className='h-full flex-1 overflow-x-auto overflow-y-hidden flex flex-col items-center justify-start'>
          <span className='text-xs'>Comparison Of Stocks</span>
          {/* <StocksBarChart /> */}
          <WeeklyActivity />
        </div>
        <div className='aspect-square h-full w-fit p-5'>
          <Profit />
        </div>
      </div>
      <div className='w-full h-[55%] flex items-start'>
        <div className='w-2/5 h-full'>
        <div className='aspect-square h-[45vh]'>
          <StocksChart />
        </div></div>
        <div className='w-3/5 h-full'>
          <DashboardTabs />
        </div>
      </div>
    </div>
  )
}

export default BusinessEvaluation
