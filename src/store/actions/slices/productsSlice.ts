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
  status: string
}

export const productsApi = createApi({
  reducerPath: 'ProductsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: APIEndPoints.BackendURL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
        ? localStorage.getItem('token')
        : ''
      if (token) {
        headers.set('authorization', token)
        return headers
      }
    },
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

    fetchProducts: builder.query<IncomingData, void>({
      query: () => {
        return {
          url: APIEndPoints.get_products,
          method: 'GET',
        }
      },
    }),

    addProducts: builder.mutation<Partial<IncomingData>, object>({
      query: (body) => {
        const { ...rest } = body
        return {
          url: APIEndPoints.add_product,
          method: 'POST',
          body: rest,
        }
      },
    }),

    editProducts: builder.mutation<Partial<IncomingData>, object>({
      query: (body) => {
        const { ...rest } = body
        return {
          url: APIEndPoints.update_product,
          method: 'PUT',
          body: rest,
        }
      },
    }),

    removeProduct: builder.mutation<Partial<IncomingData>, { id: string }>({
      query: (body) => {
        const { id } = body;
        return {
          url: `${APIEndPoints.remove_product}/${id}`,
          method: 'DELETE',
        }
      },
    })
  }),
})

interface InitialState {
  isFilter: boolean
  products: IProduct[]
  total: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined

  allWholeProducts: IProduct[]
}

const initialState: InitialState = {
  isFilter: true,
  products: [],
  total: null,
  status: 'idle',
  error: undefined,

  allWholeProducts: [],
}

export const ProductsSlice = createSlice({
  name: 'ProductsSlice',
  initialState,
  reducers: {
  },
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
      .addMatcher(productsApi.endpoints.fetchProducts.matchFulfilled, (state, action) => {
        state.allWholeProducts = action.payload.data.records.filter(i => i.type === "WHOLE")
      })
  },
})

export const {
  useGetProductsQuery,
  useFetchProductsQuery,
  useAddProductsMutation,
  useEditProductsMutation,
  useRemoveProductMutation,
} = productsApi
// export const {
// } = ProductsSlice.actions
export default ProductsSlice.reducer
