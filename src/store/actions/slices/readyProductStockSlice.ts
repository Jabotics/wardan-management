/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIEndPoints } from '@/APIEndpoints'
import { IReadyProductStock } from '@/interfaces'
import { getCustomParams } from '@/lib/utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IncomingData {
  status: 'success' | 'fail'
  message: string
  data: {
    count: number
    records: IReadyProductStock[]
  }
}

interface ResponseType {
  message: string
  status: 'success' | 'fail'
  data: {
    _id: string
  }
}

export const readyProductStocksApi = createApi({
  reducerPath: 'ReadyProductStocksApi',
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
  tagTypes: ['ReadyProducts'],
  endpoints: (builder) => ({
    getReadyProductStock: builder.query<IncomingData, object>({
      query: (params) => {
        return {
          url: APIEndPoints.get_ready_products,
          method: 'GET',
          params: getCustomParams(params),
        }
      },
      providesTags: ['ReadyProducts'],
    }),

    addReadyProduct: builder.mutation<
      ResponseType,
      {
        product: string
        variant: string
        type: 'WHOLE' | 'MIXTURE'
        qty: number
        unit: 'kg'
        mrp: number
        count: number
      }
    >({
      query: (body) => {
        const { ...rest } = body
        return {
          url: APIEndPoints.add_ready_product,
          method: 'POST',
          body: rest,
        }
      },
      invalidatesTags: ['ReadyProducts'],
    }),

    removeReadyProduct: builder.mutation<Partial<IncomingData>, { id: string }>(
      {
        query: (body) => {
          const { id } = body
          return {
            url: `${APIEndPoints.remove_ready_product}/${id}`,
            method: 'DELETE',
          }
        },
      }
    ),
  }),
})

interface InitialState {
  isFilter: boolean
  readyProducts: IReadyProductStock[]
  total: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}

const initialState: InitialState = {
  isFilter: true,
  readyProducts: [],
  total: null,
  status: 'idle',
  error: undefined,
}

export const ReadyProductStocksSlice = createSlice({
  name: 'ReadyProductStocksSlice',
  initialState,
  reducers: {
    addReadyProduct: (state, action: PayloadAction<IReadyProductStock>) => {
      state.readyProducts.unshift(action.payload)
    },
    removeReadyProduct: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload

      state.readyProducts = state.readyProducts.filter((i) => i._id !== id)
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        readyProductStocksApi.endpoints.getReadyProductStock.matchPending,
        (state) => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        readyProductStocksApi.endpoints.getReadyProductStock.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded'
          state.total = action.payload.data.count

          state.readyProducts = action.payload.data.records
        }
      )
      .addMatcher(
        readyProductStocksApi.endpoints.getReadyProductStock.matchRejected,
        (state) => {
          state.status = 'failed'
        }
      )
  },
})

export default ReadyProductStocksSlice.reducer
export const {
  useGetReadyProductStockQuery,
  useAddReadyProductMutation,
  useRemoveReadyProductMutation,
} = readyProductStocksApi
export const { addReadyProduct, removeReadyProduct } =
  ReadyProductStocksSlice.actions
