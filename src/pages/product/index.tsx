import ProductForm from "./product-form"

const ProductPage = () => {
  return (
    <article className="w-[55%] h-[85vh] rounded-2xl border border-indigo-300 bg-indigo-200/10 flex items-start px-5 py-5 justify-start">
      <div className="w-full h-full flex flex-col gap-5">
        <h2 className="text-xl text-indigo-950">Product</h2>

        <ProductForm />
      </div>
    </article>
  )
}

export default ProductPage