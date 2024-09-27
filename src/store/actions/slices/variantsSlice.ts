import { APIEndPoints } from "@/APIEndpoints"
import { IVariant } from "@/interfaces"
import { getCustomParams } from "@/lib/utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface IncomingData {
  data: {
    count: number
    records: IVariant[]
  }
  message: string
  status: 'success' | 'fail'
}

export const variantsApi = createApi({
  reducerPath: "VariantsApi",
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
    getAllVariants: builder.query<IncomingData, object>({
      query: (params) => {
        return {
          url: APIEndPoints.get_variants,
          method: 'GET',
          params: getCustomParams(params),
        }
      },
    }),

    addVariant: builder.mutation<Partial<IncomingData>, { name: string }>({
      query: (body) => {
        const {...rest} = body
        return {
          url: APIEndPoints.add_variant,
          method: 'POST',
          body: rest,
        }
      }
    }),

    editVariant: builder.mutation<Partial<IncomingData>, Partial<IVariant>>({
      query: (body) => {
        const {...rest} = body
        return {
          url: APIEndPoints.update_variant,
          method: 'PUT',
          body: rest,
        }
      }
    }),
  })
})

interface InitialState {
  isFilter: boolean
  variants: IVariant[]
  total: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}

const initialState: InitialState = {
  isFilter: true,
  variants: [],
  total: null,
  status: 'idle',
  error: undefined,
}

export const VariantsSlice = createSlice({
  name: 'VariantsSlice',
  initialState,
  reducers: {
    addVariant: (state, action: PayloadAction<IVariant>) => {
      state.variants.unshift(action.payload)
    },
    editVariant: (state, action: PayloadAction<{ id: string; data: IVariant }>) => {
      const { id, data } = action.payload
      const variantIndex = state.variants.findIndex(i => i._id === id)

      state.variants[variantIndex] = data
    },
  },
  extraReducers: (builder) => {
    // Handle the asynchronous fetchItems action
    builder
      .addMatcher(variantsApi.endpoints.getAllVariants.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(
        variantsApi.endpoints.getAllVariants.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded'
          state.variants = action.payload.data.records
          state.total = action.payload.data.count
        }
      )
      .addMatcher(
        variantsApi.endpoints.getAllVariants.matchRejected,
        (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        }
      )
  },
})

export const {
  useGetAllVariantsQuery,
  useAddVariantMutation,
  useEditVariantMutation,
} = variantsApi
export const {
  addVariant,
  editVariant,
} = VariantsSlice.actions
export default VariantsSlice.reducer