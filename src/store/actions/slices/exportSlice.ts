import { APIEndPoints } from '@/APIEndpoints'
import {
  IAddSell,
  IAddSellItem,
  ISell,
  ISellItem,
  IUpdateSellItem,
  TablePaginationConfig,
} from '@/interfaces'
import { getCustomParams } from '@/lib/utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IncomingData {
  status: 'success' | 'fail'
  message: string
}

interface IncomingSellData extends IncomingData {
  data: {
    count: number
    records: ISell[]
  }
}

interface IncomingSellItemData extends IncomingData {
  data: ISellItem[]
}

interface QueryParams extends TablePaginationConfig {
  [key: string]: unknown
}

interface ResponseType extends IncomingData {
  data: {
    _id: string
  }
}

export const exportsApi = createApi({
  reducerPath: 'ExportsApi',
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
  tagTypes: ['Sell', 'SellItems'],
  endpoints: (builder) => ({
    getAllSells: builder.query<IncomingSellData, QueryParams>({
      query: (params) => {
        return {
          url: APIEndPoints.get_sells,
          method: 'GET',
          params: getCustomParams(params),
        }
      },
      providesTags: ['Sell'],
    }),

    getSellItems: builder.query<IncomingSellItemData, { sellId: string }>({
      query: (params) => {
        const { sellId } = params
        return {
          url: `${APIEndPoints.get_sell_items}/${sellId}`,
          method: 'GET',
        }
      },
      providesTags: ['SellItems'],
    }),

    addSell: builder.mutation<ResponseType, IAddSell>({
      query: (body) => {
        const { ...rest } = body
        return {
          url: APIEndPoints.add_sell,
          method: 'POST',
          body: rest,
        }
      },
      invalidatesTags: ['Sell'],
    }),

    addSellItem: builder.mutation<ResponseType, IAddSellItem>({
      query: (body) => {
        const { ...rest } = body
        return {
          url: APIEndPoints.add_sell_item,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: ['SellItems'],
    }),

    removeSellItem: builder.mutation<ResponseType, { id: string }>({
      query: (body) => {
        const { id } = body
        return {
          url: `${APIEndPoints.remove_sell_item}/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['SellItems'],
    }),

    generateInvoice: builder.query({
      query: (id) => ({
        url: `/invoices/${id}`,
        method: 'GET',
        responseType: 'blob',
      }),
    }),

    updateSell: builder.mutation<ResponseType, { _id: string; buyer: string }>({
      query: (body) => {
        const { ...rest } = body

        return {
          url: APIEndPoints.update_sell,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: ['Sell'],
    }),

    removeSell: builder.mutation<ResponseType, { id: string }>({
      query: (body) => {
        const { id } = body
        return {
          url: `${APIEndPoints.remove_sell}/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Sell'],
    }),

    updateSellItem: builder.mutation<IncomingData, IUpdateSellItem>({
      query: (body) => {
        const { ...rest } = body
        return {
          url: APIEndPoints.update_sell_item,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: ['SellItems'],
    }),
  }),
})

interface InitialState {
  isFilter: boolean
  total: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined

  sell: ISell[]
  sellItem: ISellItem[]

  sellAddInfo?: Partial<ISell>
}

const initialState: InitialState = {
  isFilter: false,
  total: null,
  status: 'idle',
  error: undefined,

  sell: [],
  sellItem: [],

  sellAddInfo: undefined,
}

export const ExportSlice = createSlice({
  name: 'ExportSlice',
  initialState,
  reducers: {
    setSellAddInfo: (state, action: PayloadAction<Partial<ISell>>) => {
      state.sellAddInfo = action.payload
    },
    setNewSell: (state, action: PayloadAction<{ data: ISell }>) => {
      const { data } = action.payload
      state.sell.unshift(data)
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(exportsApi.endpoints.getAllSells.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(
        exportsApi.endpoints.getAllSells.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded'

          state.sell = action.payload.data.records
        }
      )
      .addMatcher(
        exportsApi.endpoints.getSellItems.matchFulfilled,
        (state, action) => {
          state.sellItem = action.payload.data
        }
      )
      .addMatcher(
        exportsApi.endpoints.getAllSells.matchRejected,
        (state, action) => {
          state.error = action.error.message
          state.status = 'failed'
        }
      )
  },
})

export default ExportSlice.reducer
export const {
  useAddSellItemMutation,
  useAddSellMutation,
  useGetAllSellsQuery,
  useGetSellItemsQuery,
  useRemoveSellItemMutation,
  useUpdateSellMutation,
  useRemoveSellMutation,
  useUpdateSellItemMutation,
  useGenerateInvoiceQuery,
} = exportsApi
export const { setSellAddInfo, setNewSell } = ExportSlice.actions
