import { TutorialState } from "./tutorialSlice"

export const fetchTutorialAPI = async (userId: string): Promise<TutorialState> => {
  const res = await fetch(`/api/tutorial?userId=${userId}`)
  if (!res.ok) throw new Error('Error fetching lecafe items')
  return res.json()
}
