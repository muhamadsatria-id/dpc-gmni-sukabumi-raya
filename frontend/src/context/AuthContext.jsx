import { useEffect, useState } from 'react'
import authService from '../services/authService'
import { AuthContext } from './authContext'

const KUNCI_ACCESS = 'gmni_access_token'
const KUNCI_REFRESH = 'gmni_refresh_token'
const KUNCI_USER = 'gmni_user'

function bacaUserTersimpan() {
  const tersimpan = localStorage.getItem(KUNCI_USER)
  if (!tersimpan) return null

  try {
    return JSON.parse(tersimpan)
  } catch {
    localStorage.removeItem(KUNCI_USER)
    return null
  }
}

function hapusSesi() {
  localStorage.removeItem(KUNCI_ACCESS)
  localStorage.removeItem(KUNCI_REFRESH)
  localStorage.removeItem(KUNCI_USER)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(bacaUserTersimpan)

  useEffect(() => {
    function tanganiSesiBerakhir() {
      hapusSesi()
      setUser(null)
    }

    window.addEventListener('gmni:sesi-berakhir', tanganiSesiBerakhir)
    return () => window.removeEventListener('gmni:sesi-berakhir', tanganiSesiBerakhir)
  }, [])

  function simpanSesi(data) {
    localStorage.setItem(KUNCI_ACCESS, data.access_token)
    localStorage.setItem(KUNCI_REFRESH, data.refresh_token)
    localStorage.setItem(KUNCI_USER, JSON.stringify(data.user))
    setUser(data.user)
  }

  async function masuk(payload) {
    const { data } = await authService.masuk(payload)
    return data
  }

  async function verifikasiOtp(payload) {
    const { data } = await authService.verifikasiOtp(payload)
    if (data.access_token) simpanSesi(data)
    return data
  }

  async function keluar() {
    const refreshToken = localStorage.getItem(KUNCI_REFRESH)

    if (refreshToken) {
      try {
        await authService.keluar(refreshToken)
      } catch {
        // Sesi lokal tetap dibersihkan meskipun request logout gagal.
      }
    }

    hapusSesi()
    setUser(null)
  }

  const nilai = { user, masuk, verifikasiOtp, keluar }

  return <AuthContext.Provider value={nilai}>{children}</AuthContext.Provider>
}
