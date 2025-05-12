import { createAsyncThunk } from '@reduxjs/toolkit'

import { ProfileState } from './profileSlice'
import { fetchProfileAPI } from '../service/profileService'

export const fetchProfile = createAsyncThunk<
  ProfileState,
  { rejectValue: string }
>('profile/fetchProfile', async () => {
  try {
    const res = await fetchProfileAPI()
    return res
  } catch (err: any) {
    return err
  }
})
