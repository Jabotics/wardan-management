import { APIEndPoints } from '@/APIEndpoints'
import { getCustomParams } from '@/lib/utils'
import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IncomingData {
  status: 'success' | 'fail'
  message: string
  data: {
    totals: {
      total_qty: number
      total_amount: number
    }
    remaining_stock: {
      qty: number
      c2c: number
      count: number
    }
  }
}

interface TopFiveBuyersIncomingData {
  status: 'success' | 'fail'
  message: string
  data: {
    _id: string
    totalSell: number
    totalAmount: number
    buyer: string
  }[]
}

export const analysisApi = createApi({
  reducerPath: 'AnalysisApi',
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
    getProductWiseSell: builder.query<
      IncomingData,
      { productId: string; variantId: string }
    >({
      query: (params) => {
        return {
          url: `${APIEndPoints.product_wise_sell}`,
          method: 'GET',
          params: getCustomParams(params),
        }
      },
    }),

    getTopFiveBuyers: builder.query<TopFiveBuyersIncomingData, void>({
      query: () => {
        return {
          url: APIEndPoints.top_five_buyers,
          method: 'GET'
        }
      }
    })
  }),
})

interface InitialState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  topFiveStatus: 'idle' | 'loading' | 'succeeded' | 'failed'

  sales: {
    total_qty: number
    total_amount: number
  }

  remaining_stock: {
    qty: number
    c2c: number
    count: number
  }

  topFiveBuyers: {
    _id: string
    totalSell: number
    totalAmount: number
    buyer: string
  }[]
}

const initialState: InitialState = {
  status: 'idle',

  topFiveStatus: 'idle',

  sales: {
    total_amount: 0,
    total_qty: 0,
  },

  remaining_stock: {
    qty: 0,
    c2c: 0,
    count: 0,
  },

  topFiveBuyers: []
}

export const AnalysisSlice = createSlice({
  name: 'AnalysisSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        analysisApi.endpoints.getProductWiseSell.matchPending,
        (state) => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        analysisApi.endpoints.getTopFiveBuyers.matchPending,
        (state) => {
          state.topFiveStatus = 'loading'
        }
      )
      .addMatcher(
        analysisApi.endpoints.getProductWiseSell.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded'
          state.sales = action.payload.data.totals

          state.remaining_stock = action.payload.data.remaining_stock
        }
      )
      .addMatcher(
        analysisApi.endpoints.getTopFiveBuyers.matchFulfilled,
        (state, action) => {
          state.topFiveStatus = 'succeeded'

          state.topFiveBuyers = action.payload.data
        }
      )
      .addMatcher(
        analysisApi.endpoints.getProductWiseSell.matchRejected,
        (state) => {
          state.status = 'failed'
        }
      )
      .addMatcher(
        analysisApi.endpoints.getTopFiveBuyers.matchRejected,
        (state) => {
          state.topFiveStatus = 'failed'
        }
      )
  },
})

export default AnalysisSlice.reducer
export const { useGetProductWiseSellQuery, useGetTopFiveBuyersQuery } = analysisApi
// export const {} = AnalysisSlice.actions
