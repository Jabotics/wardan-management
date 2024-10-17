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
  tagTypes: ['Wastage'],
  endpoints: (builder) => ({
    getAllWastage: builder.query<IncomingData, QueryParams>({
      query: (params) => {
        return {
          url: APIEndPoints.get_wastage,
          method: 'GET',
          params: getCustomParams(params),
        }
      },
      providesTags: ['Wastage']
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
      invalidatesTags: ['Wastage']
    }),

    removeWastage: builder.mutation<Partial<IncomingData>, { id: string }>({
      query: (body) => {
        const { id } = body
        return {
          url: `${APIEndPoints.remove_wastage}/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Wastage']
    }),
  }),
})

interface InitialState {
  isFilter: boolean
  total: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined

  rawMaterialWastage: IWastage[] | undefined
  packagingMaterialWastage: IWastage[] | undefined
}

const initialState: InitialState = {
  isFilter: false,
  total: null,
  status: 'idle',
  error: undefined,

  rawMaterialWastage: undefined,
  packagingMaterialWastage: undefined,
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

          const categorizedWastage = action.payload.data.records.reduce<{
            rawMaterial: IWastage[]
            packaging: IWastage[]
          }>(
            (acc, record) => {
              if (record.category === 'RAW_MATERIAL') {
                acc.rawMaterial.push(record)
              } else if (record.category === 'PACKAGING_PRODUCT') {
                acc.packaging.push(record)
              }
              return acc
            },
            { rawMaterial: [], packaging: [] }
          )

          state.rawMaterialWastage = categorizedWastage.rawMaterial
          state.packagingMaterialWastage = categorizedWastage.packaging
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
