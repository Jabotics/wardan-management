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
    productId: string
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

  stockHistory: {
    [key: string]: IStockHistory[]
  } | null
}

const initialState: InitialState = {
  isFilter: false,
  total: null,
  status: 'idle',
  error: undefined,

  stockHistory: null,
}

export const GetStockHistorySlice = createSlice({
  name: 'GetStockHistorySlice',
  initialState,
  reducers: {
    resetStockHistory: (state) => {
      state.stockHistory = null
    },
  },
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

          if (!state.stockHistory) {
            state.stockHistory = {}
          }

          const productId = action.payload.data.productId

          if (!state.stockHistory[productId]) {
            state.stockHistory[productId] = []
          }

          const existingTimestamps = new Set(
            state.stockHistory[productId].map((record) => record.createdAt)
          )
          const newRecords = action.payload.data.records.filter(
            (record) => !existingTimestamps.has(record.createdAt)
          )

          const uniqueRecords = new Map()
          state.stockHistory[productId].forEach((record) => {
            uniqueRecords.set(record.createdAt, record)
          })

          newRecords.forEach((record) => {
            uniqueRecords.set(record.createdAt, record)
          })

          state.stockHistory[productId] = Array.from(uniqueRecords.values())
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
export const { resetStockHistory } = GetStockHistorySlice.actions
export default GetStockHistorySlice.reducer
