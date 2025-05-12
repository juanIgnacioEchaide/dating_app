import { ProfileState } from "../store/profileSlice"

export const fetchProfileAPI = async (): Promise<ProfileState> => {
  const res = await fetch(`/api/profile`)
  if (!res.ok) throw new Error('Error fetching lecafe items')
  return res.json()
}
