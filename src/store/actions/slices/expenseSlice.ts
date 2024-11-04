import { APIEndPoints } from "@/APIEndpoints"
import { IAddExpense, IAddExpenseCategory, IExpense, IExpenseCategory, IUpdateExpense, IUpdateExpenseCategory, TablePaginationConfig } from "@/interfaces"
import { getCustomParams } from "@/lib/utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface IncomingData {
  status: 'success' | 'fail'
  message: string
  data: {
    count: number
    records: IExpenseCategory[]
  }
}

interface IncomingExpenseData {
  status: 'success' | 'fail'
  message: string
  data: {
    count: number
    records: IExpense[]
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

export const expenseApi = createApi({
  reducerPath: 'ExpenseApi',
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
  tagTypes: ['Expense'],
  endpoints: builder => ({
    getExpenseCategory: builder.query<IncomingData, QueryParams>({
      query: (params) => {
        return {
          url: APIEndPoints.expense_category,
          params: getCustomParams(params),
          method: 'GET'
        }
      },
    }),

    addExpenseCategory: builder.mutation<ResponseType, IAddExpenseCategory>({
      query: (body) => {
        return {
          url: APIEndPoints.expense_category,
          body,
          method: 'POST'
        }
      },
    }),

    updateExpenseCategory: builder.mutation<ResponseType, IUpdateExpenseCategory>({
      query: (body) => {
        return {
          url: APIEndPoints.expense_category,
          body,
          method: 'PUT'
        }
      },
    }),

    removeExpenseCategory: builder.mutation<ResponseType, { id: string }>({
      query: (body) => {
        const { id } = body
        return {
          url: `${APIEndPoints.expense_category}/${id}`,
          method: 'DELETE'
        }
      },
    }),

    getExpense: builder.query<IncomingExpenseData, QueryParams>({
      query: (params) => {
        return {
          url: APIEndPoints.expense,
          params: getCustomParams(params),
          method: 'GET'
        }
      },
      providesTags: ['Expense']
    }),

    addExpense: builder.mutation<ResponseType, IAddExpense>({
      query: (body) => {
        return {
          url: APIEndPoints.expense,
          body,
          method: 'POST'
        }
      },
      invalidatesTags: ['Expense']
    }),

    updateExpense: builder.mutation<ResponseType, IUpdateExpense>({
      query: (body) => {
        return {
          url: APIEndPoints.expense,
          body,
          method: 'PUT'
        }
      },
      invalidatesTags: ['Expense']
    }),

    removeExpense: builder.mutation<ResponseType, { id: string }>({
      query: (body) => {
        const { id } = body

        return {
          url: `${APIEndPoints.expense}/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['Expense']
    })
  })
})

interface InitialState {
  expenseCategoryTotal: number | null
  expenseCategoryStatus: 'idle' | 'loading' | 'succeeded' | 'failed'

  total: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'

  expenseCategories: IExpenseCategory[]
  expenses: IExpense[]
}

const initialState: InitialState = {
  expenseCategoryTotal: null,
  expenseCategoryStatus: 'idle',

  total: null,
  status: 'idle',

  expenseCategories: [],
  expenses: []
}

export const ExpenseSlice = createSlice({
  name: 'ExpenseSlice',
  initialState,
  reducers: {
    addExpenseCategory: (state, action: PayloadAction<IExpenseCategory>) => {
      state.expenseCategories.unshift(action.payload)
    },
    removeExpenseCategory: (state, action: PayloadAction<{ id: string }>) => {
      state.expenseCategories = state.expenseCategories.filter(i => i._id !== action.payload.id)
    },
    updateExpenseCategory: (state, action: PayloadAction<IUpdateExpenseCategory>) => {
      const { _id } = action.payload; 
      const selectedIndex = state.expenseCategories.findIndex(i => i._id === _id);
    
      if (selectedIndex !== -1) {
        state.expenseCategories[selectedIndex] = action.payload;
      }
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        expenseApi.endpoints.getExpenseCategory.matchPending,
        state => {
          state.expenseCategoryStatus = 'loading'
        }
      )
      .addMatcher(
        expenseApi.endpoints.getExpense.matchPending,
        state => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        expenseApi.endpoints.getExpenseCategory.matchFulfilled,
        (state, action) => {
          state.expenseCategoryStatus = 'succeeded'

          state.expenseCategories = action.payload.data.records
        }
      )
      .addMatcher(
        expenseApi.endpoints.getExpense.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded'

          state.expenses = action.payload.data.records
        }
      )
      .addMatcher(
        expenseApi.endpoints.getExpenseCategory.matchRejected,
        state => {
          state.expenseCategoryStatus = 'failed'
        }
      )
      .addMatcher(
        expenseApi.endpoints.getExpense.matchRejected,
        state => {
          state.status = 'failed'
        }
      )
  },
})

export default ExpenseSlice.reducer
export const {
  useGetExpenseCategoryQuery,
  useAddExpenseCategoryMutation,
  useUpdateExpenseCategoryMutation,
  useRemoveExpenseCategoryMutation,
  useAddExpenseMutation,
  useGetExpenseQuery,
  useUpdateExpenseMutation,
  useRemoveExpenseMutation,
} = expenseApi

export const { addExpenseCategory, removeExpenseCategory, updateExpenseCategory } = ExpenseSlice.actions
