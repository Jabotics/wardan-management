/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIEndPoints } from '@/APIEndpoints'
import { IBuyer } from '@/interfaces'
import { getCustomParams } from '@/lib/utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IncomingData {
  data: {
    count: number
    records: IBuyer[]
    total_outstanding_amount: number
  }
  message: string
  status: 'success' | 'fail'
}

export const exportersApi = createApi({
  reducerPath: 'ExportersApi',
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
  tagTypes: ['Exporters'],
  endpoints: (builder) => ({
    getAllExporters: builder.query<IncomingData, object>({
      query: (params) => {
        return {
          url: APIEndPoints.get_buyers,
          method: 'GET',
          params: getCustomParams(params),
        }
      },
      providesTags: ['Exporters']
    }),

    addExporter: builder.mutation<any, { name: string, address: string, gst_number: string, phone: string }>({
      query: (body) => {
        const { ...rest } = body
        return {
          url: APIEndPoints.add_buyer,
          method: 'POST',
          body: rest,
        }
      },
      invalidatesTags: ['Exporters']
    }),

    editExporter: builder.mutation<Partial<IncomingData>, IBuyer>({
      query: (body) => {
        const { ...rest } = body
        return {
          url: APIEndPoints.update_buyer,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: ['Exporters']
    }),

    removeExporter: builder.mutation<Partial<IncomingData>, { id: string }>({
      query: (body) => {
        const { id } = body
        return {
          url: `${APIEndPoints.remove_buyer}/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Exporters']
    }),

    downloadExporters: builder.query({
      query: () => {
        return {
          url: APIEndPoints.download_buyer_list,
          method: 'GET'
        }
      }
    })
  }),
})

interface InitialState {
  isFilter: boolean
  exporters: IBuyer[]
  total: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined

  total_outstanding_amount: number
}

const initialState: InitialState = {
  isFilter: true,
  exporters: [],
  total: null,
  status: 'idle',
  error: undefined,

  total_outstanding_amount: 0,
}

export const ExportersSlice = createSlice({
  name: 'ExportersSlice',
  initialState,
  reducers: {
    addExporter: (state, action: PayloadAction<IBuyer>) => {
      state.exporters.unshift(action.payload)
    },
    editExporter: (
      state,
      action: PayloadAction<{ id: string; data: IBuyer }>
    ) => {
      const { id, data } = action.payload
      const exporterIndex = state.exporters.findIndex((i) => i._id === id)

      state.exporters[exporterIndex] = { ...data, outstanding_amount: 0 }
    },
    removeExporter: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload

      state.exporters = state.exporters.filter((i) => i._id !== id);
    },
  },
  extraReducers: (builder) => {
    // Handle the asynchronous fetchItems action
    builder
      .addMatcher(
        exportersApi.endpoints.getAllExporters.matchPending,
        (state) => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        exportersApi.endpoints.getAllExporters.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded'
          state.exporters = action.payload.data.records
          state.total = action.payload.data.count

          state.total_outstanding_amount = action.payload.data.total_outstanding_amount
        }
      )
      .addMatcher(
        exportersApi.endpoints.getAllExporters.matchRejected,
        (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        }
      )
  },
})

export const {
  useAddExporterMutation,
  useEditExporterMutation,
  useGetAllExportersQuery,
  useRemoveExporterMutation,
  useDownloadExportersQuery,
} = exportersApi
export const { addExporter, editExporter, removeExporter } = ExportersSlice.actions
export default ExportersSlice.reducer
