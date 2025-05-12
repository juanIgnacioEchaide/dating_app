import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export type AuthState = {
  id: string
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  token: 'fake-token-dev',
  loading: false,
  error: null,
  id: 'fake-id'
}

export const loginUser = createAsyncThunk<
  { token: string },
  { email: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/login?email=${email}&password=${password}`)
    if (!res.ok) {
      const errText = await res.text()
      return rejectWithValue(errText || 'Login failed')
    }
    const data = await res.json()
    return { token: data.token }
  } catch (err: any) {
    return rejectWithValue(err.message || 'Network error')
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error desconocido'
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
