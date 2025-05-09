import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Matchable = {
  id: string
  name: string
  age: number
  bio?: string
  photoUrl?: string
}

type MatchablesState = {
  list: Matchable[]
  loading: boolean
}

const initialState: MatchablesState = {
  list: [],
  loading: false
}

const matchablesSlice = createSlice({
  name: 'matchables',
  initialState,
  reducers: {
    setMatchables(state, action: PayloadAction<Matchable[]>) {
      state.list = action.payload
    },
    addMatchable(state, action: PayloadAction<Matchable>) {
      state.list.push(action.payload)
    },
    clearMatchables(state) {
      state.list = []
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    }
  }
})

export const { setMatchables, addMatchable, clearMatchables, setLoading } = matchablesSlice.actions
export default matchablesSlice.reducer
