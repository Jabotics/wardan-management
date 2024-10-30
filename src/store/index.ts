import { Action, configureStore, Dispatch, Middleware, ThunkAction, UnknownAction } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { RequestHandler } from "./RequestHandler";
import { setupListeners } from '@reduxjs/toolkit/query'

import { 
  productsApi,
  variantsApi,
  importersApi,
  exportersApi,
  purchaseApi,
  otherMaterialsApi,
  rawStockApi,
  wastageApi,
  readyProductStocksApi,
  exportsApi,
  assetsApi,
  paymentsApi,
  receiptsApi,
  getStockHistoryApi,
  getRemainingApi,
  shipmentLogsApi,
  materialUsageApi,
  expenseApi,
} from "./actions";

import { persistStore } from 'redux-persist'

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,

    // @ts-expect-error check this middleware
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({
        serializableCheck: false,
      }).concat(
        RequestHandler.middleware,
        
        productsApi.middleware,
        variantsApi.middleware,
        importersApi.middleware,
        exportersApi.middleware,
        purchaseApi.middleware,
        otherMaterialsApi.middleware,
        rawStockApi.middleware,
        wastageApi.middleware,
        readyProductStocksApi.middleware,
        exportsApi.middleware,
        assetsApi.middleware,
        paymentsApi.middleware,
        receiptsApi.middleware,
        getStockHistoryApi.middleware,
        getRemainingApi.middleware,
        shipmentLogsApi.middleware,
        materialUsageApi.middleware,
        expenseApi.middleware,

      );

      const middlewareTuple = middleware as Middleware<
        object,
        RootState,
        Dispatch<UnknownAction>
      >[]
      return middlewareTuple
    },
    preloadedState,
  })

  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store

export const persistor = persistStore(store)
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>