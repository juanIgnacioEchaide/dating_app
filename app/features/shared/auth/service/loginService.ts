export type AuthResponse = {
    token: string
  }
  
  export const loginAPI = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const res = await fetch(`/api/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
    
    if (!res.ok) throw new Error('Error during login')
    
    return res.json()
  }
  