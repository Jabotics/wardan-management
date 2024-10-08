import { Fragment } from "react/jsx-runtime"
import Variants from "./variant"
import Products from "./products"
import OtherMaterial from "./other-materials"

const ProductsInfo = () => {
  return (
    <Fragment>
      <Variants />
      <Products />
      <OtherMaterial />
    </Fragment>
  )
}

export default ProductsInfo