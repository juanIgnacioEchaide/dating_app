import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type User = {
  id: string
  name: string
  age: number
  photoUrl?: string
}

type MatchesState = {
  list: User[]
  likedUsers: string[]
}

const initialState: MatchesState = {
  list: [],
  likedUsers: []
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
  }
})

export const { addMatch, likeUser } = matchesSlice.actions
export default matchesSlice.reducer
