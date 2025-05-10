import { SwipeState } from "./swipeSlice"

export const fetchMatchablesAPI = async (userId: string): Promise<SwipeState> => {
  const res = await fetch(`/api/swipe?userId=${userId}`)
  if (!res.ok) throw new Error('Error fetching lecafe items')
  return res.json()
}

export const postVoteMatchableAPI = async (userId: string, otherUserId: string, like: boolean): Promise<SwipeState> => {
  const res = await fetch(`/api/swipe?userId=${userId}&otherUserId=${otherUserId}&like=${like}`, { method: 'POST', headers: { 'Content-Type': 'application/json' } })
  if (!res.ok) throw new Error('Error fetching lecafe items')
  return res.json()
}
