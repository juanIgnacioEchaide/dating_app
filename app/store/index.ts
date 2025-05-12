import { configureStore } from '@reduxjs/toolkit'
import lecafe from '../features/lecafe/store/lecafeSlice'
import messages from '../features/messages/store/messagesSlice'
import matches from '../features/matches/store/matchesSlice'
import profile from '../features/profile/store/profileSlice'
import tutorial from '../features/tutorial/tutorialSlice'
import settings from '../features/settings/store/settingsSlice' 
import swipe from '../features/shared/swipe/store/swipeSlice' 
import auth from '../features/shared/auth/store/authSlice' 

export const store = configureStore({
  reducer: {
    auth,
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
