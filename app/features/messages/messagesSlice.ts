import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Message = {
  id: string
  content: string
  timestamp: number
}

type MessageThread = {
  userId: string
  messages: Message[]
}

type MessagesState = {
  threads: MessageThread[]
  unreadCount: number
}

const initialState: MessagesState = {
  threads: [],
  unreadCount: 0
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
        state.threads.push({ userId, messages: [message] })
      }
      state.unreadCount++
    },
    clearUnread(state) {
      state.unreadCount = 0
    }
  }
})

export const { receiveMessage, clearUnread } = messagesSlice.actions
export default messagesSlice.reducer
