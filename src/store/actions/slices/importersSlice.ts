/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIEndPoints } from '@/APIEndpoints'
import { ISeller } from '@/interfaces'
import { getCustomParams } from '@/lib/utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IncomingData {
  data: {
    count: number
    records: ISeller[]
    total_payable_amount: number
  }
  message: string
  status: 'success' | 'fail'
}

export const importersApi = createApi({
  reducerPath: 'ImportersApi',
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
  tagTypes: ['Importers'],
  endpoints: (builder) => ({
    getAllImporters: builder.query<IncomingData, object>({
      query: (params) => {
        return {
          url: APIEndPoints.get_sellers,
          method: 'GET',
          params: getCustomParams(params),
        }
      },
      providesTags: ['Importers'],
    }),

    addImporter: builder.mutation<
      any,
      { name: string; address: string; gst_number: string; phone: string }
    >({
      query: (body) => {
        const { ...rest } = body
        return {
          url: APIEndPoints.add_seller,
          method: 'POST',
          body: rest,
        }
      },
      invalidatesTags: ['Importers'],
    }),

    editImporter: builder.mutation<Partial<IncomingData>, ISeller>({
      query: (body) => {
        const { ...rest } = body
        return {
          url: APIEndPoints.update_seller,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: ['Importers'],
    }),

    removeImporter: builder.mutation<Partial<IncomingData>, { id: string }>({
      query: (body) => {
        const { id } = body
        return {
          url: `${APIEndPoints.remove_seller}/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Importers'],
    }),
  }),
})

interface InitialState {
  isFilter: boolean
  importers: ISeller[]
  total: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined

  total_payable_amount: number
}

const initialState: InitialState = {
  isFilter: true,
  importers: [],
  total: null,
  status: 'idle',
  error: undefined,

  total_payable_amount: 0,
}

export const ImportersSlice = createSlice({
  name: 'ImportersSlice',
  initialState,
  reducers: {
    addImporter: (state, action: PayloadAction<ISeller>) => {
      state.importers.unshift(action.payload)
    },
    editImporter: (
      state,
      action: PayloadAction<{ id: string; data: ISeller }>
    ) => {
      const { id, data } = action.payload
      const importerIndex = state.importers.findIndex((i) => i._id === id)

      state.importers[importerIndex] = { ...data, payable_amount: 0 }
    },
    removeImporter: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload

      state.importers = state.importers.filter((i) => i._id !== id)
    },
  },
  extraReducers: (builder) => {
    // Handle the asynchronous fetchItems action
    builder
      .addMatcher(
        importersApi.endpoints.getAllImporters.matchPending,
        (state) => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        importersApi.endpoints.getAllImporters.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded'
          state.importers = action.payload.data.records
          state.total = action.payload.data.count

          state.total_payable_amount = action.payload.data.total_payable_amount
        }
      )
      .addMatcher(
        importersApi.endpoints.getAllImporters.matchRejected,
        (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        }
      )
  },
})

export const {
  useAddImporterMutation,
  useEditImporterMutation,
  useGetAllImportersQuery,
  useRemoveImporterMutation,
} = importersApi
export const { addImporter, editImporter, removeImporter } =
  ImportersSlice.actions
export default ImportersSlice.reducer
