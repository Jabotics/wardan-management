import { DashboardTabs } from "./business-evaluation-tabs"
import Profit from "./profit"
import StocksBarChart from "./stocks-bar-chart"

const BusinessEvaluation = () => {
  return (
    <div className="w-full h-full flex flex-col gap-2 overflow-hidden">
      <div className="h-[40%] w-full flex flex-row gap-5 overflow-hidden">
        <div className="max-w-[30vw] overflow-x-auto overflow-y-hidden h-full">
          <StocksBarChart />
        </div>
        <div className="h-full aspect-square p-5 ">
          <Profit />
        </div>
      </div>
      <div className="flex-1 w-full">
        <DashboardTabs />
      </div>
    </div>
  )
}

export default BusinessEvaluation