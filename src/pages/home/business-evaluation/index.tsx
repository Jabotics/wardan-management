import { DashboardTabs } from './business-evaluation-tabs'
import StocksChart from './business-evaluation-tabs/stocks-chart'
import Profit from './profit'
import StocksBarChart from './stocks-bar-chart'

const BusinessEvaluation = () => {
  return (
    <div className='flex h-full w-full flex-col gap-2 overflow-hidden'>
      <div className='flex h-[40%] w-full flex-row gap-5 overflow-hidden'>
        <div className='h-full w-[40vw] overflow-x-auto overflow-y-hidden flex flex-col items-center justify-start'>
          <span className='text-xs'>Comparison Of Stocks</span>
          <StocksBarChart />
        </div>
        <div className='aspect-square h-full p-5'>
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
