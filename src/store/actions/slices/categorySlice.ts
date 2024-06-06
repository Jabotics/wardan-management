import { APIEndPoints } from '@/APIEndpoints'
import { ICategory } from '@/interfaces'
import { getCustomParams } from '@/lib/utils'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react'

interface IncomingData {
  data: {
    count: number
    categories: ICategory[]
  }
  message: string
  status: boolean
}

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
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
    getCategories: builder.query<IncomingData, object>({
      query: (params) => {
        return {
          url: APIEndPoints.get_categories,
          method: 'GET',
          params: getCustomParams(params),
        }
      },
    }),
  }),
})

interface InitialState {
  isFilter: boolean
  categories: ICategory[]
  total: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}

const initialState: InitialState = {
  isFilter: true,
  categories: [],
  total: null,
  status: 'idle',
  error: undefined,
}

export const CategorySlice = createSlice({
  name: 'CategorySlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the asynchronous fetchItems action
    builder
      .addMatcher(categoriesApi.endpoints.getCategories.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(
        categoriesApi.endpoints.getCategories.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded'
          state.categories = action.payload.data.categories
          state.total = action.payload.data.count
        }
      )
      .addMatcher(
        categoriesApi.endpoints.getCategories.matchRejected,
        (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        }
      )
  },
})

export const {
  useGetCategoriesQuery,
} = categoriesApi
export const {
} = CategorySlice.actions
export default CategorySlice.reducer
