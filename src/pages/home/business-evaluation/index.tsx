import { TabsDemo } from "./business-evaluation-tabs"
import Profit from "./profit"
import { StocksBarChart } from "./stocks-bar-chart"

const BusinessEvaluation = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5 overflow-hidden">
      <div className="h-[35%] w-full flex flex-row gap-5 overflow-hidden">
        <div className="flex-1 h-full">
          <StocksBarChart />
        </div>
        <div className="h-full aspect-square p-5 ">
          <Profit />
        </div>
      </div>
      <div className="flex-1 w-full">
        <TabsDemo />
      </div>
    </div>
  )
}

export default BusinessEvaluation