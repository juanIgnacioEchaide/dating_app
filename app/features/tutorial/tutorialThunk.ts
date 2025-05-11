import { createAsyncThunk } from "@reduxjs/toolkit/react"
import { fetchTutorialAPI } from "./tutorialService"
import { TutorialState } from "./tutorialSlice"

export const fetchTutorial = createAsyncThunk<
  TutorialState,
  { id: string },
  { rejectValue: string }
>('swipe/fetchMatchables', async ({ id }, { rejectWithValue }) => {
  try {
    const res = await fetchTutorialAPI(id)
    return res
  } catch (err: any) {
    return rejectWithValue(err.message || 'Unknown error')
  }
})
