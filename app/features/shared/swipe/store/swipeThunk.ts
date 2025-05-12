import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchMatchablesAPI, postVoteMatchableAPI } from '../service/swipeService'
import { SwipeState } from './swipeSlice'

export const fetchMatchables = createAsyncThunk<SwipeState>('swipe/fetchMatchables', 
  async () => {
  try {
    const res = await fetchMatchablesAPI()
    return res
  } catch (err: any) {
    return err
  }
})

export const voteMatchable = createAsyncThunk<
  SwipeState,
  { id: string, otherUserId: string, like: boolean },
  { rejectValue: string }
>('swipe/voteMatchable', async ({ id, otherUserId, like }, { rejectWithValue }) => {
  try {
    const res = await postVoteMatchableAPI(id, otherUserId, like)
    return res
  } catch (err: any) {
    return rejectWithValue(err.message || 'Unknown error')
  }
})