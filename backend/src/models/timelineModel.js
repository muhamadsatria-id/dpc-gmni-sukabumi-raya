const buatModel = require('./baseCrudModel');

module.exports = buatModel({
  tabel: 'timeline_kalender',
  kolom: ['nama_kegiatan', 'waktu_mulai', 'waktu_selesai', 'lokasi', 'deskripsi'],
  urut: 'waktu_mulai ASC',
  cari: ['nama_kegiatan', 'lokasi'],
});
