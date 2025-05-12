import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchSettingsAPI } from '../service/settingsService'
import { SettingsState } from './settingsSlice'

export const fetchSettings = createAsyncThunk<
  SettingsState,
  {id: string},
  { rejectValue: string }
>('settings/fetchSettings', async ({id }, { rejectWithValue }) => {
  try {
    const res = await fetchSettingsAPI()
    return res
  } catch (err: any) {
    return rejectWithValue(err.message || 'Unknown error')
  }
})
