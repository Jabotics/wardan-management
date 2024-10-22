import BusinessEvaluation from "./business-evaluation"
import ProductsInfo from "./products-info"

const HomePage = () => {
  return (
    <div className="h-[85vh] overflow-x-hidden overflow-y-auto flex homeFlex items-start gap-5">
      <div className="h-full w-[25vw] flex flex-col justify-start items-center px-5 gap-5">
        <ProductsInfo />
      </div>
      <div className="h-full w-full lg:flex-1">
        <BusinessEvaluation />
      </div>
    </div>
  )
}

export default HomePage