import { APIEndPoints } from '@/APIEndpoints'
import { IExpenseReport, ISellReport, IStockReport } from '@/interfaces'
import { getCustomParams } from '@/lib/utils'
import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface BaseIncomingData {
  status: 'success' | 'fail'
  message: string
}

interface ExpenseReportIncomingData extends BaseIncomingData {
  data: IExpenseReport
}

interface SellReportIncomingData extends BaseIncomingData {
  data: ISellReport
}

interface StockReportIncomingData extends BaseIncomingData {
  data: {
    stocks: IStockReport[]
  }
}

export const reportsApi = createApi({
  reducerPath: 'ReportsApi',
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
    getExpenseReports: builder.query<
      ExpenseReportIncomingData,
      { month: string; year: number }
    >({
      query: (params) => {
        return {
          url: APIEndPoints.expense_reports,
          method: 'GET',
          params: getCustomParams(params),
        }
      },
    }),

    getSellReports: builder.query<
      SellReportIncomingData,
      { month: string; year: number }
    >({
      query: (params) => {
        return {
          url: APIEndPoints.sell_reports,
          method: 'GET',
          params: getCustomParams(params),
        }
      },
    }),

    getStockReports: builder.query<
      StockReportIncomingData,
      { month: string; year: number }
    >({
      query: (params) => {
        return {
          url: APIEndPoints.stock_reports,
          method: 'GET',
          params: getCustomParams(params),
        }
      },
    }),
  }),
})

interface InitialState {
  expenseStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  sellStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  stockStatus: 'idle' | 'loading' | 'succeeded' | 'failed'

  expense: IExpenseReport | null
  sell: ISellReport | null
  stock: IStockReport[]
}

const initialState: InitialState = {
  expenseStatus: 'idle',
  sellStatus: 'idle',
  stockStatus: 'idle',

  expense: null,
  sell: null,
  stock: [],
}

export const ReportsSlice = createSlice({
  name: 'ReportsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        reportsApi.endpoints.getExpenseReports.matchPending,
        (state) => {
          state.expenseStatus = 'loading'
        }
      )
      .addMatcher(reportsApi.endpoints.getSellReports.matchPending, (state) => {
        state.sellStatus = 'loading'
      })
      .addMatcher(
        reportsApi.endpoints.getStockReports.matchPending,
        (state) => {
          state.stockStatus = 'loading'
        }
      )
      .addMatcher(
        reportsApi.endpoints.getExpenseReports.matchFulfilled,
        (state, action) => {
          state.expenseStatus = 'succeeded'

          state.expense = action.payload.data
        }
      )
      .addMatcher(
        reportsApi.endpoints.getSellReports.matchFulfilled,
        (state, action) => {
          state.sellStatus = 'succeeded'

          state.sell = action.payload.data
        }
      )
      .addMatcher(
        reportsApi.endpoints.getStockReports.matchFulfilled,
        (state, action) => {
          state.stockStatus = 'succeeded'

          state.stock = action.payload.data.stocks
        }
      )
      .addMatcher(
        reportsApi.endpoints.getExpenseReports.matchRejected,
        (state) => {
          state.expenseStatus = 'failed'
        }
      )
      .addMatcher(
        reportsApi.endpoints.getSellReports.matchRejected,
        (state) => {
          state.sellStatus = 'failed'
        }
      )
      .addMatcher(
        reportsApi.endpoints.getStockReports.matchRejected,
        (state) => {
          state.stockStatus = 'failed'
        }
      )
  },
})

export default ReportsSlice.reducer
export const { useGetExpenseReportsQuery, useGetSellReportsQuery, useGetStockReportsQuery } = reportsApi
// export const {} = ReportsSlice.actions
