import api from './api'

export const authService = {
  daftar: (data) => api.post('/auth/daftar', data),
  masuk: (data) => api.post('/auth/masuk', data),
  verifikasiOtp: (data) => api.post('/auth/verifikasi-otp', data),
  kirimUlangOtp: (data) => api.post('/auth/kirim-ulang-otp', data),
  lupaPassword: (data) => api.post('/auth/lupa-password', data),
  resetPassword: (data) => api.post('/auth/reset-password', data),
  segarkanToken: (refreshToken) =>
    api.post('/auth/segarkan-token', { refresh_token: refreshToken }),
  keluar: (refreshToken) => api.post('/auth/keluar', { refresh_token: refreshToken }),
  saya: () => api.get('/auth/saya'),
}

export default authService
