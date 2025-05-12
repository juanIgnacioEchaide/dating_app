import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchSettings } from './settingsThunk'

export type SettingsState = {
  darkMode: boolean
  notifications: boolean
  language: 'en' | 'es' | 'fr'
  loading: boolean
  error: string | null
}

const initialState: SettingsState = {
  darkMode: false,
  notifications: true,
  language: 'en',
  loading: false,
  error: null
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.darkMode = action.payload.darkMode
        state.notifications = action.payload.notifications
        state.language = action.payload.language
        state.loading = false
        state.error = null
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Unknown error'
      })
  }
})

export const { toggleDarkMode, toggleNotifications, setLanguage } = settingsSlice.actions
export default settingsSlice.reducer
