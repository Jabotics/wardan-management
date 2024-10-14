import { APIEndPoints } from '@/APIEndpoints'
import {
  IRawMaterialStock,
  IOtherStock,
  IPackagingProductStock,
  TablePaginationConfig,
} from '@/interfaces'
import { getCustomParams } from '@/lib/utils'
import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IncomingData {
  status: 'success' | 'fail'
  message: string
  data: {
    count: number
    records: (IRawMaterialStock | IOtherStock | IPackagingProductStock)[]
  }
}

interface QueryParams extends TablePaginationConfig {
  [key: string]: unknown
}

export const rawStockApi = createApi({
  reducerPath: 'RawStockApi',
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
    getRawStocks: builder.query<IncomingData, QueryParams>({
      query: (params) => {
        return {
          url: APIEndPoints.get_raw_stocks,
          method: 'GET',
          params: getCustomParams(params),
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

  rawMaterialStock: IRawMaterialStock[] | undefined
  packagingStock: IPackagingProductStock[] | undefined
  otherStock: IOtherStock[] | undefined
}

const initialState: InitialState = {
  isFilter: false,
  total: null,
  status: 'idle',
  error: undefined,

  rawMaterialStock: undefined,
  packagingStock: undefined,
  otherStock: undefined,
}

export const RawStockSlice = createSlice({
  name: 'RawStockSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(rawStockApi.endpoints.getRawStocks.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(
        rawStockApi.endpoints.getRawStocks.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded'
          state.total = action.payload.data.count

          const stock = action.payload.data.records

          state.rawMaterialStock = stock.filter(
            (i): i is IRawMaterialStock => i.category === 'RAW_MATERIAL'
          )

          state.packagingStock = stock.filter(
            (i): i is IPackagingProductStock =>
              i.category === 'PACKAGING_PRODUCT'
          )

          state.otherStock = stock.filter(
            (i): i is IOtherStock => i.category === 'OTHER'
          )
        }
      )
      .addMatcher(
        rawStockApi.endpoints.getRawStocks.matchRejected,
        (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        }
      )
  },
})

export default RawStockSlice.reducer
export const { useGetRawStocksQuery } = rawStockApi
// export const {} = RawStockSlice.actions
