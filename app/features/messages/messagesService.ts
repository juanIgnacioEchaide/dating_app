import { MessagesState } from "./messagesSlice"


export const fetchMessagesAPI = async (userId: string, otherUserId: string): Promise<MessagesState> => {
  const res = await fetch(`/api/messages?userId=${userId}&otherUserId=${otherUserId}`)
  if (!res.ok) throw new Error('Error fetching lecafe items')
  return res.json()
}
