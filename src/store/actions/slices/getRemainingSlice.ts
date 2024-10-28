import { APIEndPoints } from '@/APIEndpoints'
import { TablePaginationConfig } from '@/interfaces'
import { getCustomParams } from '@/lib/utils'
import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IncomingData {
  status: 'success' | 'fail'
  message: string
  data: {
    product: string
    currentMonthStock: number
    previousMonthStock: number
  }[]
}

interface QueryParams extends TablePaginationConfig {
  [key: string]: unknown
}

export const getRemainingApi = createApi({
  reducerPath: 'GetRemainingApi',
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
    getRemainingStocks: builder.query<IncomingData, QueryParams>({
      query: (params) => {
        return {
          url: APIEndPoints.get_remaining_stock,
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

  remainingStock: {
    product: string
    currentMonthStock: number
    previousMonthStock: number
  }[]
}

const initialState: InitialState = {
  isFilter: false,
  total: null,
  status: 'idle',
  error: undefined,

  remainingStock: [],
}

export const GetRemainingSlice = createSlice({
  name: 'GetRemainingSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        getRemainingApi.endpoints.getRemainingStocks.matchPending,
        (state) => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        getRemainingApi.endpoints.getRemainingStocks.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded'

          state.remainingStock = action.payload.data
        }
      )
      .addMatcher(
        getRemainingApi.endpoints.getRemainingStocks.matchRejected,
        (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        }
      )
  },
})

export default GetRemainingSlice.reducer
export const { useGetRemainingStocksQuery } = getRemainingApi
// export const {} = GetRemainingSlice.actions
