import { APIEndPoints } from '@/APIEndpoints'
import { IReadyProductStock } from '@/interfaces'
import { getCustomParams } from '@/lib/utils'
import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IncomingData {
  status: 'success' | 'fail'
  message: string
  data: {
    count: number
    records: IReadyProductStock[]
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
  endpoints: (builder) => ({
    getReadyProductStock: builder.query<IncomingData, object>({
      query: (params) => {
        return {
          url: APIEndPoints.get_ready_products,
          method: 'GET',
          params: getCustomParams(params),
        }
      },
    }),
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
  reducers: {},
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
export const { useGetReadyProductStockQuery } = readyProductStocksApi
// export const {} = ReadyProductStocksSlice.actions
