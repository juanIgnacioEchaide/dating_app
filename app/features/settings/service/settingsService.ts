import { SettingsState } from "../store/settingsSlice"

export const fetchSettingsAPI = async (): Promise<SettingsState> => {
  const res = await fetch(`/api/settings?userId`)
  if (!res.ok) throw new Error('Error fetching lecafe items')
  return res.json()
}
