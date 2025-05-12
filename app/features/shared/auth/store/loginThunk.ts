import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI } from "../service/loginService";

export const loginUser = createAsyncThunk<
  { token: string },
  { email: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const data = await loginAPI(email, password)
    return data
  } catch (err: any) {
    return rejectWithValue(err.message || 'Login failed')
  }
})
