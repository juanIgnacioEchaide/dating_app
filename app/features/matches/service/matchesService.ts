import { MatchesState } from "../store/matchesSlice"

export const fetchMatchesAPI = async (userId: string): Promise<MatchesState> => {
  const res = await fetch(`/api/matches?userId=${userId}`)
  if (!res.ok) throw new Error('Error fetching lecafe items')
  return res.json()
}
