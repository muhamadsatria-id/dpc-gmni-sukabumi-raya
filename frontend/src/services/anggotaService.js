import api from './api'

export const anggotaService = {
  daftar: (params) => api.get('/anggota', { params }),
  detail: (id) => api.get(`/anggota/${id}`),
  tambah: (data) => api.post('/anggota', data),
  ubah: (id, data) => api.put(`/anggota/${id}`, data),
  hapus: (id) => api.delete(`/anggota/${id}`),
}

export default anggotaService
