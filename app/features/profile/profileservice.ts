import { ProfileState } from "./profileSlice"

export const fetchProfileAPI = async (userId: string): Promise<ProfileState> => {
  const res = await fetch(`/api/profile?userId=${userId}`)
  if (!res.ok) throw new Error('Error fetching lecafe items')
  return res.json()
}
