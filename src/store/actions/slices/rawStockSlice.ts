import { APIEndPoints } from '@/APIEndpoints'
import {
  IRawMaterialStock,
  IOtherStock,
  IPackagingProductStock,
  TablePaginationConfig,
} from '@/interfaces'
import { getCustomParams } from '@/lib/utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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
  tagTypes: ['RawStocks'],
  endpoints: (builder) => ({
    getRawStocks: builder.query<IncomingData, QueryParams>({
      query: (params) => {
        return {
          url: APIEndPoints.get_raw_stocks,
          method: 'GET',
          params: getCustomParams(params),
        }
      },
      providesTags: ['RawStocks'],
    }),

    resetRawMaterialStock: builder.mutation<IncomingData, { id: string }>({
      query: (body) => {
        const { id } = body

        return {
          url: `${APIEndPoints.reset_raw_material_stock}/${id}`,
          method: 'PUT',
        }
      },
      invalidatesTags: ['RawStocks'],
    }),

    updatePackagingOrOtherStock: builder.mutation<
      object,
      {
        category: 'PACKAGING_PRODUCT' | 'OTHER'
        items: {
          product?: string
          variant?: string
          material?: string
          qty: number
        }[]
      }
    >({
      query: (body) => {
        return {
          url: `${APIEndPoints.edit_material_usage}`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['RawStocks'],
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

  toEditPackagingAndOther: boolean
  newQty: number
}

const initialState: InitialState = {
  isFilter: false,
  total: null,
  status: 'idle',
  error: undefined,

  rawMaterialStock: undefined,
  packagingStock: undefined,
  otherStock: undefined,

  toEditPackagingAndOther: false,
  newQty: 0,
  
}

export const RawStockSlice = createSlice({
  name: 'RawStockSlice',
  initialState,
  reducers: {
    resetEditPackagingAndOther: (state) => {
      state.toEditPackagingAndOther = false
    },
    setEditPackagingAndOther: (state) => {
      state.toEditPackagingAndOther = true
    },
    // resetToSendNewQty: (state) => {
    //   state.toSendNewQty = null
    // },
    setNewQty: (state, action: PayloadAction<number>) => {
      state.newQty = action.payload
    },
  },
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
export const {
  useGetRawStocksQuery,
  useResetRawMaterialStockMutation,
  useUpdatePackagingOrOtherStockMutation,
} = rawStockApi
export const {
  resetEditPackagingAndOther,
  setEditPackagingAndOther,
  // resetToSendNewQty,
  setNewQty,
} = RawStockSlice.actions
