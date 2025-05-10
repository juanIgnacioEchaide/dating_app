import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProfileAPI } from './profileservice'
import { ProfileState } from './profileSlice'

export const fetchProfile = createAsyncThunk<
  ProfileState,
  {id: string},
  { rejectValue: string }
>('profile/fetchProfile', async ({id }, { rejectWithValue }) => {
  try {
    const res = await fetchProfileAPI(id)
    return res
  } catch (err: any) {
    return rejectWithValue(err.message || 'Unknown error')
  }
})
