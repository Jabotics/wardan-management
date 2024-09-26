import { APIEndPoints } from '@/APIEndpoints'
import { IProduct } from '@/interfaces'
import { getCustomParams } from '@/lib/utils'

import { 
  createSlice, 
  // PayloadAction 
} from '@reduxjs/toolkit'
import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

interface IncomingData {
  data: {
    count: number
    records: IProduct[]
  }
  message: string
  status: boolean
}

export const productsApi = createApi({
  reducerPath: 'ProductsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: APIEndPoints.BackendURL,
    // prepareHeaders: (headers) => {
    //   const token = localStorage.getItem('token')
    //     ? localStorage.getItem('token')
    //     : ''
    //   if (token) {
    //     headers.set('authorization', token)
    //     return headers
    //   }
    // },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<IncomingData, object>({
      query: (params) => {
        return {
          url: APIEndPoints.get_products,
          method: 'GET',
          params: getCustomParams(params),
        }
      },
    }),
  }),
})

interface InitialState {
  isFilter: boolean
  products: IProduct[]
  total: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}

const initialState: InitialState = {
  isFilter: true,
  products: [],
  total: null,
  status: 'idle',
  error: undefined,
}

export const ProductsSlice = createSlice({
  name: 'ProductsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the asynchronous fetchItems action
    builder
      .addMatcher(productsApi.endpoints.getProducts.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(
        productsApi.endpoints.getProducts.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded'
          state.products = action.payload.data.records
          state.total = action.payload.data.count
        }
      )
      .addMatcher(
        productsApi.endpoints.getProducts.matchRejected,
        (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        }
      )
  },
})

export const {
  useGetProductsQuery,
} = productsApi
// export const {
// } = CategorySlice.actions
export default ProductsSlice.reducer
