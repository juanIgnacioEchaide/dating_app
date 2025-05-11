import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMatchables } from './swipeThunk'

type Matchable = {
  id: string
  name: string
  age: number
  bio?: string
  photoUrl?: string
}

export type SwipeState = {
  list: Matchable[]
  loading: boolean
}

const initialState: SwipeState = {
  list: [],
  loading: false
}

const swipeSlice = createSlice({
  name: 'swipe',
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatchables.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMatchables.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload.list
      })
      .addCase(fetchMatchables.rejected, (state) => {
        state.loading = false
      })
  }
})

export const { setMatchables, addMatchable, clearMatchables, setLoading } = swipeSlice.actions
export default swipeSlice.reducer
