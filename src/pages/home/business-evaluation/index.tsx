import WeeklyActivity from './activity/weekly-activity'
import { DashboardTabs } from './business-evaluation-tabs'
import StocksChart from './business-evaluation-tabs/stocks-chart'
import Profit from './profit'

const BusinessEvaluation = () => {
  return (
    <div className='flex h-full w-full flex-col gap-2 overflow-hidden'>
      <div className='flex h-[40%] w-full flex-row gap-5 overflow-hidden'>
        <div className='flex h-full flex-1 flex-col items-center justify-start overflow-x-auto overflow-y-hidden'>
          <span className='text-xs'>Comparison Of Stocks</span>
          {/* <StocksBarChart /> */}
          <WeeklyActivity />
        </div>
        <div className='aspect-square h-full w-fit p-5'>
          <Profit />
        </div>
      </div>
      <div className='flex h-[55%] w-full items-start'>
        <div className='h-full w-2/5'>
          <span className='text-xs flex items-center justify-center'>Top Five Exporter</span>
          <div className='aspect-square h-[45vh]'>
            <StocksChart />
          </div>
        </div>
        <div className='h-full w-3/5'>
          <DashboardTabs />
        </div>
      </div>
    </div>
  )
}

export default BusinessEvaluation
