import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SettingsState = {
  darkMode: boolean
  notifications: boolean
  language: 'en' | 'es' | 'fr'
}

const initialState: SettingsState = {
  darkMode: false,
  notifications: true,
  language: 'en'
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode
    },
    toggleNotifications(state) {
      state.notifications = !state.notifications
    },
    setLanguage(state, action: PayloadAction<SettingsState['language']>) {
      state.language = action.payload
    }
  }
})

export const { toggleDarkMode, toggleNotifications, setLanguage } =
  settingsSlice.actions
export default settingsSlice.reducer
