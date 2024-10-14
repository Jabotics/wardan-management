/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIEndPoints } from '@/APIEndpoints'
import { IWastage, TablePaginationConfig } from '@/interfaces'
import { getCustomParams } from '@/lib/utils'
import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IncomingData {
  status: 'success' | 'fail'
  message: string

  data: {
    count: number
    records: IWastage[]
  }
}

interface QueryParams extends TablePaginationConfig {
  [key: string]: unknown
}

export const wastageApi = createApi({
  reducerPath: 'WastageApi',
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
    getAllWastage: builder.query<IncomingData, QueryParams>({
      query: (params) => {
        return {
          url: APIEndPoints.get_wastage,
          method: 'GET',
          params: getCustomParams(params),
        }
      },
    }),

    addWastage: builder.mutation<
      any,
      {
        category: 'RAW_MATERIAL'
        items: { product: string; qty: number; unit: string }[]
      }
    >({
      query: (body) => {
        const { ...rest } = body

        return {
          url: APIEndPoints.add_wastage,
          method: 'POST',
          body: rest,
        }
      },
    }),

    removeWastage: builder.mutation<Partial<IncomingData>, { id: string }>({
      query: (body) => {
        const { id } = body
        return {
          url: `${APIEndPoints.remove_wastage}/${id}`,
          method: 'DELETE',
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

  rawMaterialWastage: IWastage['items'] | undefined
  wastageCategories: string[]
}

const initialState: InitialState = {
  isFilter: false,
  total: null,
  status: 'idle',
  error: undefined,

  rawMaterialWastage: undefined,
  wastageCategories: [],
}

export const WastageSlice = createSlice({
  name: 'WastageSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(wastageApi.endpoints.getAllWastage.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(
        wastageApi.endpoints.getAllWastage.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded'

          const allWastage = action.payload.data.records.filter(
            (i) => i.category === 'RAW_MATERIAL'
          )[0].items
          const allCategories = action.payload.data.records.map((i) =>
            String(i.category)
          )

          state.rawMaterialWastage = allWastage
          state.wastageCategories = allCategories
        }
      )
      .addMatcher(
        wastageApi.endpoints.getAllWastage.matchRejected,
        (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        }
      )
  },
})

export default WastageSlice.reducer
export const {
  useGetAllWastageQuery,
  useAddWastageMutation,
  useRemoveWastageMutation,
} = wastageApi
// export const {} = WastageSlice.actions
