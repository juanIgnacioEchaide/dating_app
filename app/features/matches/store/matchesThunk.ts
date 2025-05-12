import { createAsyncThunk } from '@reduxjs/toolkit'
import { MatchesState } from './matchesSlice'
import { fetchMatchesAPI } from '../service/matchesService'


export const fetchMatches = createAsyncThunk<
MatchesState,
  string,
  { rejectValue: string }
>('matches', async (userId, { rejectWithValue }) => {
  try {
    const res = await fetchMatchesAPI(userId)
    return res
  } catch (err: any) {
    return rejectWithValue(err.message || 'Unknown error')
  }
})
