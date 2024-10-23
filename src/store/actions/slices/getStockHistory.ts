import { APIEndPoints } from '@/APIEndpoints'
import { IStockHistory, TablePaginationConfig } from '@/interfaces'
import { getCustomParams } from '@/lib/utils'
import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IncomingData {
  status: 'success' | 'fail'
  message: string

  data: {
    count: number
    records: IStockHistory[]
  }
}

interface QueryParams extends TablePaginationConfig {
  [key: string]: unknown
}

export const getStockHistoryApi = createApi({
  reducerPath: 'GetStockHistoryApi',
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
    getStockHistory: builder.query<IncomingData, QueryParams>({
      query: (params) => {
        return {
          url: APIEndPoints.get_stock_history,
          params: getCustomParams(params),
          method: 'GET',
        }
      },
    }),
  }),
})

interface InitialState {
  isFilter: boolean
  total: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined

  stockHistory: IStockHistory[]
}

const initialState: InitialState = {
  isFilter: false,
  total: null,
  status: 'idle',
  error: undefined,

  stockHistory: [],
}

export const GetStockHistorySlice = createSlice({
  name: 'GetStockHistorySlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        getStockHistoryApi.endpoints.getStockHistory.matchPending,
        (state) => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        getStockHistoryApi.endpoints.getStockHistory.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded'

          state.total = action.payload.data.count
          state.stockHistory = action.payload.data.records;
        }
      )
      .addMatcher(
        getStockHistoryApi.endpoints.getStockHistory.matchRejected,
        (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        }
      )
  },
})

export const { useGetStockHistoryQuery } = getStockHistoryApi
// export const {} = GetStockHistorySlice.actions
export default GetStockHistorySlice.reducer
