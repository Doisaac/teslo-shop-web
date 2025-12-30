import { create } from 'zustand'
import type { User } from '@/interfaces/user.interface'
import { loginAction } from '../actions/login.action'
import { checkAuthAction } from '../actions/check-auth.action'

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking'

type AuthState = {
  // Properties
  user: User | null
  token: string | null
  authStatus: AuthStatus

  // Getters
  isAdmin: () => boolean

  // Actions
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuthStatus: () => Promise<boolean>
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  authStatus: 'checking',

  // Getters
  isAdmin: () => {
    const userRoles = get().user?.roles ?? []
    return userRoles.includes('admin')
  },

  // Actions
  login: async (email: string, password: string) => {
    console.log({ email, password })

    try {
      const data = await loginAction(email, password)
      localStorage.setItem('token', data.token)

      set({ user: data.user, token: data.token, authStatus: 'authenticated' })
      return true
    } catch (error) {
      localStorage.removeItem('token')
      set({ user: null, token: null, authStatus: 'not-authenticated' })
      return false
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null, authStatus: 'not-authenticated' })
  },

  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction()
      set({ user, token, authStatus: 'authenticated' })
      return true
    } catch (error) {
      set({ user: undefined, token: null, authStatus: 'not-authenticated' })
      return false
    }
  },
}))
