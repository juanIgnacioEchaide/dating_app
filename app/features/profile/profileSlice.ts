import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Profile = {
  id: string
  name: string
  bio?: string
  age?: number
  gender?: string
  interests?: string[]
}

type ProfileState = {
  data: Profile | null
  status: 'idle' | 'loading' | 'error'
}

const initialState: ProfileState = {
  data: null,
  status: 'idle'
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<Profile>) {
      state.data = action.payload
    },
    setStatus(state, action: PayloadAction<ProfileState['status']>) {
      state.status = action.payload
    }
  }
})

export const { setProfile, setStatus } = profileSlice.actions
export default profileSlice.reducer
