import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface InitialState {
  wastageTablesShow: 'RAW_MATERIAL' | null
  selectedTable: 'to-receive' | 'to-pay'
}

const initialState: InitialState = {
  wastageTablesShow: null,
  selectedTable: 'to-receive',
}

export const AppSlice = createSlice({
  name: 'AppSlice',
  initialState,
  reducers: {
    setWastageTableShow: (state, action: PayloadAction<'RAW_MATERIAL' | null>) => {
      state.wastageTablesShow = action.payload
    },
    setSelectedTable: (state, action: PayloadAction<'to-receive' | 'to-pay'>) => {
      state.selectedTable = action.payload
    }
  }
})

export default AppSlice.reducer
export const { setWastageTableShow, setSelectedTable } = AppSlice.actions