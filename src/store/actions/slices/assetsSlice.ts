import { APIEndPoints } from '@/APIEndpoints'
import { IAddAsset, IAsset, IUpdateAsset, TablePaginationConfig } from '@/interfaces'
import { getCustomParams } from '@/lib/utils'
import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IncomingData {
  status: 'success' | 'fail'
  message: string
  data: {
    count: number
    records: IAsset[]
  }
}

interface QueryParams extends TablePaginationConfig {
  [key: string]: unknown
}

export const assetsApi = createApi({
  reducerPath: 'AssetsApi',
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
  tagTypes: ['Assets'],
  endpoints: (builder) => ({
    getAllAssets: builder.query<IncomingData, QueryParams>({
      query: (params) => {
        return {
          url: APIEndPoints.get_assets,
          method: 'GET',
          params: getCustomParams(params),
        }
      },
      providesTags: ['Assets'],
    }),

    addAsset: builder.mutation<IncomingData, IAddAsset>({
      query: (body) => {
        const { ...rest } = body
        return {
          url: APIEndPoints.add_asset,
          method: 'POST',
          body: rest,
        }
      },
      invalidatesTags: ['Assets']
    }),

    editAsset: builder.mutation<Partial<IncomingData>, IUpdateAsset>({
      query: (body) => {
        const { ...rest } = body
        return {
          url: APIEndPoints.update_asset,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: ['Assets']
    }),

    removeAsset: builder.mutation<Partial<IncomingData>, { id: string }>({
      query: (body) => {
        const { id } = body
        return {
          url: `${APIEndPoints.remove_asset}/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Assets']
    }),
  }),
})

interface InitialState {
  isFilter: boolean
  total: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined

  assets: IAsset[]
}

const initialState: InitialState = {
  isFilter: false,
  total: null,
  status: 'idle',
  error: undefined,

  assets: [],
}

export const AssetsSlice = createSlice({
  name: 'AssetsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(assetsApi.endpoints.getAllAssets.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(
        assetsApi.endpoints.getAllAssets.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded'
          state.assets = action.payload.data.records
        }
      )
      .addMatcher(assetsApi.endpoints.getAllAssets.matchRejected, (state) => {
        state.status = 'failed'
      })
  },
})

export default AssetsSlice.reducer
export const { useGetAllAssetsQuery, useRemoveAssetMutation, useAddAssetMutation, useEditAssetMutation } = assetsApi
// export const {  } = AssetsSlice.actions
