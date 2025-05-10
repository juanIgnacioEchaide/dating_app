import { SettingsState } from "./settingsSlice"

export const fetchSettingsAPI = async (userId: string): Promise<SettingsState> => {
  const res = await fetch(`/api/settings?userId=${userId}`)
  if (!res.ok) throw new Error('Error fetching lecafe items')
  return res.json()
}
