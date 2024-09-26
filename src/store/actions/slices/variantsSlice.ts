import { APIEndPoints } from "@/APIEndpoints"
import { IVariant } from "@/interfaces"
import { getCustomParams } from "@/lib/utils"
import { createSlice } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface IncomingData {
  data: {
    count: number
    records: IVariant[]
  }
  message: string
  status: boolean
}

export const variantsApi = createApi({
  reducerPath: "VariantsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: APIEndPoints.BackendURL,
    // prepareHeaders: (headers) => {
    //   const token = localStorage.getItem('token')
    //     ? localStorage.getItem('token')
    //     : ''
    //   if (token) {
    //     headers.set('authorization', token)
    //     return headers
    //   }
    // },
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
    })
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
  reducers: {},
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
} = variantsApi
// export const {
// } = CategorySlice.actions
export default VariantsSlice.reducer