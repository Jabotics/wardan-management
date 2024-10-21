import { APIEndPoints } from '@/APIEndpoints'
import {
  IAddReceipt,
  IReceipt,
  IUpdateReceipt,
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
    records: IReceipt[]
  }
}

interface QueryParams extends TablePaginationConfig {
  [key: string]: unknown
}

export const receiptsApi = createApi({
  reducerPath: 'ReceiptsApi',
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
  tagTypes: ['Receipt'],
  endpoints: (builder) => ({
    getAllReceipts: builder.query<IncomingData, QueryParams>({
      query: (params) => {
        return {
          url: APIEndPoints.get_receipts,
          params: getCustomParams(params),
          method: 'GET',
        }
      },
      providesTags: ['Receipt'],
    }),

    addReceipt: builder.mutation<IncomingData, IAddReceipt>({
      query: (body) => {
        const { ...rest } = body
        return {
          url: APIEndPoints.add_receipt,
          body: rest,
          method: 'POST',
        }
      },
      invalidatesTags: ['Receipt'],
    }),

    updateReceipt: builder.mutation<IncomingData, IUpdateReceipt>({
      query: (body) => {
        const { ...rest } = body
        return {
          url: APIEndPoints.update_receipt,
          body: rest,
          method: 'PUT',
        }
      },
      invalidatesTags: ['Receipt'],
    }),

    removeReceipt: builder.mutation<IncomingData, { id: string }>({
      query: (body) => {
        const { id } = body
        return {
          url: `${APIEndPoints.remove_receipt}/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Receipt']
    }),
  }),
})

interface InitialState {
  isFilter: boolean
  total: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined

  receipts: IReceipt[]
}

const initialState: InitialState = {
  isFilter: false,
  total: null,
  status: 'idle',
  error: undefined,

  receipts: [],
}

export const ReceiptsSlice = createSlice({
  name: 'ReceiptsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        receiptsApi.endpoints.getAllReceipts.matchPending,
        (state) => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        receiptsApi.endpoints.getAllReceipts.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded'

          state.receipts = action.payload.data.records
        }
      )
      .addMatcher(
        receiptsApi.endpoints.getAllReceipts.matchRejected,
        (state, action) => {
          state.status = 'failed'

          state.error = action.error.message
        }
      )
  },
})

export default ReceiptsSlice.reducer
export const {
  useAddReceiptMutation,
  useGetAllReceiptsQuery,
  useUpdateReceiptMutation,
  useRemoveReceiptMutation,
} = receiptsApi

//  export const {} = ReceiptsSlice.actions
