import { APIEndPoints } from "@/APIEndpoints"
import { IMaterialUsage, TablePaginationConfig } from "@/interfaces"
import { getCustomParams } from "@/lib/utils"
import { createSlice } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface IncomingData {
  status: 'success' | 'fail'
  message: string
  data: {
    count: number
    records: IMaterialUsage[]
  }
}

interface QueryParams extends TablePaginationConfig {
  [key: string]: unknown
}

interface ResponseType {
  message: string
  status: 'success' | 'fail'
  data: {
    _id: string
  }
}

export const materialUsageApi = createApi({
  reducerPath: 'MaterialUsageApi',
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
  tagTypes: ['MaterialUsage'],
  endpoints: builder => ({
    getAllMaterialUsage: builder.query<IncomingData, QueryParams>({
      query: (params) => {
        return {
          url: APIEndPoints.get_material_usage,
          params: getCustomParams(params),
          method: 'GET'
        }
      },
      providesTags: ['MaterialUsage']
    }),

    removeMaterialUsage: builder.mutation<ResponseType, { id: string }>({
      query: (body) => {
        const { id } = body

        return {
          url: `${APIEndPoints.remove_material_usage}/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['MaterialUsage']
    })
  })
})

interface InitialState {
  isFilter: boolean
  total: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined

  materialUsages: IMaterialUsage[]
}

const initialState: InitialState = {
  isFilter: false,
  total: null,
  status: 'idle',
  error: undefined,

  materialUsages: [],
}

export const MaterialUsageSlice = createSlice({
  name: 'MaterialUsageSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        materialUsageApi.endpoints.getAllMaterialUsage.matchPending,
        state => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        materialUsageApi.endpoints.getAllMaterialUsage.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded'

          state.materialUsages = action.payload.data.records
        }
      )
      .addMatcher(
        materialUsageApi.endpoints.getAllMaterialUsage.matchRejected,
        (state, action) => {
          state.status = 'failed'

          state.error = action.error.message
        }
      )
  }
})

export default MaterialUsageSlice.reducer
export const { useGetAllMaterialUsageQuery, useRemoveMaterialUsageMutation } = materialUsageApi
// export const {  } = MaterialUsageSlice.actions
