import { createContext, useContext } from 'react'

export const AuthContext = createContext(null)

export function useAuth() {
  const konteks = useContext(AuthContext)
  if (!konteks) throw new Error('useAuth harus dipakai di dalam AuthProvider.')
  return konteks
}
