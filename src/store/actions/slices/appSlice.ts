import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface InitialState {
  wastageTablesShow: 'RAW_MATERIAL' | null
}

const initialState: InitialState = {
  wastageTablesShow: null,
}

export const AppSlice = createSlice({
  name: 'AppSlice',
  initialState,
  reducers: {
    setWastageTableShow: (state, action: PayloadAction<'RAW_MATERIAL' | null>) => {
      state.wastageTablesShow = action.payload
    }
  }
})

export default AppSlice.reducer
export const { setWastageTableShow } = AppSlice.actions