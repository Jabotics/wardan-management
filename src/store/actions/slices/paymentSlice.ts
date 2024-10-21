import { APIEndPoints } from '@/APIEndpoints'
import {
  IAddPayment,
  IPayment,
  IUpdatePayment,
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
    records: IPayment[]
  }
}

interface QueryParams extends TablePaginationConfig {
  [key: string]: unknown
}

export const paymentsApi = createApi({
  reducerPath: 'PaymentsApi',
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
  tagTypes: ['Payment'],
  endpoints: (builder) => ({
    getAllPayments: builder.query<IncomingData, QueryParams>({
      query: (params) => {
        return {
          url: APIEndPoints.get_payments,
          params: getCustomParams(params),
          method: 'GET',
        }
      },
      providesTags: ['Payment'],
    }),

    addPayment: builder.mutation<IncomingData, IAddPayment>({
      query: (body) => {
        const { ...rest } = body
        return {
          url: APIEndPoints.add_payment,
          body: rest,
          method: 'POST',
        }
      },
      invalidatesTags: ['Payment'],
    }),

    updatePayment: builder.mutation<IncomingData, IUpdatePayment>({
      query: (body) => {
        const { ...rest } = body
        return {
          url: APIEndPoints.update_payment,
          body: rest,
          method: 'PUT',
        }
      },
      invalidatesTags: ['Payment'],
    }),

    removePayment: builder.mutation<IncomingData, { id: string }>({
      query: (body) => {
        const { id } = body
        return {
          url: `${APIEndPoints.remove_payment}/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Payment']
    }),
  }),
})

interface InitialState {
  isFilter: boolean
  total: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined

  payments: IPayment[]
}

const initialState: InitialState = {
  isFilter: false,
  total: null,
  status: 'idle',
  error: undefined,

  payments: [],
}

export const PaymentsSlice = createSlice({
  name: 'PaymentsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        paymentsApi.endpoints.getAllPayments.matchPending,
        (state) => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        paymentsApi.endpoints.getAllPayments.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded'

          state.payments = action.payload.data.records
        }
      )
      .addMatcher(
        paymentsApi.endpoints.getAllPayments.matchRejected,
        (state, action) => {
          state.status = 'failed'

          state.error = action.error.message
        }
      )
  },
})

export default PaymentsSlice.reducer
export const {
  useAddPaymentMutation,
  useGetAllPaymentsQuery,
  useUpdatePaymentMutation,
  useRemovePaymentMutation,
} = paymentsApi

//  export const {} = PaymentsSlice.actions
