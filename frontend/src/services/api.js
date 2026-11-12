import axios from 'axios'

const KUNCI_ACCESS = 'gmni_access_token'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(KUNCI_ACCESS)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(KUNCI_ACCESS)
      localStorage.removeItem('gmni_refresh_token')
      localStorage.removeItem('gmni_user')
      window.dispatchEvent(new Event('gmni:sesi-berakhir'))
    }
    return Promise.reject(error)
  },
)

export default api
