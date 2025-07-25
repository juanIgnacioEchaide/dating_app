import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMatchables } from './swipeThunk'

export type Matchable = {
  id: string
  name: string
  age: number
  town: string
  country: string
  relationship: boolean
  friendship: boolean
  dating: boolean
  photoUrl?: string
}

export type SwipeState = {
  list: Matchable[]
  loading: boolean
  selected: 'dating' | 'relationship' | 'friendship' | undefined
  error: string
}

const initialState: SwipeState = {
  loading: false,
  list: [],
  selected: undefined,
  error: ''
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
      state.error = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatchables.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchMatchables.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.list = action.payload.list
      })
      .addCase(fetchMatchables.rejected, (state) => {
        state.loading = false
        state.error = state.error
      })
  }
})

export const { setMatchables, addMatchable, clearMatchables, setLoading } = swipeSlice.actions
export default swipeSlice.reducer
