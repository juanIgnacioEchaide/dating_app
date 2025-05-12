import { createAsyncThunk } from '@reduxjs/toolkit'
import { LecafeItem } from './lecafeSlice'
import { fetchLecafeItemsAPI } from '../service/lecafeService'


export const fetchLecafeItems = createAsyncThunk<
  LecafeItem[],
  string,
  { rejectValue: string }
>('lecafe/fetchLecafeItems', async (userId, { rejectWithValue }) => {
  try {
    const res = await fetchLecafeItemsAPI(userId)
    return res
  } catch (err: any) {
    return rejectWithValue(err.message || 'Unknown error')
  }
})
