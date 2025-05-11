import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchMessagesAPI } from './messagesService'
import { MessagesState } from './messagesSlice'


export const fetchMessages = createAsyncThunk<
  MessagesState,
  {id: string, otherUserId: string},
  { rejectValue: string }
>('messages/fetchMessages', async ({id, otherUserId }, { rejectWithValue }) => {
  try {
    const res = await fetchMessagesAPI(id, otherUserId)
    return res
  } catch (err: any) {
    return rejectWithValue(err.message || 'Unknown error')
  }
})
