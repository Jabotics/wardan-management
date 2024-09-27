
import { useLocation } from 'react-router-dom'
import { useGetProductsQuery } from '@/store/actions/slices/productsSlice'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'
import FormComponent from './form-component'
import { Fragment } from 'react/jsx-runtime'

const ProductForm = () => {
  const location = useLocation();

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return params.get('id'); 
  };

  const id = getQueryParams()
  
  const { isLoading } = useGetProductsQuery({
    _id: id ?? null,
  }, {
    refetchOnMountOrArgChange: true,
    skip: !id
  })
  const { products } = useAppSelector((state: RootState) => state.products)
  
  return (
    <Fragment>
      <FormComponent toEdit={Boolean(id)} isLoading={isLoading} data={products?.length === 1 ? products : null} />
    </Fragment>
  )
}

export default ProductForm