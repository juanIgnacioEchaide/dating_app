import { configureStore } from '@reduxjs/toolkit'
import lecafe from '../features/lecafe/lecafeSlice'
import messages from '../features/messages/messagesSlice'
import matches from '../features/matches/matchesSlice'
import profile from '../features/profile/profileSlice'
import tutorial from '../features/tutorial/tutorialSlice'
import settings from '../features/settings/settingsSlice' 
import swipe from '../features/shared/swipe/swipeSlice' 

export const store = configureStore({
  reducer: {
    swipe,
    lecafe,
    messages,
    matches,
    profile,
    tutorial,
    settings,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
