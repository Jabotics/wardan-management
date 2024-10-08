/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIEndPoints } from '@/APIEndpoints'
import { IOtherMaterial } from '@/interfaces'
import { getCustomParams } from '@/lib/utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IncomingData {
  data: {
    count: number
    records: IOtherMaterial[]
  }
  message: string
  status: string
}

export const otherMaterialsApi = createApi({
  reducerPath: 'OtherMaterialsApi',
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
    getOtherMaterials: builder.query<IncomingData, object>({
      query: (params) => {
        return {
          url: APIEndPoints.get_materials,
          method: 'GET',
          params: getCustomParams(params),
        }
      },
    }),

    addMaterial: builder.mutation<any, { name: string }>({
      query: (body) => {
        const { ...rest } = body
        return {
          url: APIEndPoints.add_material,
          method: 'POST',
          body: rest,
        }
      },
    }),

    editMaterial: builder.mutation<Partial<IncomingData>, Partial<IOtherMaterial>>({
      query: (body) => {
        const { ...rest } = body
        return {
          url: APIEndPoints.update_material,
          method: 'PUT',
          body: rest,
        }
      },
    }),

    removeMaterial: builder.mutation<Partial<IncomingData>, { id: string }>({
      query: (body) => {
        const { id } = body
        return {
          url: `${APIEndPoints.remove_material}/${id}`,
          method: 'DELETE',
        }
      },
    }),
  }),
})

interface InitialState {
  isFilter: boolean
  materials: IOtherMaterial[]
  total: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}

const initialState: InitialState = {
  isFilter: true,
  materials: [],
  total: null,
  status: 'idle',
  error: undefined,
}

export const OtherMaterialsSlice = createSlice({
  name: 'OtherMaterialsSlice',
  initialState,
  reducers: {
    addMaterial: (state, action: PayloadAction<IOtherMaterial>) => {
      state.materials.unshift(action.payload)
    },
    editMaterial: (
      state,
      action: PayloadAction<{ id: string; data: IOtherMaterial }>
    ) => {
      const { id, data } = action.payload
      const materialIndex = state.materials.findIndex((i) => i._id === id)

      state.materials[materialIndex] = data
    },
    removeMaterial: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload
      console.log(id)
      state.materials = state.materials.filter((i) => i._id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        otherMaterialsApi.endpoints.getOtherMaterials.matchPending,
        (state) => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        otherMaterialsApi.endpoints.getOtherMaterials.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded'
          state.materials = action.payload.data.records
          state.total = action.payload.data.count
        }
      )
      .addMatcher(
        otherMaterialsApi.endpoints.getOtherMaterials.matchRejected,
        (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        }
      )
  },
})

export const { useGetOtherMaterialsQuery, useAddMaterialMutation, useEditMaterialMutation, useRemoveMaterialMutation } = otherMaterialsApi
export const { addMaterial, editMaterial, removeMaterial } = OtherMaterialsSlice.actions
export default OtherMaterialsSlice.reducer
