import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMessages } from './messagesThunk'


type Message = {
  id: string
  content: string
  timestamp: number
}

type MessageThread = {
  userId: string
  otherUserId: string
  messages: Message[]
}

export type MessagesState = {
  threads: MessageThread[]
  otherUserId: string
  unreadCount: number
  loading: boolean
  error: string | null
}

const initialState: MessagesState = {
  threads: [],
  unreadCount: 0,
  otherUserId: '',
  loading: false,
  error: null
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    receiveMessage(
      state,
      action: PayloadAction<{ userId: string; message: Message }>
    ) {
      const { userId, message } = action.payload
      const thread = state.threads.find(t => t.userId === userId)
      if (thread) {
        thread.messages.push(message)
      } else {
        state.threads.push({
          userId,
          otherUserId: '',
          messages: [message]
        })
      }
      state.unreadCount++
    },
    clearUnread(state) {
      state.unreadCount = 0
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const newThread = action.payload.threads[0]
        const threadIndex = state.threads.findIndex(
          t =>
            t.userId === newThread.userId &&
            t.otherUserId === newThread.otherUserId
        )

        if (threadIndex >= 0) {
          state.threads[threadIndex] = newThread
        } else {
          state.threads.push(newThread)
        }

        state.otherUserId = action.payload.otherUserId
        state.loading = false
        state.error = null
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Unknown error'
      })
  }
})

export const { receiveMessage, clearUnread } = messagesSlice.actions
export default messagesSlice.reducer
