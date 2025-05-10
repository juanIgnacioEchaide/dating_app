import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type LecafeItem = {
  id: string
  title: string
  content: string
}

export type LecafeState = {
  conversations: LecafeItem[]
  status: 'idle' | 'loading' | 'error'
}

const initialState: LecafeState = {
  conversations: [],
  status: 'idle'
}

const lecafeSlice = createSlice({
  name: 'lecafe',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<LecafeItem>) {
      state.conversations.push(action.payload)
    },
    setStatus(state, action: PayloadAction<LecafeState['status']>) {
      state.status = action.payload
    }
  }
})

export const { addItem, setStatus } = lecafeSlice.actions
export default lecafeSlice.reducer
