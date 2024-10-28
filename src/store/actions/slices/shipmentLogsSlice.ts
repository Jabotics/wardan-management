import { APIEndPoints } from "@/APIEndpoints"
import { TablePaginationConfig } from "@/interfaces"
import { getCustomParams } from "@/lib/utils"
import { createSlice } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface IncomingData {
  status: 'success' | 'fail'
  message: string
  data: {
    _id: string
    sellId: {
      _id: string
      buyer: {
        _id: string
        name: string
      }
    }
    product: {
      _id: string
      name: string
    }
    variant: {
      _id: string
      name: string
    }
    qty: number
    amount: number
  }[]
}

interface QueryParams extends TablePaginationConfig {
  [key: string]: unknown
}

export const shipmentLogsApi = createApi({
  reducerPath: 'ShipmentLogsApi',
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
  endpoints: builder => ({
    getShipmentsLogs: builder.query<IncomingData, QueryParams>({
      query: (params) => {
        return {
          url: APIEndPoints.get_shipment_logs,
          params: getCustomParams(params),
          method: 'GET'
        }
      }
    })
  })
})

interface InitialState {
  isFilter: boolean
  total: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined

  shipments: {
    _id: string
    sellId: {
      _id: string
      buyer: {
        _id: string
        name: string
      }
    }
    product: {
      _id: string
      name: string
    }
    variant: {
      _id: string
      name: string
    }
    qty: number
    amount: number
  }[]
}

const initialState: InitialState = {
  isFilter: false,
  total: null,
  status: 'idle',
  error: undefined,

  shipments: []
}

export const ShipmentLogsSlice = createSlice({
  name: 'ShipmentLogsSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        shipmentLogsApi.endpoints.getShipmentsLogs.matchPending,
        state => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        shipmentLogsApi.endpoints.getShipmentsLogs.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded'

          state.shipments = action.payload.data
        }
      )
      .addMatcher(
        shipmentLogsApi.endpoints.getShipmentsLogs.matchRejected,
        (state, action) => {
          state.status = 'failed'

          state.error = action.error.message
        }
      )
  }
})

export const { useGetShipmentsLogsQuery } = shipmentLogsApi
export default ShipmentLogsSlice.reducer
// export const {} = ShipmentLogsSlice.actions
