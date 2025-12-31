import { isAxiosError } from 'axios'

import { tesloApi } from '@/api/tesloApi'
import type { AuthResponse } from '../interfaces/auth.response'

export const RegisterAction = async (
  fullName: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      fullName,
      email,
      password,
    })

    localStorage.setItem('token', data.token)

    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? 'Register failed')
    }
    throw new Error('Unexpected error')
  }
}
