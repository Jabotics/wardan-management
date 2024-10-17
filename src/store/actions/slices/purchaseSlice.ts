import { APIEndPoints } from '@/APIEndpoints'
import { IPurchase, IPurchaseItem, TablePaginationConfig } from '@/interfaces'
import { getCustomParams } from '@/lib/utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IncomingData {
  data: {
    count: number
    records: IPurchase[]
  }
  message: string
  status: 'success' | 'fail'
}

interface PurchaseItemIncomingData {
  data: IPurchaseItem[]
  message: string
  status: 'success' | 'fail'
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

export const purchaseApi = createApi({
  reducerPath: 'PurchaseApi',
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
  tagTypes: ['PurchaseEntry', 'PurchaseItems'],
  endpoints: (builder) => ({
    getPurchaseEntry: builder.query<IncomingData, QueryParams>({
      query: (params) => {
        return {
          url: APIEndPoints.get_purchase_details,
          method: 'GET',
          params: getCustomParams(params),
        }
      },
      providesTags: ['PurchaseEntry'],
    }),

    getPurchaseEntryItems: builder.query<
      PurchaseItemIncomingData,
      { id: string }
    >({
      query: ({ id }) => {
        return {
          url: `${APIEndPoints.get_item_details}/${id}`,
          method: 'GET',
        }
      },
      providesTags: ['PurchaseItems'],
    }),

    addPurchase: builder.mutation<void, object>({
      query: (body) => {
        const { ...rest } = body

        return {
          url: APIEndPoints.add_purchase_entry,
          body: rest,
          method: 'POST',
        }
      },
      invalidatesTags: ['PurchaseEntry'],
    }),

    addPurchaseItem: builder.mutation<ResponseType, object>({
      query: (body) => {
        const { ...rest } = body
        return {
          url: APIEndPoints.add_purchase_item,
          method: 'POST',
          body: rest,
        }
      },
      invalidatesTags: ['PurchaseItems']
    }),

    removePurchaseItem: builder.mutation<unknown, { id: string }>({
      query: (body) => {
        const { id } = body
        return {
          url: `${APIEndPoints.remove_purchase_item}/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['PurchaseItems'],
    }),

    updatePurchase: builder.mutation<unknown, object>({
      query: (body) => {
        const { ...rest } = body

        return {
          url: APIEndPoints.update_purchase_entry,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: ['PurchaseEntry'],
    }),

    removePurchase: builder.mutation<IncomingData, { id: string }>({
      query: (body) => {
        const { id } = body
        return {
          url: `${APIEndPoints.remove_purchase}/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['PurchaseEntry'],
    }),

    updatePurchaseItem: builder.mutation<IncomingData, object>({
      query: (body) => {
        const { ...rest } = body
        return {
          url: APIEndPoints.update_purchase_item,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: ['PurchaseItems'],
    }),
  }),
})

interface InitialData {
  isFilter: boolean
  total: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined

  allPurchase: IPurchase[]
  allRawMaterialPurchase: IPurchase[]
  allPackagingProductPurchase: IPurchase[]
  allOtherPurchase: IPurchase[]

  // To Add / Edit Purchase
  purchaseInfo?: Partial<IPurchase>
}

const initialState: InitialData = {
  isFilter: false,
  total: null,
  status: 'idle',
  error: undefined,

  allPurchase: [],
  allRawMaterialPurchase: [],
  allPackagingProductPurchase: [],
  allOtherPurchase: [],

  purchaseInfo: undefined,
}

export const PurchaseSlice = createSlice({
  name: 'PurchaseSlice',
  initialState,
  reducers: {
    setPurchaseAddInfo: (state, action: PayloadAction<Partial<IPurchase>>) => {
      state.purchaseInfo = action.payload
    },
    setNewPurchase: (state, action: PayloadAction<{ data: IPurchase }>) => {
      const { data } = action.payload
      state.allPurchase.unshift(data)
    },
    modifyPurchaseEntry: (state, action: PayloadAction<Partial<IPurchase>>) => {
      state.purchaseInfo = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        purchaseApi.endpoints.getPurchaseEntry.matchPending,
        (state) => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        purchaseApi.endpoints.getPurchaseEntry.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded'

          state.allPurchase = action.payload.data.records

          state.allRawMaterialPurchase = action.payload.data.records.filter(
            (i) => i.category === 'RAW_MATERIAL'
          )
          state.allPackagingProductPurchase =
            action.payload.data.records.filter(
              (i) => i.category === 'PACKAGING_PRODUCT'
            )
          state.allOtherPurchase = action.payload.data.records.filter(
            (i) => i.category === 'OTHER'
          )

          state.total = action.payload.data.count
        }
      )
      .addMatcher(
        purchaseApi.endpoints.getPurchaseEntry.matchRejected,
        (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        }
      )
  },
})

export const {
  useGetPurchaseEntryQuery,
  useGetPurchaseEntryItemsQuery,
  useAddPurchaseMutation,
  useAddPurchaseItemMutation,
  useRemovePurchaseItemMutation,
  useRemovePurchaseMutation,
  useUpdatePurchaseItemMutation,
  useUpdatePurchaseMutation
} = purchaseApi
export const {
  setNewPurchase,
  setPurchaseAddInfo,
  modifyPurchaseEntry
} = PurchaseSlice.actions
export default PurchaseSlice.reducer
