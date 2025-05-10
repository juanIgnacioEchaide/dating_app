import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMatches } from './matchesThunk'

type User = {
  id: string
  name: string
  age: number
  photoUrl?: string
}

export type MatchesState = {
  list: User[]
  likedUsers: string[]
  loading: boolean
  error: string | null
}

const initialState: MatchesState = {
  list: [],
  likedUsers: [],
  loading: false,
  error: null
}

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    addMatch(state, action: PayloadAction<User>) {
      state.list.push(action.payload)
    },
    likeUser(state, action: PayloadAction<string>) {
      if (!state.likedUsers.includes(action.payload)) {
        state.likedUsers.push(action.payload)
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.list = action.payload.list
        state.likedUsers = action.payload.likedUsers
        state.loading = false
        state.error = null
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Unknown error'
      })
  }
})

export const { addMatch, likeUser } = matchesSlice.actions
export default matchesSlice.reducer
